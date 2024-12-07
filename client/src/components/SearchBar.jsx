import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch, FaEye, FaRegFilePdf, FaShareAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // Assuming toast is already installed and set up

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [userNames, setUserNames] = useState({});
  const user = useSelector((state) => state.user.userData);

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Prevent searching if the query is empty

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/notes/search`, {
        params: { title: searchQuery },
      });

      const notes = response.data.data;
      if (notes.length > 0) {
        const publicNotes = notes.filter(note => note.isPublic);
        if(publicNotes.length>0){
          setSearchResults(notes);
          setSearchStatus("Found");
          const userIds = notes.map((note) => note.uploadedBy);
          await fetchUserNames(userIds);
        }else{
          setSearchResults([]);
          setSearchStatus("Not-Found");
        }
      } else {
        setSearchResults([]);
        setSearchStatus("Not-Found");
      }
    } catch (error) {
      console.error("Error Fetching Notes: ", error);
    }
  };

  // Fetch user names for the uploadedBy field in the notes
  const fetchUserNames = async (userIds) => {
    const uniqueUserIds = [...new Set(userIds)];
    const userNamesMap = { ...userNames }; // Merge with existing usernames to avoid duplicate fetching

    try {
      for (const userId of uniqueUserIds) {
        if (!userNames[userId]) {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`);
          userNamesMap[userId] = response.data.userName;
        }
      }
      setUserNames(userNamesMap);
    } catch (error) {
      console.error("Error fetching user names: ", error.response?.data || error.message);
    }
  };

  // Extract date and time from the ISO string
  const DateTimeExtraction = (isoString) => {
    const [datePart, timePart] = isoString.split('T');
    const time = timePart.split('.')[0];
    return `Created on: ${datePart}, ${time}`;
  };

  // Copy link to clipboard
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

  // Show PDF function
  const showPDF = (file) => {
    window.open(file, "_blank", "noreferrer");
  };

  return (
    <div className="bg-primarybg h-screen text-textcolor items-center">
      <div className="h-screen flex flex-col items-center justify-start p-4 bg-primarybg text-textcolor pt-10 mt-10">
        <div className="flex w-full items-center justify-center">
          <form className="w-full max-w-[700px] rounded-xl bg-[#374151] p-4" onSubmit={handleSearch}>
            <div className="flex items-center justify-between">
              <FaSearch className="text-2xl text-white" />
              <input
                type="search"
                placeholder="Search for Notes"
                className="ml-2 w-full bg-[#374151] text-white p-1 m-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bottom-2.5 end-2.5 rounded-lg bg-buttoncolor px-3 py-2 text-sm font-medium text-white hover:bg-buttonhovercolor"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {searchStatus === "Found" && searchResults.length > 0 ? (
            searchResults.map((note) => (
              <div
                key={note._id}
                className="flex w-full max-w-[320px] flex-wrap-reverse items-center justify-between rounded-xl bg-buttoncolor px-3 py-2 text-white shadow-lg"
              >
                <div className="flex flex-row">
                  <span className="m-2">
                    <FaRegFilePdf size="30" />
                  </span>
                  <p className="text-sm flex flex-col">
                    <span className="font-bold">{note.fileName}</span>
                    <span>{note.description}</span>
                    <span className="text-gray-300 font-semibold text-sm">
                      {userNames[note.uploadedBy] || "Unknown User"}
                    </span>
                    <span className="text-gray-300 font-semibold text-sm">
                      {DateTimeExtraction(note.uploadedOn)}
                    </span>
                    <span className="text-gray-300 font-semibold text-sm"> {note.isPublic ? "Public" : "Private"}</span>
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <button
                    className="bg-buttoncolor border border-white hover:bg-buttonhovercolor rounded-sm p-1"
                    onClick={() => showPDF(note.files)}
                  >
                    <FaEye size="24" color="white" />
                  </button>
                  <button
                    className="bg-buttoncolor  hover:bg-buttonhovercolor rounded-sm p-1 "
                    onClick={() => copyToClipboard(note.files)}
                  >
                    <FaShareAlt size="16" color="white" />
                  </button>
                </div>
              </div>
            ))
          ) : searchStatus === "Not-Found" ? (
            <div className="mt-4 text-center text-gray-600 dark:text-gray-400">No Notes Found</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
