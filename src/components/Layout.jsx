import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white ">
      <header className="w-full py-6 px-8 bg-gradient-to-r from-blue-900 to-purple-900 shadow-2xl border-b border-gray-700">
        <h1 className="text-center text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
          Estimador COCOMO
        </h1>
        <p className="text-center text-sm text-gray-300 mt-2 font-light">
          Herramienta de estimación de esfuerzo de software
        </p>
      </header>

      {/* 2. flex-grow para ocupar todo el espacio vertical restante */}
      <div className="flex flex-row flex-grow">
        {/* h-full asegura que el fondo del sidebar cubra toda la altura disponible */}
        <aside className="w-72 h-full bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-600 shadow-xl flex flex-col justify-start items-center py-10 px-4 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* 3. Se ajusta el padding del main a p-8 */}
        <main className="flex-1 flex justify-center items-start overflow-y-auto p-8 bg-gray-50/5">
          {/* 4. Se elimina max-w-6xl para que ocupe el 100% del ancho del main.
             5. Se elimina my-4 para quitar los bordes blancos verticales. */}
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
