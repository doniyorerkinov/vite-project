import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({ children }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="p-4 text-sm flex justify-between items-center bg-white" aria-label="breadcrumb">
      <ol className="list-reset flex flex-row items-center">
        <li>
          <Link to="/" className="text-inactive-yellow hover:text-inactive-yellow/90">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={routeTo} className="flex items-center capitalize">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{name}</span>
              ) : (
                <Link to={routeTo} className="text-inactive-yellow hover:text-inactive-yellow/90">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
        {/* Render custom content passed from the parent */}
        {children && <li className="flex items-center ml-2">{children}</li>}
    </nav>
  );
};

export default Breadcrumbs;