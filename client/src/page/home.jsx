// Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="  relative h-screen w-full flex items-center justify-start bg-gradient-to-tr from-blue-100 to-white">
      {/* Background image on the right */}
      <div className="absolute right-0 top-0 h-full w-1/2">
       <img
         src="client/src/assets/hero.png"
         alt="Luxury Villa"
          className="object-cover h-screen w-full"
        /> *
      </div>

      {/* Text content */}
      <div className="z-10 pl-16 max-w-xl">
        <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
          TENANT<br />
          MANAGEMENT<br/>
          FROM THE BAY
        </h1>
        <p className="text-blue-400 text-2xl font-semibold mt-6"><i>Login to ADMIN access your dashboard</i></p>
        <p className="text-gray-700 mt-4">
          Make your property management easy and efficient, metrics, data, visualizations and report in here.
        </p>
        <Link to="/login" className="inline-block px-5 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-100">
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default Home;
