import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Breadcrumbs from '../components/Breadcumbs';

const Layout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="min-h-screen flex flex-col bg-primary-bg relative">
      {/* Always show the Navbar */}
      <header className="sticky top-0 z-30 pl-64">
        <Navbar />
        {/* {pathnames.length > 0 && <Breadcrumbs />} */}
      </header>

      <div className="flex flex-1">
        {/* Always show the Sidebar */}
        <aside className="w-64">
          <Sidebar />
        </aside>
        {/* Main content area */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
