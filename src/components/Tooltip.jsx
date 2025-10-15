import { useState } from "react";

export default function Tooltip({ children, texto }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {hover && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg z-20">
          {texto}
        </div>
      )}
    </div>
  );
}
