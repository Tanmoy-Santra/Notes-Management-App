

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../Redux/slices/user-slice";
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UniversalLoader from "../components/UniversalLoader";

const Login = () => {
  const navigate = useNavigate(); // Correctly use useNavigate hook
  const dispatch = useDispatch();
  const [isLoading,setIsLoading]=useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 
  // const [isLoading, setIsLoading] = useState(true);
  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        userEmail,
        userPassword,
      });        
      dispatch(setUserData(response.data)); 
      if(response.status===200){        
        toast.success(response.data.message) ;
        console.log(response.data.message);         
      }      
      
        navigate("/home");

    } catch (error) {
      // Log and handle error
      console.error("Cannot Login the User: ", error);
      toast.error(error.response?.data?.error || "An error occurred");
    }finally{
      setIsLoading(false);
    }
  };
 

  return (
    <div className="flex w-full h-screen items-center justify-center p-5 m-auto bg-primarybg text-center">
      <form
        className="flex flex-col w-full max-w-[420px] gap-4 rounded-xl bg-primarybg text-textcolor p-5 shadow-xl border"
        onSubmit={loginUser}
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-start justify-center w-full">
            <label className="font-bold" htmlFor="userEmail">Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border border-white p-2 focus:ring focus:ring-blue-500 bg-transparent"
              placeholder="your.email@example.com"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
         
          <div className="flex flex-col items-start justify-center w-full relative">
            <label className="font-bold" htmlFor="userPassword">Password</label>
            <input
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-white p-2 focus:ring focus:ring-blue-500 bg-transparent"
              placeholder="*********"
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>
        </div>
        <button className="rounded-lg bg-buttoncolor px-5 py-2 font-bold text-white hover:bg-buttonhovercolor w-full" type="submit">
        {isLoading ? "Processing..." : "Log In"}
        </button>
        <div className="flex items-center justify-between text-sm w-full">
          <p className="">New to FindMyNotes?</p>
          <Link to="/signup">
            <p className="font-bold">Create an account</p>
          </Link>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
