import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f3f0]">
      {/* Always show the Navbar */}
      <header >
        <Navbar />
      </header>

      <div className="flex flex-1">
        {/* Always show the Sidebar */}
        <aside className="w-64  ">
          <Sidebar />
        </aside>

        {/* Main content area */}
        <main className="flex-1  p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;