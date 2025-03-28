import React from 'react';
import { NavLink } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { links } from './menu';

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-slate-200 text-primary p-4 ">
      <div className="size-20 flex justify-center items-center mx-auto rounded-full shadow-lg bg-sky-100">
        <Truck size={40} className="mx-auto" />
      </div>
      <div className="flex flex-col gap-3 mt-8">
        {links.map(({ to, label, Icon, hasRightIcon, RightIcon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex justify-start items-center gap-4 font-medium text-primary px-4 py-3 rounded-md ${
                isActive ? 'bg-primary-bg' : ''
              }`
            }
          >
            {({ isActive }) => (
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2">
                  <Icon
                    size={20}
                    className={`mb-1 ${isActive ? 'text-primary' : 'text-inactive'}`}
                  />
                  {label}
                </div>
                {hasRightIcon ? (
                  <RightIcon
                    size={20}
                    className={`mb-1 ${isActive ? 'text-primary' : 'text-inactive'}`}
                  />
                ) : null}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
