import React from 'react';
import { Link } from 'react-router';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-center items-center">
      <div className="container">
        <Link to="/" className="text-xl font-bold">
          My App
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
