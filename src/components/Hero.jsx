import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative w-full">
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[550px] overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://yummi-theme.myshopify.com/cdn/shop/files/bg-2.jpg?v=1614334584&width=1920"
          alt="Background"
        />

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-center text-white bg-black bg-opacity-50 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold pb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              Where Every Bite Feels Like Home
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <Link
                to="/menu"
                className="btn text-white bg-orange-500 px-6 py-3 rounded-xl hover:text-orange-500 hover:border-2 border-orange-500 hover:bg-white transition-all duration-300"
              >
                EXPLORE OUR MENU
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default Hero;
