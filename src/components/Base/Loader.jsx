import React from 'react';
import './CSS/Loader.css'; // Import the CSS file for styling

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="three-body">
        <div className="three-body__dot" />
        <div className="three-body__dot" />
        <div className="three-body__dot" />
      </div>
    </div>
  );
};

export default Loader;
