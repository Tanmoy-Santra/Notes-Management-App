



import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UniversalLoader from "./UniversalLoader";

const UploadNote = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // State for file name

  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;

  const submitFile = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader or change button text
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("file", file);
      formData.append("userId", userId);
  
      console.log(formData);
  
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/notes/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Upload response: ", result); // Log the response
      console.log(result.status);   
      if (result.status === 201) {
        toast.success("Notes Uploaded Successfully..");
        navigate("/profile");
      } else {
        toast.error("Failed to upload notes.");
      }
  
      // Clear the form fields
      setTitle('');
      setDescription('');
      setTags('');
      setFile(null);
      setFileName(''); // Clear file name state
  
      // Navigate after successful upload
     
    } catch (error) {
      console.log("Failed to submit file: ", error);
      toast.error("Failed to submit file !!");
    } finally {
      setIsLoading(false); // Hide loader or reset button text
    }
  };
   

  return (
    <form
      className="flex h-full w-full max-w-[770px] flex-col items-center justify-start p-5 text-textcolor lg:justify-center bg-transparent pt-20"
      onSubmit={submitFile}
    >
      <h1 className="mb-5 text-2xl font-black">Upload Your Notes</h1>
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-lg border border-white bg-transparent text-textcolor p-2.5 text-sm focus:border-white focus:ring-blue-500"
        />
      </div>
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full rounded-lg border border-white bg-transparent text-textcolor p-2.5 text-sm text-gray-900 focus:border-white focus:ring-blue-500"
        />
      </div>
      <div className="mb-5 w-full max-w-[550px]">
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          required
          onChange={(e) => setTags(e.target.value)}
          className="block w-full rounded-lg border border-white bg-transparent p-2.5 text-sm text-textcolor focus:border-white focus:ring-blue-500"
        />
      </div>
      <div className="flex w-full max-w-[550px] items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-54 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white bg-transparent text-textcolor hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to Upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">PDF</p>
            <input
              type="file"
              accept="application/pdf"
              required
              id="dropzone-file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0]?.name || ''); // Update file name state
              }}
              className="hidden"
            />
          </div>
        </label>
      </div>
      {fileName && (
        <div className="mb-4 text-white">
          Selected File: <span className="font-bold">{fileName}</span>
        </div>
      )}
      <button
        className="my-5 w-full max-w-[550px] rounded-xl bg-buttoncolor py-3 font-bold text-white hover:bg-buttonhovercolor"
        type="submit"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default UploadNote;
