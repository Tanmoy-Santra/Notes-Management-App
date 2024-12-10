
import React, { useEffect, useState } from "react";
import { FaRegFilePdf, FaShareAlt, FaDownload } from "react-icons/fa"; // Import the share and download icons
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import Header from '../components/Header';
// import Footer from "../components/Footer";
import UniversalLoader from "./UniversalLoader";
import { toast } from "react-toastify"; // Import toast for notifications

const Dashboard = () => {
  const user = useSelector((state) => state.user.userData);
  const [userFiles, setUserFiles] = useState([]);
  const [userNames, setUserNames] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all user names based on the IDs
  const fetchUserNames = async (userIds) => {
    try {
      const uniqueUserIds = [...new Set(userIds)];
      const userNamesMap = {};
  
      for (const userId of uniqueUserIds) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`);
          userNamesMap[userId] = response.data.userName;
        } catch (error) {
          console.error(`Error fetching user ${userId}: `, error.response ? error.response.data : error.message);
          userNamesMap[userId] = "Unknown User"; // Fallback if user fetch fails
        }
      }      
      setUserNames(userNamesMap);
    } catch (error) {
      console.log("Error fetching user names: ", error);
    }
  };

  // Function to copy the note's bucket link to clipboard
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy the link");
        console.error("Error copying to clipboard:", error);
      });
  };

  // Function to handle file download
  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  useEffect(() => {
    const getAllFiles = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('authToken');

        if (!token) {
          // Redirect to login if no token is present
          navigate('/login');
          return;
        }

        // Make the API request with the token in headers
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/notes/all`, {
          headers: {
            Authorization: `Bearer ${token}` // Add token to the request headers
          }
        });

        console.log(result.data);
        const publicFiles = result.data.data.filter(file => file.isPublic);

        setUserFiles(publicFiles);
        // Fetch user names based on uploadedBy IDs
        const userIds = publicFiles.map(file => file.uploadedBy);
        fetchUserNames(userIds);

      } catch (error) {
        console.error("Error fetching files:", error);
        // Redirect to login on error (optional)
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    getAllFiles();
  }, [navigate]);

  function DateTimeExtraction(isoString) {
    const datePart = isoString.split('T')[0];
    const timePart = isoString.split('T')[1].split('.')[0];
    return `Created on: ${datePart}, ${timePart}`;
  }

  if (isLoading) {
    return <UniversalLoader />;
  }

  return (
    <>
      <div className="lg:h-screen flex flex-col items-center justify-center lg:flex-row bg-primarybg text-textcolor">
        <div className="h-auto w-full lg:h-full lg:w-[60%]">
          <h1 className="ml-3 mb-3 text-xl font-black">All Notes</h1>
          <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
            {userFiles.length === 0 ? (
              <div className="text-center text-gray-600">No public files available.</div>
            ) : (
              userFiles.map((file) => (
              <div
                key={file._id}
                className="relative mb-3 flex h-auto max-w-[300px] items-center justify-between gap-10 rounded-xl border border-black p-4 bg-buttoncolor text-textcolor"
              >
                <a
                  href={file.files}
                  className="flex flex-row"
                  target="_blank"
                  rel="noopener noreferrer" // Added rel attribute for security
                >
                  <span className="m-2">
                    <FaRegFilePdf size="50" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-l">{file.fileName}</span>
                    <span className="text-gray-300 font-semibold text-sm">{file.fileDescription}</span>
                    <span className="text-gray-300 font-semibold text-sm">Created By: {userNames[file.uploadedBy] || "Unknown User"}</span>
                    <span className="text-gray-300 font-semibold text-sm">{DateTimeExtraction(file.uploadedOn)}</span>
                    <span className="text-gray-300 font-semibold text-sm"> {file.isPublic ? "Public" : "Private"}</span>
                  </div>
                </a>
                {/* Share icon in the top right corner */}
                <button
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(file.files)} // Call function to copy link
                >
                  <FaShareAlt size={20} />
                </button>
                {/* Download icon in the bottom right corner */}
                <button
                  className="absolute bottom-2 right-2"
                  onClick={() => handleDownload(file.files, file.fileName)} // Call function to download
                >
                  <FaDownload size={20} />
                </button>
              </div>
            )))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
