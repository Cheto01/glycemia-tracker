import React from 'react';

const Input = ({ className = "", ...props }) => {
  return (
    <input 
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ${className}`} 
      {...props} 
    />
  );
};

export { Input };