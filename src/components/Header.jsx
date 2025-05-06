import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import { BiUser } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { DotLoader } from "react-spinners";
import { foodContext } from "../contexts/foodContext";
import { toast } from "react-toastify"; 

const Header = () => {
  const [loading, setLoading] = useState(false);
  const { getCartCount, token, setToken } = useContext(foodContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout Successfully "); 
    navigate("/login");
  };

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1000);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header className="py-3 w-full top-0 left-0 right-0 z-50 bg-white shadow-md">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
          <DotLoader color="#f97316" size={60} />
        </div>
      )}

      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-11 mr-2" />
          <h1 className="font-bold text-2xl hidden sm:block">
            Chill <span className="text-orange-400">Grill</span>
          </h1>
        </Link>


        <div className="flex items-center space-x-4">
          <button onClick={() => handleNavigation("/cart")} className="relative">
            <FiShoppingCart className="text-2xl text-gray-700 hover:text-orange-400 transition-colors" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-orange-500 text-white px-1 rounded-full">
                {getCartCount()}
              </span>
            )}
          </button>

          {!token ? (
            <button onClick={() => navigate("/login")}>
              <BiUser className="text-2xl text-gray-700 hover:text-orange-400 transition-colors" />
            </button>
          ) : (
            <div className="relative inline-block text-left">
              <div onClick={toggleDropdown} className="flex items-center space-x-2 cursor-pointer">
                <BiUser className="text-2xl text-gray-700 hover:text-orange-400 transition-colors" />
              </div>

              {dropdownOpen && (
                <div className="absolute -right-0 top-10 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <Link to="/order" onClick={() => setDropdownOpen(false)}>
                    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Orders
                    </p>
                  </Link>
                  <p
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            className="md:hidden text-3xl text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
