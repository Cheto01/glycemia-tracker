import React from 'react';

const Card = ({ className = "", children, ...props }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Card };