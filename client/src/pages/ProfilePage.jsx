import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import AccountNav from "../AccountNav";

const ProfilePage = () => {
  const { subpage } = useParams();

  const { ready, userinfo, setuserinfo } = useContext(UserContext);

  async function handlelogout() {
    const response = await axios.get("/logout", {
      withCredentials: true,
    });
    if (response.data === "ok") setuserinfo(null);
  }

  if (!ready) {
      return(
        <div className="flex flex-col items-center justify-center flex-grow">
        <div className=" h-12 w-12 border-4 border-r-transparent animate-spin border-solid rounded-full border-black">
        </div>
      
        <h1 className="font-semibold">Loading...</h1>
        
        </div>
      ); 
  }
  if (ready && !userinfo) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === undefined && (
        <div className="text-center mt-10 ">
          Logged in as {userinfo.name} ({userinfo.email})
          <br />
          <button
            className="bg-primary w-3/12 rounded-2xl text-white py-2 mt-2"
            onClick={handlelogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
