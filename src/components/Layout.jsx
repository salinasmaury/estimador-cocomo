import React from 'react';
import Sidebar from './Sidebar';


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="w-full py-4 bg-gray-800 shadow-md mb-0">
        <h1 className="text-center text-3xl font-bold tracking-wide">Estimador COCOMO</h1>
      </header>
      <div className="flex flex-row h-[calc(100vh-4.5rem)]">
        <aside className="w-64 h-full bg-gray-800 border-r border-gray-700 flex flex-col justify-start items-center py-8">
          <Sidebar />
        </aside>
        <main className="flex-1 flex justify-center items-start overflow-y-auto p-8">
          <div className="w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
