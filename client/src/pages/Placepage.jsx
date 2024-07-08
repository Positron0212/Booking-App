import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookinWidget from "./BookinWidget";

const Placepage = () => {
  const { id } = useParams();
  const [place, setplace] = useState({});
  const [showAllphotos, setshowAllphotos] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [datafetched,setdatafetched]=useState(false);
  useEffect(() => {
    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setplace(data);
      setdatafetched(true);
    });
  }, [id]);

  function handleshowmore() {
    setShowMore(true);
  }
  function handleshowless() {
    setShowMore(false);
  }
  
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

  if (showAllphotos)
    return (
      <div className="absolute inset-0 bg-white min-w-full min-h-screen z-50">
        <h1 className="md:text-4xl text-center p-8 pb-0 max-md:text-lg ">
          Photos of {place.title}
        </h1>

        <button className="" onClick={() => setshowAllphotos(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9 fixed  md:inset-2 lg:inset-4 inset-0 cursor-pointer hover:bg-slate-300 rounded-full p-2 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className=" grid gap-4 p-3">
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index}>
                <img src={photo} alt="" className="m-auto" />
              </div>
            ))}
        </div>
      </div>
    );
  else {
    return (
      <div className="sm:mt-4 ">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold ">
          {place.title}
        </h1>
        <a
          target="_blank"
          href={"https://map.google.com/?q=" + place.address}
          className="inline-block my-1 underline max-sm:text-sm text-lg text-gray-600"
        >
          <span className="flex items-center gap-1 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>{" "}
            {place.address}
          </span>
        </a>
        <div className="grid md:gap-2 gap-1 grid-cols-[2fr_1fr] md:mt-6 mt-4 relative">
          {place.photos?.[0] && (
            <div className="relative" onClick={() => setshowAllphotos(true)}>
              <img
                src={place.photos[0]}
                alt=""
                className="rounded-l-2xl object-cover lg:h-[450px] md:h-[350px] h-[300px] w-full object-center "
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-15 cursor-pointer transition duration-300 rounded-lg"></div>
            </div>
          )}

          <div className="grid md:gap-2 gap-1 ">
            {place.photos?.[1] && (
              <div className="relative" onClick={() => setshowAllphotos(true)}>
                <img
                  src={place.photos[1]}
                  alt=""
                  className="rounded-tr-2xl object-cover object-center lg:h-[221px] md:h-[171px] h-[148px] w-full "
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-15 cursor-pointer transition duration-300 rounded-lg"></div>
              </div>
            )}
            {place.photos?.[2] && (
              <div className="relative" onClick={() => setshowAllphotos(true)}>
                <img
                  src={place.photos[2]}
                  alt=""
                  className="rounded-br-2xl object-cover object-center lg:h-[221px] md:h-[171px] h-[148px] w-full "
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-15 cursor-pointer transition duration-300 rounded-lg"></div>
              </div>
            )}
            <button
              onClick={() => setshowAllphotos(true)}
              className="absolute md:right-6 md:bottom-6 right-3 bottom-3 bg-white md:px-4 px-2 py-2 rounded-md  shadow-md shadow-black-100 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:size-6 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className="text-sm md:text-base">Show all photos</span>
            </button>
          </div>
        </div>

        <div className="grid gap-2 md:mt-7 mt-5  grid-cols-1 md:grid-cols-[2fr_1fr] max-md:gap-5">
          <div>
            <div className="leading-8 md:mb-5 mb-3 whitespace-pre-wrap  border-dashed border-b-2 border-gray-500 pb-2">
              <h2 className=" text-xl font-semibold  md:text-2xl lg:text-3xl mb-1">
                Description
              </h2>
              <div>
                {place.description
                  ? place.description.split(" ").slice(0, 100).join(" ") +
                    " ...."
                  : "No description available"}
              </div>
              <button
                className="font-semibold  mt-3 underline"
                onClick={handleshowmore}
              >
                <p className="flex items-center">
                  Show more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </p>
              </button>
            </div>
            {showMore && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center ">
               
                <div className="whitespace-pre-line bg-white p-6 rounded-lg sm:max-w-3xl max-w-[22rem]  mx-auto max-h-[30rem] overflow-y-auto">
                <button onClick={handleshowless} className="w-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h1 className="text-3xl font-bold mb-5">About this space</h1>
                  {place.description}
                </div>
              </div>
            )}
            <div className="  mb-5  bg-white rounded-md p-2 shadow-lg ">
              <h1 className="text-xl  md:text-2xl lg:text-3xl font-semibold mb-2 ">
                Important Rules
              </h1>
              Check-In: {place.checkIn} {place.checkIn < "12" ? "AM" : "PM"}
              <br />
              Check-Out: {place.checkOut} {place.checkOut < "12" ? "AM" : "PM"}
              <br />
              Maximum number of guests: {place.maxGuests}
              <br />
            </div>
            <div>
              <h2 className="text-xl  md:text-2xl lg:text-3xl font-semibold mb-1 border-dashed border-t-2 border-gray-500 pt-2">
                What this place offers
              </h2>
              {place?.perks?.length > 0 &&
                place.perks.map((perk, index) => (
                  <ul key={index}>
                    <li className="list-disc ml-8 md:text-lg ">{perk}</li>
                  </ul>
                ))}
            </div>

            <div className="md:mt-5 mt-3  ">
              <h2 className="text-xl  md:text-2xl lg:text-3xl font-semibold pt-2 border-dashed border-t-2 border-gray-500 ">
                Extra Info:
              </h2>
              <p className=" leading-8  whitespace-pre-wrap">
                {place.extrainfo}
              </p>
            </div>
          </div>
          <div>{!showMore && <BookinWidget place={place} />}</div>
        </div>
      </div>
    );
  }
}
}
export default Placepage;
