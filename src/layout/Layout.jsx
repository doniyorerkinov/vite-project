import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Breadcrumbs from '../components/Breadcumbs';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="min-h-screen flex flex-col bg-primary_bg relative">
      {/* Always show the Navbar */}
      <header className="sticky top-0 z-30 pl-64">
        {/* Passing props to Navbar */}
        <Navbar />
        {pathnames.length > 0 ? <Breadcrumbs /> : null}
      </header>

      <div className="flex flex-1">
        {/* Always show the Sidebar */}
        <aside className="w-64">
          <Sidebar />
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
