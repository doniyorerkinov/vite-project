import React from 'react';
import { NavLink } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { links } from './menu';

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-slate-200 text-primary p-4 z-40">
      <div className="size-20 flex justify-center items-center mx-auto rounded-full shadow-lg bg-sky-100">
        <Truck size={40} className="mx-auto" />
      </div>
      <div className="flex flex-col gap-3 mt-8">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex justify-start gap-4 font-medium text-primary px-4 py-3 rounded-md ${
                isActive ? 'bg-primary-bg' : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={isActive ? 'text-primary' : 'text-inactive'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
