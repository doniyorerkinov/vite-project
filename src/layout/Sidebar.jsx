import React from 'react';
import { Link } from 'react-router'; // Use react-router-dom

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-blue-950 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">My App</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="hover:text-gray-300 block">
            Todos
          </Link>
        </li>
        {/* Add more links for other APIs/pages here */}
        <li className="mb-2">
          <Link to="/another" className="hover:text-gray-300 block">
            Another API
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
