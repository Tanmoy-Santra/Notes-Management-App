<div align="center">
  <h1><strong><a href="https://notes-management-app-drqo.vercel.app/">MyNotes App</a></strong></h1>
</div>
  
# Notes Management App

This is a full-stack Notes Management application built using the MERN stack. The client side uses Vite with React, and the server side is powered by Express. 

- User friendly interface .
- Include Login Signup Authentication .
- With organized Data storage system .

# [Demo ](https://notes-management-app-drqo.vercel.app/)


![WhatsApp Image 2024-09-20 at 21 23 18_11722af3](https://github.com/user-attachments/assets/4d7ced00-c8b7-4de3-8bf9-d714ca18fb38)

![WhatsApp Image 2024-09-20 at 21 24 52_7f6ae49d](https://github.com/user-attachments/assets/4b6c7dcf-26c7-4311-a2b8-16e245625999)

![WhatsApp Image 2024-09-20 at 21 27 23_d3f65737](https://github.com/user-attachments/assets/fbd82f84-edc6-448a-9dcf-4575ce0c4347)


# Notes Management App

This is a full-stack Notes Management application built using the MERN stack. The client side uses Vite with React, and the server side is powered by Express. 

## Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- Git

### 1. Clone the repository

git clone https://github.com/Tanmoy-Santra/Notes-Management-App

# Project Dependencies

This document provides an overview of all the dependencies used in the backend and frontend projects along with their descriptions.

---

## Backend Dependencies

### Dependencies

| Dependency       | Version   | Description                                                                                 |
|-------------------|-----------|---------------------------------------------------------------------------------------------|
| `bcrypt`         | ^5.1.1    | A library to help you hash passwords securely.                                              |
| `body-parser`    | ^1.20.2   | Middleware to parse incoming request bodies in a middleware before handling them.           |
| `cloudinary`     | ^2.4.0    | A library for uploading, managing, and transforming images and videos in the cloud.         |
| `cors`           | ^2.8.5    | Middleware to enable Cross-Origin Resource Sharing (CORS) in Express apps.                 |
| `dotenv`         | ^16.4.5   | Loads environment variables from a `.env` file into `process.env`.                         |
| `express`        | ^4.19.2   | A fast, unopinionated, minimalist web framework for Node.js.                                |
| `firebase`       | ^10.13.0  | Firebase client SDK to access Firebase services like authentication and Firestore.          |
| `firebase-admin` | ^12.4.0   | Firebase Admin SDK to interact with Firebase services from privileged environments.         |
| `gridfs-stream`  | ^1.1.1    | Stream large files to MongoDB GridFS.                                                      |
| `jsonwebtoken`   | ^9.0.2    | A library to generate and verify JSON Web Tokens (JWTs).                                   |
| `mongodb`        | ^6.8.0    | MongoDB driver for Node.js, allowing interaction with MongoDB databases.                   |
| `mongoose`       | ^8.3.4    | MongoDB object modeling for Node.js.                                                       |
| `multer`         | ^1.4.5-lts.1 | Middleware for handling multipart/form-data for file uploads.                              |
| `nodemon`        | ^3.1.4    | A utility that monitors for file changes and automatically restarts the server.            |
| `react-toastify` | ^10.0.5   | Library for creating notifications in React (for handling API notifications).              |

---

## Frontend Dependencies

### Dependencies

| Dependency           | Version   | Description                                                                                 |
|-----------------------|-----------|---------------------------------------------------------------------------------------------|
| `@heroicons/react`   | ^2.1.5    | A library of SVG icons for React.                                                           |
| `@reduxjs/toolkit`   | ^2.1.0    | Official, opinionated, and powerful toolkit for Redux.                                      |
| `axios`              | ^1.6.7    | Promise-based HTTP client for making API requests.                                          |
| `firebase`           | ^10.13.0  | Firebase client SDK for accessing Firebase services.                                        |
| `html2canvas`        | ^1.4.1    | Library for converting HTML elements into a canvas.                                         |
| `jspdf`              | ^2.5.2    | A library to generate PDF documents in the browser.                                         |
| `react`              | ^18.2.0   | A JavaScript library for building user interfaces.                                          |
| `react-dom`          | ^18.2.0   | Provides DOM-specific methods for React.                                                   |
| `react-icons`        | ^5.0.1    | A library of popular icons as React components.                                            |
| `react-modal`        | ^3.16.1   | Accessible modal dialog component for React.                                               |
| `react-quill`        | ^2.0.0    | A React wrapper for the Quill rich-text editor.                                            |
| `react-redux`        | ^9.1.0    | Official React bindings for Redux.                                                         |
| `react-router-dom`   | ^6.22.0   | A declarative routing library for React.                                                   |
| `react-toastify`     | ^10.0.5   | A library for creating and displaying notifications in React.                              |

### DevDependencies

| Dependency                    | Version   | Description                                                                                 |
|-------------------------------|-----------|---------------------------------------------------------------------------------------------|
| `@types/react`               | ^18.2.43  | TypeScript type definitions for React.                                                     |
| `@types/react-dom`           | ^18.2.17  | TypeScript type definitions for React DOM.                                                 |
| `@vitejs/plugin-react`       | ^4.2.1    | Official Vite plugin for React.                                                            |
| `autoprefixer`               | ^10.4.17  | PostCSS plugin to parse CSS and add vendor prefixes.                                       |
| `eslint`                     | ^8.55.0   | A tool for identifying and fixing JavaScript code issues.                                  |
| `eslint-plugin-react`        | ^7.33.2   | ESLint plugin for React-specific linting rules.                                            |
| `eslint-plugin-react-hooks`  | ^4.6.0    | ESLint plugin for React hooks-specific linting rules.                                      |
| `eslint-plugin-react-refresh`| ^0.4.5    | ESLint plugin for React Fast Refresh.                                                      |
| `postcss`                    | ^8.4.33   | A tool to transform CSS with JavaScript plugins.                                           |
| `prettier`                   | ^3.2.5    | A code formatter for consistent style.                                                     |
| `prettier-plugin-tailwindcss`| ^0.5.11   | Prettier plugin for sorting Tailwind CSS classes.                                          |
| `tailwindcss`                | ^3.4.1    | A utility-first CSS framework for styling.                                                 |
| `vite`                       | ^5.0.8    | A fast development build tool for modern web projects.                                     |

---


### Run the project

cd Notes-Management-App

cd server
- npm install express multer axios dotenv bcrypt body-parser cloudinary cors dotenv firebase firebase-admin gridfs-stream jsonwebtoken mongodb mongoose multer nodemon
- nodemon index.js

cd client
- npm install @heroicons/react @reduxjs/toolkit axios firebase react react-dom react-icons react-redux react-router-dom react-toastify
- npm run dev


# Tools 
<p>
<img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="25px"/>
<img alt="Vite" src="https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite&logoColor=9D00FF" height="25px"/>
<img alt="Tailwidcss" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" height="25px"/>
<img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white"  height="25px"/>
<img alt="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" height="25px"/>
<img alt="npm" src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white" height="25px"/>
<img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" height="25px"/>
<img alt="github actions" src="https://img.shields.io/badge/-Github_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white" height="25px"/>
<img alt="Firebase" src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" height="25px"/>
<img alt="Mongodb" src="https://img.shields.io/badge/Mongodb-20232A?style=for-the-badge&logo=mongodb&logoColor=green" height="25px"/>
</p>



