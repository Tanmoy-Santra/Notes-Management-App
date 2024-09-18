import React from "react";
import UploadNote from "../components/UploadNote";
import Header from '../components/Header'
import Footer from "../components/Footer";
const Upload = () => {
  return (
    <>
    <Header></Header>
    <div className="h-screen flex items-center justify-center bg-primarybg text-textcolor">    
      <UploadNote />
    </div>
    <Footer></Footer>
    </>
  );
};

export default Upload;
