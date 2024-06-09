import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState("");
  async function register(ev) {
    ev.preventDefault();
   const response= await axios.post("/register",{
    name,
    email,
    password,
   })
    if (response.status === 200) {
      alert("registration successful");
      setredirect(true);
    } else alert("registration failed");
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="grow flex  items-center justify-around">
      <div className="mb-12">
        <h1 className="font-bold text-2xl  md:text-3xl text-center ">Register</h1>
        <form className="md:max-w-lg max-w-sm mx-auto p-4" onSubmit={register}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(ev) => setname(ev.target.value)}
          />
          <input
            type="email"
            placeholder="Enter email "
            value={email}
            onChange={(ev) => setemail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(ev) => setpassword(ev.target.value)}
          />
          <button className="w-full border bg-primary text-white border-gray-500 py-3 rounded-lg">
            Register
          </button>
        </form>
        <p className="text-center">
          {" "}
          Already a member?{" "}
          <Link to={"/login"} className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
