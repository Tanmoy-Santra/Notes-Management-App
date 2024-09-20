



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

 
  const registerUser = async (e) => {
    e.preventDefault();
  
    // Validate if all required fields are filled
    if (!firstName || !lastName || !userBio || !userEmail || !userMobile || !userName || !userPassword || !profileImage) {
      toast.error("Please fill out all fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("userBio", userBio);
    formData.append("userEmail", userEmail);
    formData.append("userMobile", userMobile);
    formData.append("userName", userName);
    formData.append("userPassword", userPassword);
    formData.append("profileImage", profileImage);
  
    console.log(`${import.meta.env.VITE_API_URL}/auth/signup`);
  
    try {
      // Make the API call to register the user
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result);
      
  
      // On successful registration
      toast.success("User registered successfully");
            
        navigate("/login");
      
    } catch (error) {
      // Log the error details to the console
      console.error("Error in signup:", error);
  
      // Show an error message to the user
      if (error.response && error.response.data) {
        toast.error(`Failed to register: ${error.response.data.message}`);
      } else {
        toast.error("Failed to register. Please try again later.");
      }
    }
  };
  
  return (
    <div className="flex w-full items-center h-screen justify-center bg-primarybg text-textcolor">
      <form
        className="flex h-full w-full max-w-[420px] flex-col gap-3 bg-transparent p-5"
        onSubmit={registerUser}
      >
        <h1 className="text-2xl font-black">Register</h1>
        <div className="flex w-full flex-col items-center justify-center bg-transparent">
          <div className="mb-4 grid h-[100px] w-[100px] place-content-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-2xl font-black bg-transparent">
            {profilePreviewImage === "" ? (
              <p className="text-sm font-bold text-gray-500">Profile Image</p>
            ) : (
              <img src={profilePreviewImage} alt="Profile Preview" />
            )}
          </div>
          <label
            htmlFor="dropzone-file"
            className="flex mx-10 h-10 bg-transparent w-10 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:none"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5 bg-transparent">
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold bg-buttoncolor text-textcolor p-1 rounded-lg border">
                  Upload
                </span>
              </p>
              <input
                type="file"
                placeholder="File"
                accept="image/*"
                required
                id="dropzone-file"
                onChange={(e) => {
                  setProfilePreviewImage(URL.createObjectURL(e.target.files[0]));
                  setProfileImage(e.target.files[0]);
                }}
                className="hidden"
              />
            </div>
          </label>
        </div>
        <div className="flex items-start justify-center gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-center bg-transparent">
            <label className="font-bold" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userBio">Bio</label>
          <textarea
            id="userBio"
            name="userBio"
            rows="3"
            className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
            placeholder="Tell us something about yourself"
            required
            onChange={(e) => setUserBio(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
            placeholder="your.email@example.com"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center bg-transparent">
          <label className="font-bold" htmlFor="userMobile">Mobile Number</label>
          <input
            type="number"
            id="userMobile"
            name="userMobile"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
            placeholder="0000000000"
            onChange={(e) => setUserMobile(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
            placeholder="johndoe123"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userPassword">Password</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
            placeholder="*********"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <button
          className="rounded-lg bg-buttoncolor px-5 py-2 font-bold text-white hover:bg-buttonhovercolor"
        >
          Register
        </button>

        <div className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

