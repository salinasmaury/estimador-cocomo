import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => (
  <nav className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
    <Link to="/basico" className="hover:underline text-lg">COCOMO Básico</Link>
    <Link to="/intermedio" className="hover:underline text-lg">COCOMO Intermedio</Link>
  </nav>
);

export default Sidebar;
