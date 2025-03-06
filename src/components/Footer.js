// src/components/Footer.js
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 mt-8 text-center text-sm text-gray-600">
      <p>© {currentYear} Suivi de Glycémie. Tous droits réservés.</p>
      <p className="mt-1">Créé par Che</p>
    </footer>
  );
};

export default Footer;