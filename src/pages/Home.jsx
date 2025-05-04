import React from "react";
import About from "./About";
import Hero from "../components/Hero";
import PopularFoods from "../components/PopularFoods";
import Item from "../components/Item";
import Services from "../components/Services";
import Contact from "./Contact";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <Hero/>
        {/* services */}
        <Services/>
      {/* popular */}
      
      <div id="menu" className="p-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-black mt-12 mb-20">
        Popular <span className="text-orange-400">Foods</span>
      </h1>
      </div>
      <marquee>
      <PopularFoods/>
      </marquee>
    
      {/* about */}
     <About/>  
      {/* gallery */}
      <Item/>
      {/* contact */}
      <Contact/>
      </>
  );
};

export default Home;
