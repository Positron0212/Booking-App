import axios from "axios";
import { useEffect, useState } from "react";
import Perks from "../Perks";
import { Navigate, useParams } from "react-router-dom";
import Photouploader from "../Photouploader";

const Placesformpage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setredirect] = useState("");
  const[price,setprice]=useState(100);

  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
     
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extrainfo);
      setCheckOut(data.checkOut);
      setCheckIn(data.checkIn);
      setMaxGuests(data.maxGuests);
      setprice(data.price);
    });
  }, [id]);

  async function handlesubmit(ev) {
    ev.preventDefault();
    if (id) {
      //update
      const response = await axios.put(
        "/places",
        { id,
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setredirect(true);
      }
    }
     else {
      //new
      const response = await axios.post(
        "/places",
        {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setredirect(true);
      }
    }
  }

  if (redirect) return <Navigate to={"/account/places"} />;

  return (
    <div className="max-w-screen-xl mx-auto border border-dashed border-black p-3 mt-7">
      <form onSubmit={handlesubmit}>
        <h2 className="md:text-2xl text-xl md:mt-4 ">Title</h2>
        <p className="text-gray-400 mb-1">
          Title for your place,should be short and catchy
        </p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <h2 className="md:text-2xl text-xl md:mt-4 mt-2">Address</h2>
        <p className="text-gray-400 mb-1">Address to this place</p>
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        <Photouploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <h2 className="md:text-2xl text-xl md:mt-4 mt-2">Description</h2>
        <p className="text-gray-400 mb-1">Descripton of your place</p>
        <textarea
         required
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <h2 className="md:text-2xl text-xl md:mt-4 mt-2 ">Perks</h2>
        <p className="text-gray-400 mb-1">select all perks of your places</p>
        <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <h2 className="md:text-2xl text-xl md:mt-4 mt-2">Extra info</h2>
        <p className="text-gray-400 mb-1">House rules,etc.</p>
        <textarea
           required
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        <h2 className="md:text-2xl text-xl md:mt-4 mt-2">Check In & Check Out Time</h2>
        <p className="text-gray-400 mb-1">
          Add check in and check out time.Remember to have a time window for
          cleaning
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
          <div>
            check in time
            <input
            required
              type="text"
              placeholder="11:00"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            check out time
            <input
            required
              type="text"
              placeholder="12:00"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div  >
            <span className="truncate">maximum guests</span>
            <input
             required
              type="number"
              placeholder="Ex 1,2, etc"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div className="">
           Price per night
            <input
              type="number"
              value={price}
              onChange={(ev) => setprice(ev.target.value)}
            />
          </div>
        </div>
        <button className="bg-primary text-white py-3 min-w-full mt-4 rounded-2xl ">
          Save
        </button>
      </form>
    </div>
  );
};

export default Placesformpage;
