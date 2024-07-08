import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState("");
  

  const { setuserinfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setredirect(true);
        alert("login successful");
        setuserinfo(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Wrong credentials");
        setpassword("");
        setemail("");
      } else {
        alert("An error occurred. Please try again later.");
        setpassword("");
        setemail("");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex-grow flex items-center justify-center ">
      <div className="mb-12">
        <h1 className="font-bold text-2xl  md:text-3xl  text-center ">Login</h1>
        <form className="md:max-w-lg max-w-sm mx-auto p-4" onSubmit={login}>
          <input
            type="email"
            placeholder="enter email "
            value={email}
            onChange={(ev) => setemail(ev.target.value)}
            required
          />
         
          <input
            type= "password"
            placeholder="enter password"
            value={password}
            onChange={(ev) => setpassword(ev.target.value)}
            required
          />

          <button className="w-full border bg-primary text-white border-gray-500 py-3 rounded-lg">
            Login
          </button>
        </form>
        <p className="text-center">
          Not Signed In?{" "}
          <Link to={"/register"} className="text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
