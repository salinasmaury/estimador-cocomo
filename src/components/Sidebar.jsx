import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <nav className="flex justify-center items-center py-4 px-8">
    <div className="flex gap-6 items-center">
      <div className="flex items-center gap-2 text-gray-300 mr-8">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="font-medium">Modelos COCOMO:</span>
      </div>
      
      <Link
        to="/basico"
        className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <span className="text-white font-medium group-hover:text-blue-100">
          COCOMO Básico
        </span>
        <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      <Link
        to="/intermedio"
        className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <span className="text-white font-medium group-hover:text-purple-100">
          COCOMO Intermedio
        </span>
        <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </div>
  </nav>
);

export default Sidebar;
