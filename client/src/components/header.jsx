import { LogOut } from 'lucide-react';
import React, { useState } from 'react';
import {  FaBars, FaUserAltSlash } from 'react-icons/fa';
import { useAuth } from '../assets/authContext.jsx';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../assets/axios.jsx';
import TenantDashboard from './tenantdashboard.jsx';

const Header = ({ toggleSidebar }) => {

  const [search, setSearch ] = useState("");
  const [tenant, setTenenant] = useState(null);
  const [error, setError] = useState("");

  const hansleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      setError("Please enter a search term");
      return;
    }
    try {
      const response = await axiosInstance(`/payment/getHistoryByName?name=${search}`);
      setTenenant(response.data.payments[0]);
      if (!response.data.payments.length) {
        setError("No tenant found with that name");
        return;
      }
      setError("");
    } catch (err) {
      setError(err.message);
      setTenenant(null);
    }
  }

const {admin, logout} = useAuth();



  return (
    <>
    <header className="bg-white shadow px-4 md:px-6 py-3 flex justify-between items-center">
      <div onClick={hansleSearch} className="flex items-center gap-4 w-full md:max-w-xl">
        <button onClick={toggleSidebar} className="text-gray-700 text-2xl md:hidden">
          <FaBars />
        </button>

        <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && hansleSearch(e)}
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
        <Link to="/"
        className="btn btn-primary"
        >
        <FaUserAltSlash size={20} />
        </Link>
        </>)
        }
      

     
      </div>
    </header>
    {error && <div className="text-red-500 text-sm">{error}</div>}
      {tenant && <TenantDashboard data={tenant} />}
    </>
  );
};

export default Header;
