import React from "react";
// import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Header from '../components/Header';
import Dashboard from "../components/Dashboard";
const Home = () => {    
  return (    
    <div className="h-screen pt-20">
    <Header></Header>
      {/* <Hero /> */}
      <Dashboard/>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
