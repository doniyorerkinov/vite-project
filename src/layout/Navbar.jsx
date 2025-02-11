import React from "react";
import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">My App</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">
          Todos
        </Link>
        {/* Add more links for other APIs/pages here */}
        <Link to="/another" className="hover:text-gray-300">
          Another API
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
