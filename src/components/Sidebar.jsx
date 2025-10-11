import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => (
  <nav className="flex flex-col gap-6 w-full">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-200 mb-4 text-center border-b border-gray-600 pb-3">
        Modelos COCOMO
      </h2>
    </div>
    <Link 
      to="/basico" 
      className="group relative px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center justify-center">
        <span className="text-white font-medium text-lg group-hover:text-blue-100">
          COCOMO Básico
        </span>
      </div>
      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
    
    <Link 
      to="/intermedio" 
      className="group relative px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center justify-center">
        <span className="text-white font-medium text-lg group-hover:text-purple-100">
          COCOMO Intermedio
        </span>
      </div>
      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
    
    <div className="mt-8 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Selecciona el modelo de estimación que deseas utilizar para tu proyecto de software
      </p>
    </div>
  </nav>
);

export default Sidebar;
