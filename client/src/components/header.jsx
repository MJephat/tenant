import React from 'react';
import { FaSearch, FaBell, FaEnvelope, FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow px-4 md:px-6 py-3 flex justify-between items-center">
      {/* Left: Mobile Menu + Search */}
      <div className="flex items-center gap-4 w-full md:max-w-xl">
        {/* Hamburger Icon */}
        <button
          onClick={toggleSidebar}
          className="text-gray-700 text-2xl md:hidden"
        >
          <FaBars />
        </button>

        <input
          type="text"
          placeholder="Search here"
          className="w-full p-2 rounded-l-md border text-gray-700 border-gray-300"
        />
       
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-4 sm:gap-6 ml-auto">
        <div className="relative">
          <FaEnvelope className="text-gray-600 text-xl" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">1</span>
        </div>

        <div className="relative">
          <FaBell className="text-gray-600 text-xl" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>

     
      </div>
    </header>
  );
};

export default Header;
