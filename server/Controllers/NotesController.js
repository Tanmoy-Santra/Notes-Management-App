



const express = require("express");
const dotenv = require("dotenv");
const Notes = require("../Models/Notes");
const multer = require("multer");
const path = require("path");
const { bucket } = require("../firebase");  // Import the initialized bucket from firebase.js
const { Readable } = require('stream');

dotenv.config();

const router = express.Router();

// Set up multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to convert buffer to readable stream
const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// Generate a V4 signed URL for uploading the file
const generateV4UploadSignedUrl = async (fileName) => {
  try {
    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: "application/pdf", // Adjust contentType based on the file type
    };

    const [url] = await bucket.file(fileName).getSignedUrl(options);
    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw new Error("Failed to generate signed URL");
  }
};




const uploadNote = async (req, res) => {
  try {
      const fileName = req.body.title;
      const fileDescription = req.body.description;
      const tags = req.body.tags;
      const uploadedBy = req.body.userId;
      const file = req.file;

      if (!file) {
          return res.status(400).json({ error: "No file uploaded" });
      }

      const fileNameInStorage = `notes/${Date.now()}${path.extname(file.originalname)}`;

      // Upload file to Firebase Storage
      const uploadStream = bucket.file(fileNameInStorage).createWriteStream({
          metadata: {
              contentType: file.mimetype,
          },
      });

      uploadStream.on("error", (error) => {
          console.error("Firebase Storage upload error:", error);
          return res.status(500).json({ error: error.message });
      });

      uploadStream.on("finish", async () => {
          try {
              // Make the file publicly accessible immediately after upload
              await bucket.file(fileNameInStorage).makePublic();

              // Construct the public URL
              const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileNameInStorage}`;
              
              console.log(publicUrl);

              // Save file metadata in MongoDB
              const newFile = new Notes({
                  fileName: fileName,
                  fileDescription: fileDescription,
                  tags: tags,
                  files: publicUrl,  // Store the public Firebase file URL in MongoDB
                  uploadedBy: uploadedBy
              });

              await newFile.save();
              res.status(201).json({ status: "Ok", url: publicUrl });
          } catch (error) {
              console.error("Error making file public:", error);
              res.status(500).json({ error: "Failed to make file public" });
          }
      });

      // Stream the file buffer to Firebase Storage
      bufferToStream(file.buffer).pipe(uploadStream);
  } catch (error) {
      console.error('Error in uploadNote:', error);
      res.status(500).json({ error: "Server error" });
  }
};

// Upload Note Route



// Get Note Route
const getNote = async (req, res) => {
  try {
    const { title, tag } = req.query;
    const query = {};

    if (title) {
      query.fileName = { $regex: title, $options: "i" };
    }

    if (tag) {
      query.tags = { $regex: tag, $options: "i" };
    }

    const data = await Notes.find(query);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error in getNote:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const getNoteByID = async (req, res) => {
  try {
    const userId = req.params.id;  // Ensure userId is passed correctly from frontend
    const data = await Notes.find({ uploadedBy: userId });
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error in getNoteByID:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Get All Notes Route
const getAllNotes = async (req, res) => {
  try {
    const data = await Notes.find({});
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error in getAllNotes:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Export routes
module.exports = { uploadNote, getNote, getNoteByID, getAllNotes };
