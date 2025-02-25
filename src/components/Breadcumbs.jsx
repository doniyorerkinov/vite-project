// Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="p-4 text-sm" aria-label="breadcrumb">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={routeTo} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{name}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:text-blue-700">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
