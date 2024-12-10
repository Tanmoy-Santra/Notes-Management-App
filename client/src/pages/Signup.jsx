



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [profilePreviewImage, setProfilePreviewImage] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userMobile, setUserMobile] = useState("");
//   const [userBio, setUserBio] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userName, setUserName] = useState("");
//   const [userPassword, setUserPassword] = useState("");
//   const [isLoading,setIsLoading]=useState(false);
 
//   const registerUser = async (e) => {
//     e.preventDefault();
//     // Validate if all required fields are filled
//     if (!firstName || !lastName || !userBio || !userEmail || !userMobile || !userName || !userPassword || !profileImage) {
//       alert("Please fill out all fields.");
//       return;
//     }
//     setIsLoading(true)
  
//     const formData = new FormData();
//     formData.append("firstName", firstName);
//     formData.append("lastName", lastName);
//     formData.append("userBio", userBio);
//     formData.append("userEmail", userEmail);
//     formData.append("userMobile", userMobile);
//     formData.append("userName", userName);
//     formData.append("userPassword", userPassword);
//     formData.append("profileImage", profileImage);
  
//     console.log(`${import.meta.env.VITE_API_URL}/auth/signup`);
  
//     try {
//       // Make the API call to register the user
//       const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(result);
//       if(result.status===201){        
//         toast.success(result.data.message);              
//           navigate("/login");
        
//       }else if(result.status===400){
//         toast.error("user already exsist");
//       }
  
//       // On successful registration
//     } catch (error) {
//       // Log the error details to the console
//       console.error("Error in signup:", error);
  
//       // Show an error message to the user
//       if (error.response && error.response.data) {
        
//         toast.error(`Failed to register: ${error.response.data.message}`);
//       } else {
//         toast.error("Failed to register. Please try again later.");
//       }
//     }finally{
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="flex w-full items-center h-screen justify-center bg-primarybg text-textcolor ">
//       <form
//         className="flex h-full w-full max-w-[420px] flex-col gap-3 bg-transparent p-5 border"
//         onSubmit={registerUser}
//       >
//         <h1 className="text-2xl font-black">Register</h1>
//         <div className="flex w-full flex-col items-center justify-center bg-transparent">
//           <div className="mb-4 grid h-[100px] w-[100px] place-content-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-2xl font-black bg-transparent">
//             {profilePreviewImage === "" ? (
//               <p className="text-sm font-bold text-gray-500">Profile Image</p>
//             ) : (
//               <img src={profilePreviewImage} alt="Profile Preview" />
//             )}
//           </div>
//           <label
//             htmlFor="dropzone-file"
//             className="flex mx-10 h-10 bg-transparent w-10 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:none"
//           >
//             <div className="flex flex-col items-center justify-center pb-6 pt-5 bg-transparent">
//               <p className="mb-2 text-sm text-gray-500">
//                 {/* <span className="font-semibold bg-buttoncolor text-textcolor p-1 rounded-lg border">
//                   Upload
//                 </span> */}
//               </p>
//               <input
//                 type="file"
//                 placeholder="File"
//                 accept="image/*"
//                 id="dropzone-file"
//                 onChange={(e) => {
//                   setProfilePreviewImage(URL.createObjectURL(e.target.files[0]));
//                   setProfileImage(e.target.files[0]);
//                 }}
//                 required
//                 // className="hidden"
//                 visibility=" hidden"
//               />
//             </div>
//           </label>
//         </div>
//         <div className="flex items-start justify-center gap-4">
//           <div className="flex flex-col items-start justify-center">
//             <label className="font-bold" htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
//               placeholder="First Name"
//               required
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col items-start justify-center bg-transparent">
//             <label className="font-bold" htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
//               placeholder="Last Name"
//               required
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userBio">Bio</label>
//           <textarea
//             id="userBio"
//             name="userBio"
//             rows="1"
//             className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
//             placeholder="Tell us something about yourself"
//             required
//             onChange={(e) => setUserBio(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userEmail">Email</label>
//           <input
//             type="email"
//             id="userEmail"
//             name="userEmail"
//             className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
//             placeholder="your.email@example.com"
//             required
//             onChange={(e) => setUserEmail(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center bg-transparent">
//           <label className="font-bold" htmlFor="userMobile">Mobile Number</label>
//           <input
//             type="tel"
//             id="userMobile"
//             name="userMobile"
//             className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
//             placeholder="0000000000"
//             pattern="^[6-9]\d{9}$"
//             required
//             onChange={(e) => setUserMobile(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userName">Username</label>
//           <input
//             type="text"
//             id="userName"
//             name="userName"
//             className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
//             placeholder="johndoe123"
//             required
//             onChange={(e) => setUserName(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center">
//           <label className="font-bold" htmlFor="userPassword">Password</label>
//           <input
//             type="password"
//             id="userPassword"
//             name="userPassword"
//             className="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none bg-transparent"
//             placeholder="4-10 digit"
//             pattern="^\d{4,}$"
//             required
//             onChange={(e) => setUserPassword(e.target.value)}
//           />
//         </div>
//         <button
//           className="rounded-lg bg-buttoncolor px-5 py-2 font-bold text-white hover:bg-buttonhovercolor"
//         >
//           {isLoading ? "Processing..." : "Register"}
//         </button>

//         <div className="text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="font-bold text-blue-500 hover:underline">
//             Login
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!userEmail || !userPassword || !profileImage) {
      alert("Please fill out all fields.");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("userEmail", userEmail);
    formData.append("userPassword", userPassword);
    formData.append("profileImage", profileImage);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status === 201) {
        toast.success(result.data.message);
        navigate("/login");
      } else if (result.status === 400) {
        toast.error("User already exists");
      }
    } catch (error) {
      console.error("Error in signup:", error);
      if (error.response && error.response.data) {
        toast.error(`Failed to register: ${error.response.data.message}`);
      } else {
        toast.error("Failed to register. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primarybg text-textcolor">
      <form
        className="w-full max-w-md p-6 space-y-6 bg-transparent border border-gray-400 rounded-lg"
        onSubmit={registerUser}
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <div className="flex flex-col items-center">
          <div className="mb-4 w-24 h-24 overflow-hidden rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
            {profilePreviewImage === "" ? (
              <span className="text-sm text-gray-500">Profile</span>
            ) : (
              <img
                src={profilePreviewImage}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <label htmlFor="dropzone-file" className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              id="dropzone-file"
              className="hidden"
              onChange={(e) => {
                setProfilePreviewImage(URL.createObjectURL(e.target.files[0]));
                setProfileImage(e.target.files[0]);
              }}
              required
            />
            <span className="text-sm font-bold text-blue-500 hover:underline">
              Upload Profile Image
            </span>
          </label>
        </div>
        <div>
          <label
            htmlFor="userEmail"
            className="block text-sm font-bold text-textcolor"
          >
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            className="w-full p-2 mt-1 rounded-lg border bg-transparent focus:outline-none focus:border-blue-500"
            placeholder="your.email@example.com"
            required
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <label
            htmlFor="userPassword"
            className="block text-sm font-bold text-textcolor"
          >
            Password
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="userPassword"
            name="userPassword"
            className="w-full p-2 mt-1 rounded-lg border bg-transparent focus:outline-none focus:border-blue-500"
            placeholder="4-10 digit"
            pattern="^\d{4,}$"
            required
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-5"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          className="w-full py-2 text-white bg-buttoncolor rounded-lg hover:bg-buttonhovercolor focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Register"}
        </button>
        <div className="text-sm text-center">
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
