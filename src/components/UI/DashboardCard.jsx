import React from 'react';
import { Link } from 'react-router-dom';

function DashboardCard({ url, icon, title }) {
  return (
    <Link
      to={url}
      className="flex flex-col items-center justify-center w-full min-w-[200px] min-h-[300px] border border-blue-800 rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* Icon */}
      <div className="text-blue-800 mb-4">{icon}</div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-center text-gray-800">
        {title}
      </h3>
    </Link>
  );
}

export default DashboardCard;
