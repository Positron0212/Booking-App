import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userinfo } = useContext(UserContext);

  return (
    <header className="flex justify-between  ">
      <Link to={"/"} className="flex items-center gap-1 text-primary ">
        <img
          className="sm:w-9 sm:h-9 h-8 w-8"
          src="https://www.vectorlogo.zone/logos/airbnb/airbnb-icon.svg"
          alt=""
        />

        <span className="font-bold text-xl max-lg:hidden">Airbnb</span>
      </Link>
      <div className="flex items-center sm:gap-3 gap-[5px] border border-gray-300 rounded-full py-2 sm:px-4 px-2 shadow-md shadow-gray-300 lg:ml-28">
        <div>Anywhere</div>
        <div className="border-l border-gray-300  sm:h-8 h-6  "></div>
        <div className="text-nowrap">Any week</div>
        <div className="border-l border-gray-300  sm:h-8 h-6"></div>
        <div className="text-gray-400 text-nowrap">Add guests</div>
        <button className="bg-primary text-white sm:p-2 p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex  gap-3 items-center max-lg:hidden">
          <div className="font-bold">Airbnb your home</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>
        </div>
        {userinfo ? (
          <Link
            to="/account"
            className="font-bold sm:text-2xl text-lg border rounded-lg  bg-slate-300 px-3 py-[4px]  sm:px-3 sm:py-[5px] "
          >
            {userinfo.name.charAt(0).toUpperCase()}
          </Link>
        ) : (
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="sm:w-10 sm:h-10  w-9 h-9"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
