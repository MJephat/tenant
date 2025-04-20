import { LogOut } from 'lucide-react';
import React from 'react';
import {  FaBars } from 'react-icons/fa';
import { useAuth } from '../assets/authContext.jsx';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {

const {admin, logout} = useAuth();



  return (
    <header className="bg-white shadow px-4 md:px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4 w-full md:max-w-xl">
        <button onClick={toggleSidebar} className="text-gray-700 text-2xl md:hidden">
          <FaBars />
        </button>

        <input type="text" placeholder="Search here"
          className="w-full p-2 rounded-l-md border text-gray-700 border-gray-300"
        />
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-4 sm:gap-6 ml-auto">
        {admin ? (
          <>
            <button className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800' 
        onClick={() => logout()}
        >
          <LogOut size={20} />
          <span className='hidden md:inline'>Logout</span>
        </button>
          </>
        ):(<>
        <Link to="/login" className="btn btn-primary">
        Login
        </Link>
        </>)
        }
      

     
      </div>
    </header>
  );
};

export default Header;
