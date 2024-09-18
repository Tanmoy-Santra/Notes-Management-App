



import React, { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from '../components/Header';
import Footer from "../components/Footer";
import UniversalLoader from "../components/UniversalLoader";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  const [userFiles, setUserFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserFiles = async () => {
      if (!user || !user._id) {
        // If user is not defined or userId is not available, return early
        return;
      }
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('authToken');

        if (!token) {
          console.error("No authentication token found");
          return;
        }
        
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/notes/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        
        if (result.data && result.data.data) {
          setUserFiles(result.data.data);  // Safely accessing the data
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserFiles();
  }, [user]);

  const numberOfUploads = userFiles.length;

  function DateTimeExtraction(isoString) {
    const datePart = isoString.split('T')[0];
    const timePart = isoString.split('T')[1].split('.')[0];
    return `Created on: ${datePart}, ${timePart}`;   
  }

  if (!user || !user._id) {
    // Optionally, render a loading state or redirect if user is not authenticated
    return <p>Loading profile...</p>;
  }

  if (isLoading) {    
    return <UniversalLoader />;
  }

  return (
    <>
      <Header />
      <div className="lg:h-screen flex flex-col items-center justify-center lg:flex-row bg-primarybg text-textcolor pt-20">
        <div className="flex w-full flex-col items-center justify-center py-4 lg:h-full lg:w-[40%] bg-primarybg">
          <div className="grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full bg-gray-400 text-2xl font-black">
            <img src={user.profileImage} alt="userprofile" />
          </div>
          <div className="my-2 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-black">
              {user.firstName} {user.lastName}
            </h2>
            <p className="mt-1 text-center">{user.userName}</p>
            <p className="mt-1 text-center">
              {user.userBio}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="grid h-[80px] w-[100px] place-content-center">
              <p className="text-center text-[12px] font-bold">
                No. of Uploads:
              </p>
              <p className="text-center text-5xl font-black">{numberOfUploads}</p>
            </div>
          </div>
        </div>
        <div className="h-auto w-full p-5 lg:h-full lg:w-[60%]">
          <h1 className="mb-3 text-xl font-black">My Documents:</h1>
          <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
            {userFiles.map((file) => (
              <a
                href={file.files} // This URL directly points to the file in MongoDB
                key={file._id}
                className="mb-3 flex h-auto max-w-[300px] items-center justify-between gap-10 rounded-xl border border-black p-4 bg-buttoncolor text-textcolor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-row">
                  <FaRegFilePdf size="50" className="m-2"/>
                  <p className="font-bold flex flex-col">
                    {file.fileName}<br />
                    <span className="text-gray-300 font-semibold text-sm">
                      {file.fileDescription}
                    </span>
                    <span className="text-gray-300 font-semibold text-sm">
                      {DateTimeExtraction(file.uploadedOn)}
                    </span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;