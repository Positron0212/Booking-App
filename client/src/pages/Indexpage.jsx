/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Indexpage = () => {
  const [allplaces, setallplaces] = useState([]);
  const [datafetched,setdatafetched]=useState(false);

  useEffect(() => {
    axios.get("/allplaces").then((response) => {
      const { data } = response;
      setallplaces(data);
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
    <div className="grid gap-x-6 lg:gap-y-8  md:gap-y-6  gap-y-4   grid-cols-2 md:grid-cols-3 lg:grid-cols-4   md:mt-5 mt-2   ">
      {allplaces.length > 0 &&
        allplaces.map((place) => (
          <Link to={"/place/" + place._id} key={place._id} className="z-10">
            <div className="flex bg-gray-500 rounded-xl ">
              <img
                src={place.photos[0]}
                className="aspect-square object-cover rounded-xl md:transition duration-300 md:hover:scale-[1.03] "
                alt=""
          
              />
            </div>

            <p className="font-bold flex gap-1 md:text-base text-sm items-center md:leading-8 leading-6 mt-1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 "
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">{place.address}</span>
            </p>
            <h2 className=" mx-1 leading-4 font-serif truncate md:text-lg text-base text-gray-500 ">
              {place.title}
            </h2>
            <p className="font-bold md:text-base text-sm ml-1 opacity-70  mt-1">
              ₹{place.price} night
            </p>
          </Link>
          
          
        ))}
    </div>
  )};
};

export default Indexpage;
