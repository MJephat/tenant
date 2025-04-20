// Hero.jsx
import React from "react";

const Home = () => {
  return (
    <section className="  relative h-screen w-full flex items-center justify-start bg-gradient-to-tr from-blue-100 to-white">
      {/* Background image on the right */}
      <div className="absolute right-0 top-0 h-full w-1/2">
        <img
          src="../../src/assets/hero.png" // Replace with actual image path
          alt="Luxury Villa"
          className="object-cover h-screen w-full"
        />
      </div>

      {/* Text content */}
      <div className="z-10 pl-16 max-w-xl">
        <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
          TENANT<br />
          MANAGEMENT<br/>
          FROM THE BAY
        </h1>
        <p className="text-blue-600 text-2xl font-semibold mt-6">Login to access your dashboard</p>
        <p className="text-gray-700 mt-4">
          Make your property management easy and efficient, metrics, data, visualizations aand report in here.
        </p>
        <button className="mt-6 px-6 py-2 border border-black text-black font-medium hover:bg-black hover:text-white transition">
          READ MORE
        </button>
      </div>
    </section>
  );
};

export default Home;
