import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWA from './FloatingWA';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-navy font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
};

export default Layout;
