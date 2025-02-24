import React from 'react';
import { Link } from 'react-router'; // Use react-router-dom

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-slate-200 text-[#2A3663] p-4">
      <h2 className="text-2xl font-bold mb-4">My App</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="text-[#2A3663] font-medium block">
            Todos
          </Link>
        </li>
        {/* Add more links for other APIs/pages here */}
        <li className="mb-2">
          <Link to="/another" className="text-[#2A3663] font-medium block">
            Another API
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
