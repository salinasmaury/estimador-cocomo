import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="w-full py-6 px-8 bg-gradient-to-r from-blue-900 to-purple-900 shadow-2xl border-b border-gray-700">
        <h1 className="text-center text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
          Estimador COCOMO
        </h1>
        <p className="text-center text-sm text-gray-300 mt-2 font-light">
          Herramienta de estimación de esfuerzo de software
        </p>
      </header>

      {/* Navegación horizontal */}
      <nav className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600 shadow-lg">
        <Sidebar />
      </nav>

      {/* Contenido principal sin sidebar */}
      <main className="flex-1 flex justify-center items-start overflow-y-auto p-8 bg-gray-50/5">
        <div className="w-full max-w-7xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
