
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import Modal from "react-modal"; // Popup library
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF library
import Navbar from "./Header";

Modal.setAppElement("#root"); // For accessibility

const NotesEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission

  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;
  const navigate = useNavigate();

  const handleSave = () => {
    setIsModalOpen(true); // Open popup when Save is clicked
  };

  // Function to remove HTML tags from the editor content
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Function to create a PDF from the plain text content
  const createPdfFromContent = (content, filename = "note.pdf") => {
    const doc = new jsPDF();

    // Add the stripped content to the PDF
    doc.text(content, 10, 10);

    // Create a Blob from the PDF output and return it as a File
    const pdfBlob = doc.output("blob");
    return new File([pdfBlob], filename, { type: "application/pdf" });
  };

  const submitFile = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader or change button text

    try {
      // Strip the HTML tags from the editor content to get plain text
      const plainTextContent = stripHtmlTags(editorContent);

      // Convert the plain text content to a PDF file
      const notePdfFile = createPdfFromContent(plainTextContent, `${title || "note"}.pdf`);

      // Create FormData object to handle file upload and other form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("file", notePdfFile); // Append the generated PDF file
      formData.append("userId", userId);

      console.log(formData); // Debugging log for formData

      // Make the POST request to your API endpoint
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/notes/upload`, // Upload API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
          },
        }
      );

      console.log("Upload response: ", result); // Log the response for debugging

      // Check if the response status indicates success
      if (result.status === 201) {
        toast.success("Notes Uploaded Successfully.");
      } else {
        toast.error("Failed to upload notes.");
      }

      // Clear the form fields after successful upload
      setTitle("");
      setDescription("");
      setTags("");
      setEditorContent(""); // Clear the editor content

      // Navigate to another route (e.g., notes listing or upload confirmation page)
      navigate("/editor");
    } catch (error) {
      console.log("Failed to submit file: ", error); // Log any errors that occur during the upload
      toast.error("Failed to submit file!"); // Show error notification
    } finally {
      setIsLoading(false); // Reset the loading state once the process completes
    }
  };

  return (
    <div className="p-6">
      <Navbar />
      <div className="p-20">
        <div className="mb-10 pt-10">
          <div className="flex justify-front gap-4">
            <button
              className="px-4 py-2 bg-buttoncolor font-semibold text-white rounded-md hover:bg-buttonhovercolor"
              onClick={() => navigate("/")} // Example of Cancel navigation
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-buttoncolor font-semibold text-white rounded-md hover:bg-buttonhovercolor"
            >
              Save
            </button>
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          placeholder="Start writing your note here..."
          className="h-64 mb-4 w-full"
          style={{ height: "400px", color: "white" }}
        />

        {/* Modal for the note details */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Note Details Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              backgroundColor: "#1a202c",
              borderRadius: "10px",
              border: "none",
              padding: "20px",
              color: "white",
            },
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-white">Enter Note Details</h2>
          <form onSubmit={submitFile} className="flex flex-col">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 p-2 border rounded bg-gray-700 text-white"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 p-2 border rounded bg-gray-700 text-white"
              required
            />
            <input
              type="text"
              placeholder="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-4 p-2 border rounded bg-gray-700 text-white"
              required
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-buttoncolor text-white rounded hover:bg-buttonhovercolor"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-buttoncolor text-white rounded hover:bg-buttonhovercolor"
                disabled={isLoading} // Disable the button when loading
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default NotesEditor;
