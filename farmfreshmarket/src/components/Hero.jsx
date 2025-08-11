import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/pic.png"; // your local file

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-[700px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh From the Farm</h1>
        <p className="text-lg mb-6">
          Connecting you directly to trusted local farmers. Eat fresh, live healthy.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/products">
            <button className="bg-white text-green-700 font-semibold px-12 py-4 rounded hover:bg-gray-100 transition">
              Shop Now
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-600 text-white font-semibold px-12 py-4 rounded hover:bg-green-700 transition">
              Sell with Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
