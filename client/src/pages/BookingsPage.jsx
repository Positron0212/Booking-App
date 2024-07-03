import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { differenceInCalendarDays, differenceInDays, format } from "date-fns";

const BookingsPage = () => {
  const [allbookings, setallbooking] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  let isExpired=""
  
  useEffect(() => {
    axios.get("/booking", { withCredentials: true }).then((response) => {
      const { data } = response;
      setallbooking(data);
    });
  }, []);
 
  async function deleteBooking(ev,id){
    ev.preventDefault();
  const response= await axios.get("/deletebooking/"+id,{withCredentials:true});
  if (response.status === 200) {

    axios.get("/booking", { withCredentials: true }).then((response) => {
      const { data } = response;
      setallbooking(data);
    });
  }
    
}



  return (
    <div>
      <AccountNav />
      
      <div className="mt-4 ">
        {allbookings.length > 0 &&
          allbookings.map((booking) => (
            <Link to={`/place/${booking.place._id}`} 
              key={booking._id}
              className=" bg-gray-200 rounded-2xl mb-12 flex md:gap-4 gap-2 relative"
            >
            {isExpired=differenceInDays(new Date(booking.checkOut),currentDate)< 0}

              <div className="w-[15rem] h-[15rem]  max-sm:w-[9rem] max-sm:h-[9rem]  max-md:w-[12rem] max-md:h-[12rem]   overflow-hidden  shrink-0 rounded-l-2xl relative">
                  {booking.place.photos.length > 0 && (
                  <img
                    src={booking.place.photos[0]}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                )}
                {isExpired && 
                <span className="absolute inset-0 inline-block bg-white h-8 sm:h-10  text-center rounded-md max-md:text-sm text-primary -rotate-45 my-auto px-2 max-sm:text-xs">booking period already passed</span>}
              </div>
              <div className="grow-0  md:pt-2 pt-1 overflow-hidden ">
                <h2 className=" text-base md:text-xl font-bold truncate">{booking.place.title} </h2>

                <div className="md:mt-3 mt-2 md:text-base text-sm flex md:gap-3 items-center">
                  <div className="flex  items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 md:size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    {format(new Date(booking.checkIn), "dd-MM-yyyy")}
                  </div>

                  <span>&rarr;</span>
                  <div className="flex  items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 md:size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                  </div>
                </div>
                <div className="md:text-base text-sm md:mt-3 mt-2   flex gap-1 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                  
                  Nights
                </div>
                <div className="md:text-base text-sm md:mt-3 mt-2   flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                  Total price : ₹{booking.price}
                </div>

                <p className="md:mt-3 mt-2  items-center flex md:text-base text-sm ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 md:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  {booking.place.address}
                </p>
                </div>
                
              <button disabled={isExpired} onClick={(ev)=>deleteBooking(ev,booking._id)}   className={isExpired ? " bg-red-200 p-2  text-white rounded-xl absolute right-0 md:-bottom-10 -bottom-9 md:text-base text-sm" : " bg-primary p-2  text-white rounded-xl absolute right-0 md:-bottom-10 -bottom-9 md:text-base text-sm "}>Cancel Booking</button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
