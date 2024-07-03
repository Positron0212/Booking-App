import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SearchPage = () => {
  const [list, setList] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { query } = useParams();
  useEffect(() => {
    if (query) {
      axios.get(`/search/${query}`).then((response) => {
        if (response.status === 200) {
          setList(response.data);
          setRedirect(true);
        }
      });
    }
  }, [query]);
  if (!redirect) {
    return <div>...loading</div>;
  } else {
    if (list.length === 0)
      return (
        <h1 className="font-bold text-3xl">
          No place found matching to "{query}"
        </h1>
      );
    else {
      return (
        <div className="mt-4 ">
          <h1 className="font-bold text-3xl mb-5">
            Search Results for "{query}" :-
          </h1>
          {list.length > 0 &&
            list.map((place) => (
              <Link
                to={"/place/" + place._id}
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

                  <p className="mt-5 font-semibold">
                    Price Per Night: ₹{place.price}
                  </p>
                  <p className="mt-5 font-bold flex  items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="md:size-6 size-4 "
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
                    <span className="truncate md:text-base text-sm">
                      {" "}
                      {place.address}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      );
    }
  }
};

export default SearchPage;
