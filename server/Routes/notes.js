
const express = require("express");
const { uploadNote, getNote, getNoteByID, getAllNotes } = require("../Controllers/NotesController");
console.log({ uploadNote, getNote, getNoteByID, getAllNotes });

const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadNote); // File upload
router.get("/search", getNote); // Search notes
router.get("/user/:id", getNoteByID); // Get notes by user ID
router.get("/all", getAllNotes); // Get all notes

module.exports = router;
