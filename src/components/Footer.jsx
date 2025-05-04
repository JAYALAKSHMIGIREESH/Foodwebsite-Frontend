import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import logo from '../assets/logo2.png';

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logo click and navigate to the home page
  const handleLogoClick = () => {
    navigate('/'); // This navigates to the home page
  };

  return (
    <footer className="bg-white shadow-2xl w-full">
      <div className="container mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Logo and Info */}
        <div className="flex flex-col items-center">
          {/* Logo with clickable div to navigate */}
          <div
            onClick={handleLogoClick} // Add the click handler to navigate to home
            className="flex items-center cursor-pointer"
          >
            <img src={logo} alt="Grill & Chill Logo" className="w-11 mr-2" />
            <h1 className="font-bold text-2xl hidden sm:block">
              Chill <span className="text-orange-400">Grill</span>
            </h1>
          </div>

          <div className="mt-4 text-gray-600">
            <p>Designed with by Jayalaksmi M G</p>
            <p className="mt-2">Code licensed, docs CC By 4.0.</p>
            <p className="mt-2">Currently v5.3.2.</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className="border-gray-300 my-4" />
      <p className="text-center text-gray-600 py-4 text-sm">
        &copy; Sep 2024 Batch, Food ordering. Built with React.
      </p>
    </footer>
  );
};

export default Footer;
