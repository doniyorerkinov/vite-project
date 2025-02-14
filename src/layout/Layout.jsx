import React, { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Settings } from 'lucide-react';

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

        <main
          className={`flex-1 relative p-4 ${layout === 'sidebar' ? 'ml-64' : ''}`}
        >
          <div className="flex justify-end absolute bottom-4 right-4">
            <button
              onClick={toggleLayout}
              className="bg-blue-500 hover:bg-blue-600 text-white size-12 flex justify-center items-center rounded-full shadow-sm"
            >
              <Settings />
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
