import React from 'react';
import {
  FaTachometerAlt,
  FaChartBar,
  FaTable,
  FaCheckSquare,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFileAlt,
  FaDesktop,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Charts', icon: <FaChartBar />, path: '/charts' },
    { name: 'Tables', icon: <FaTable />, path: '/tables' },
    // { name: 'Forms', icon: <FaCheckSquare />, path: '/register' },
    { name: 'Maps', icon: <FaMapMarkerAlt />, path: '/maps' },
    { name: 'Invoice', icon: <FaFileAlt />, path: '/invoice' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:block`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8 px-2">
          <div className="bg-black text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
            T.A
          </div>
          <span className="text-xl font-semibold">
            TENANT <span className="text-gray-500">ADMIN</span>
          </span>
        </div>

        {/* Menu Items */}
        <nav className="space-y-4">
          {menu.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center space-x-3 text-gray-700 px-2 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? 'text-blue-600 font-semibold bg-gray-100'
                  : 'hover:bg-gray-100'
              }`}
              onClick={toggleSidebar}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
