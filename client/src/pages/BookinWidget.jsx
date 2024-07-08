/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { differenceInDays, eachDayOfInterval, isSameDay } from "date-fns";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookinWidget = ({ place }) => {
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [NumberOfGuest, setNumberOfGuest] = useState(1);
  const [fullname, setfullname] = useState("");
  const [mobile, setmobile] = useState("+91");
  const [redirect, setredirect] = useState(false);
  const [available, setavailable] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  let numberOfNights = 0;
  const {id}=useParams();
  useEffect(() => {
    const fetchBookedDates = async () => {
      const response = await axios.get(`/bookings/${id}`);
      const bookedDatesArray = response.data.flatMap(booking =>
        eachDayOfInterval({
          start: new Date(booking.checkIn),
          end: new Date(booking.checkOut),
        })
      );
      setBookedDates(bookedDatesArray);
    };
    fetchBookedDates();
    
  }, [id]);


  if (checkIn && checkOut) {
    numberOfNights = differenceInDays(new Date(checkOut), new Date(checkIn));
  }

  const handleCheckInChange = (date) => {
    const newCheckIn =date;
    setcheckIn(newCheckIn);
    checkAvailable(newCheckIn,checkOut);
  };

  const handleCheckOutChange = (date) => {
    const newCheckOut = date;
    setcheckOut(newCheckOut);
    checkAvailable(checkIn,newCheckOut);
  };

  
  async function checkAvailable  (newCheckIn, newCheckOut)  {
    if (new Date(newCheckIn) >= currentDate && new Date(newCheckOut) > new Date(newCheckIn)) {
      const id = place._id;
      const response = await axios.post("/available", { id, checkIn: newCheckIn, checkOut: newCheckOut });
      setavailable(response.data );
    } else {
      setavailable(false);
    }
  }


  async function bookthisplace() {
    const cookie=document.cookie;
    
    if (!fullname || !NumberOfGuest || !mobile || !cookie)
      return "";
    else {
      const place_id = place._id;
      const total_price = numberOfNights * place.price;
      const response = await axios.post(
        "/booking",
        {
          fullname,
          mobile,
          NumberOfGuest,
          checkIn,
          checkOut,
          place_id,
          total_price,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setcheckIn("");
        setcheckOut("");
        setNumberOfGuest(1);
        setfullname("");
        setmobile(1);
        setredirect(true);
      }
    }
  }
  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate, date));
  };

  const dayClassName = (date) => {
    return isDateBooked(date) ? ' text-primary  rounded-full line-through' : undefined;
  };


  if (redirect) return <Navigate to={"/account/bookings/"} />;

  return (
    <div className="bg-white p-4  drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] rounded-xl max-w-lg mb-5  sticky top-[8rem]   ">
      <div className="text-xl text-center font-semibold text-primary">
        Price: ₹{place.price}/Night
      </div>

      <div className="border border-black mt-4 rounded-xl ">
      <div className="flex">
          <div className="py-3  px-4">
            <label>Check-In </label>
            <DatePicker
              selected={checkIn}
              onChange={handleCheckInChange}
              excludeDates={bookedDates}
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              dayClassName={dayClassName}
            />
          </div>
          <div className="  py-3 px-4 border-l-black border-l">
            <label>Check-Out </label>
            <DatePicker
              selected={checkOut}
              onChange={handleCheckOutChange}
              excludeDates={bookedDates}
              minDate={checkIn || new Date()}
              dateFormat="dd-MM-yyyy"
              dayClassName={dayClassName}
            />
          </div>
        </div>
        <div className="border-t border-t-black p-2">
          <label>Number of guests - </label>
          <input
            type="number"
            max={place.maxGuests}
            min="1"
            className="mt-1"
            placeholder=""
            value={NumberOfGuest}
            onChange={(ev) => setNumberOfGuest(ev.target.value)}
          />
         {
          NumberOfGuest > place.maxGuests && <div className="text-primary">
            * cannot be more than {place.maxGuests}
          </div>
         }
        </div>

        {numberOfNights > 0 && available && (
          <div>
            <div className="p-2 ">
              <label>Your Full Name </label>
              <input
                type="text"
                className="mt-1"
                placeholder="Name"
                value={fullname}
                onChange={(ev) => setfullname(ev.target.value)}
              />
            </div>
            <div className="p-2 ">
              <label>Your Phone Number : </label>
              <input
                type="tel"
                className="mt-1"
                placeholder="hello"         
                value={mobile}
                onChange={(ev) => setmobile(ev.target.value)}
              />
              {mobile.length>13 && <div className="text-primary">
                * cannot be more than 10 digits
              </div>}
            </div>
          </div>
        )}
      </div>

      {/* <button
        onClick={checkavailable}
        className="bg-primary text-white w-full rounded-lg py-2 mt-4"
      >
        Check Availability
      </button> */}
      <button
        disabled={numberOfNights <= 0 || !available || !document.cookie || NumberOfGuest>place.maxGuests || mobile.length>13}
        onClick={bookthisplace}
        className={
          numberOfNights <= 0 || !available || !document.cookie || NumberOfGuest>place.maxGuests || mobile.length>13
            ? "bg-red-300 text-white w-full rounded-lg py-2 mt-4"
            : "bg-primary text-white w-full rounded-lg py-2 mt-4"
        }
      >
        {available?"Reserve":"Not available"}
        {(numberOfNights > 0 && available)&&<span> ₹{numberOfNights * place.price}</span>}
      </button>
      <div className="text-primary mt-1">
        {!document.cookie && "* Sign In required"  }
      </div>
    </div>
  );
};

export default BookinWidget;