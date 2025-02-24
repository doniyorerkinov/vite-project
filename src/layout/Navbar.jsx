import React from 'react';
import { Link } from 'react-router';

function Navbar() {
  return (
    <nav className="bg-white text-[#2A3663]  pl-64 p-4 flex justify-center items-center">
      <div className="container">
        <Link to="/" className="text-xl font-bold">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
