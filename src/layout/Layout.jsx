import React, { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const { layout, toggleLayout } = useContext(SettingsContext);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show navbar if layout is set to "navbar" */}
      {layout === 'navbar' && (
        <header>
          <Navbar />
        </header>
      )}

      <div className="flex flex-1 justify-between">
        {/* Show sidebar if layout is set to "sidebar" */}
        {layout === 'sidebar' && (
          <aside>
            <Sidebar />
          </aside>
        )}

        <main className={`flex-1 relative p-4 ${layout === 'sidebar' ? 'ml-64' : ''}`}>
          <div className="flex justify-end absolute right-0">
            <button
              onClick={toggleLayout}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
            >
              Switch Layout
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
