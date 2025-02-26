import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { links } from './menu';

function Navbar() {
  const location = useLocation();
  const [label, setLabel] = useState("");

  useEffect(() => {
    const currentLink = links.find((el) => el.to === location.pathname);
    if (currentLink) {
      setLabel(currentLink.label);
    } else {
      setLabel("");
    }
  }, [location.pathname]); // Now the effect runs whenever the route changes

  return (
    <nav className="bg-white text-primary border-b border-inactive-yellow font-semibold text-lg p-4 flex justify-start items-center">
        <span>
           {label}
          </span>
    </nav>
  );
}

export default Navbar;
