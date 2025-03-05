import React from 'react';

const Label = ({ className = "", ...props }) => {
  return (
    <label 
      className={`text-sm font-medium leading-none ${className}`} 
      {...props} 
    />
  );
};

export { Label };