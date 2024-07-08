import { Link } from "react-router-dom";

import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

const Placespage = () => {
  const [places, setplaces] = useState([]);
  const [datafetched,setdatafetched]=useState(false);

  useEffect(() => {
    axios.get("/places", { withCredentials: true }).then(({ data }) => {
      setplaces(data);
      setdatafetched(true);
    });
  }, []);

  if(!datafetched){
    return(
      <div className="flex flex-col items-center justify-center flex-grow">
      <div className=" h-12 w-12 border-4 border-r-transparent animate-spin border-solid rounded-full border-black">
      </div>
    
      <h1 className="font-semibold">Loading...</h1>
      
      </div>
    );
  }  
  else{
  return (
    <div>
      <AccountNav />
      <div className="mt-4 ">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/'+place._id}
              key={place._id}
              className=" bg-gray-200 rounded-2xl mb-4 flex md:gap-4 gap-2 "
            >
              <div className="w-[15rem] h-[15rem]  max-sm:w-[8rem] max-sm:h-[8rem]  max-md:w-[12rem] max-md:h-[12rem] overflow-hidden  shrink-0 rounded-l-2xl">
                {place.photos.length > 0 && (
                  <img
                    src={place.photos[0]}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div className=" pt-2 overflow-hidden">
                <h2 className="md:text-xl  font-bold  ">{place.title} </h2>
                
                <p className="mt-5 font-bold flex  items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="md:size-6 size-4  "
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
                 <span className="truncate md:text-base text-sm"> {place.address}</span>
                </p>
              </div>
            </Link>
          ))}
      </div>

      <div className="text-center mt-5">
        <Link
          to={"/account/places/new"}
          className=" inline-flex gap-2 bg-primary text-white py-3 px-5 rounded-full items-center max-md:text-sm mb-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="md:size-6 size-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new Place
        </Link>
      </div>
    </div>
  );
}
};

export default Placespage;
