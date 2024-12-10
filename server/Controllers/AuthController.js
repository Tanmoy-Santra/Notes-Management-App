// const express = require("express");
// const dotenv = require("dotenv");
// const User = require("../Models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const { bucket } = require("../firebase"); // Import the initialized bucket from firebase.js
// const { Readable } = require('stream');

// dotenv.config();

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Helper function to convert buffer to readable stream
// const bufferToStream = (buffer) => {
//   const stream = new Readable();
//   stream.push(buffer);
//   stream.push(null);
//   return stream;
// };

// // Signup Route
// const signup = async (req, res) => {
//   try {
//     const { firstName, lastName, userBio, userEmail, userMobile, userName, userPassword } = req.body;

//     if (!firstName || !lastName || !userBio || !userEmail || !userMobile || !userName || !userPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const hashedPassword = await bcrypt.hash(userPassword, 10);

//     let profileImageUrl = "";
//     if (req.file && req.file.buffer) {
//       profileImageUrl = await new Promise((resolve, reject) => {
//         const fileName = `profile_images/${Date.now()}_${req.file.originalname}`;
//         const uploadStream = bucket.file(fileName).createWriteStream({
//           metadata: {
//             contentType: req.file.mimetype,
//           },
//         });

//         uploadStream.on("error", (error) => {
//           console.error("Firebase Storage upload error:", error);
//           reject(error);
//         });

//         uploadStream.on("finish", () => {
//           bucket.file(fileName).getSignedUrl({
//             action: "read",
//             expires: "03-09-2491",
//           }).then((signedUrls) => {
//             resolve(signedUrls[0]);
//           }).catch((error) => {
//             console.error("Error getting signed URL:", error);
//             reject(error);
//           });
//         });

//         bufferToStream(req.file.buffer).pipe(uploadStream);
//       });
//     }

//     const newUser = new User({
//       firstName,
//       lastName,
//       userBio,
//       userEmail,
//       userMobile,
//       userName,
//       userPassword: hashedPassword,
//       profileImage: profileImageUrl,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error in signup:", error.message);  // Log the error message
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Login Route
// const login = async (req, res) => {
//   try {
//     const { userEmail, userPassword } = req.body;

//     if (!userEmail || !userPassword) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }

//     const user = await User.findOne({ userEmail });
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
//     if (!passwordMatch) {
//       return res.status(400).json({ error: "Invalid password" });
//     }
//     //console.log('JWT Secret:', process.env.JWT_SECRET);

//     const token = jwt.sign(
//       { userId: user._id, userName: user.userName },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
    
    
//     const { userPassword: _, ...userData } = user._doc;

//     return res.status(200).json({
//       ...userData,
//       token,
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Export routes
// module.exports = { signup, login };



const express = require("express");
const dotenv = require("dotenv");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { bucket } = require("../firebase"); // Import the initialized bucket from firebase.js
const { Readable } = require('stream');

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to convert buffer to readable stream
const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// Signup Route
// const signup = async (req, res) => {
//   try {
//     const { firstName, lastName, userBio, userEmail, userMobile, userName, userPassword } = req.body;

//     // Ensure all required fields are provided
//     if (!firstName || !lastName || !userBio || !userEmail || !userMobile || !userName || !userPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the email is already in use
//     const existingUser = await User.findOne({ userEmail });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already in use" });
//     }

//     const hashedPassword = await bcrypt.hash(userPassword, 10);

//     let profileImageUrl = "";
//     if (req.file && req.file.buffer) {
//       profileImageUrl = await new Promise((resolve, reject) => {
//         const fileName = `profile_images/${Date.now()}_${req.file.originalname}`;
//         const uploadStream = bucket.file(fileName).createWriteStream({
//           metadata: {
//             contentType: req.file.mimetype,
//           },
//         });

//         uploadStream.on("error", (error) => {
//           console.error("Firebase Storage upload error:", error);
//           reject(error);
//         });

//         uploadStream.on("finish", () => {
//           bucket.file(fileName).getSignedUrl({
//             action: "read",
//             expires: "03-09-2491",
//           }).then((signedUrls) => {
//             resolve(signedUrls[0]);
//           }).catch((error) => {
//             console.error("Error getting signed URL:", error);
//             reject(error);
//           });
//         });

//         bufferToStream(req.file.buffer).pipe(uploadStream);
//       });
//     }

//     const newUser = new User({
//       firstName,
//       lastName,
//       userBio,
//       userEmail,
//       userMobile,
//       userName,
//       userPassword: hashedPassword,
//       profileImage: profileImageUrl,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error in signup:", error.message);  // Log the error message
//     res.status(500).json({ message: "Server error" });
//   }
// };

const signup = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Ensure required fields are provided
    if (!userEmail || !userPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Handle profile image upload to Firebase
    let profileImageUrl = "";
    if (req.file && req.file.buffer) {
      profileImageUrl = await new Promise((resolve, reject) => {
        const fileName = `profile_images/${Date.now()}_${req.file.originalname}`;
        const uploadStream = bucket.file(fileName).createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });

        uploadStream.on("error", (error) => {
          console.error("Firebase Storage upload error:", error);
          reject(error);
        });

        uploadStream.on("finish", () => {
          bucket
            .file(fileName)
            .getSignedUrl({
              action: "read",
              expires: "03-09-2491",
            })
            .then((signedUrls) => {
              resolve(signedUrls[0]);
            })
            .catch((error) => {
              console.error("Error getting signed URL:", error);
              reject(error);
            });
        });

        bufferToStream(req.file.buffer).pipe(uploadStream);
      });
    }

    // Create new user
    const newUser = new User({
      userEmail,
      userPassword: hashedPassword,
      profileImage: profileImageUrl,
      userName: userEmail.split("@")[0],
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in signup:", error.message); // Log the error message
    res.status(500).json({ message: "Server error" });
  }
};


// Login Route
const login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

  

    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Set token expiration time to 1 hour
    const token = jwt.sign(
      { userId: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Remove sensitive fields like the password from the response
    const { userPassword: _, ...userData } = user._doc;

    return res.status(200).json({
      ...userData,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export routes
module.exports = { signup, login };
