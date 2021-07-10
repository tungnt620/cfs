import React from 'react';
import ScrollToTopBtn from '../ScrollToTopBtn';
import Header from '../Header';

const MainLayout = ({ children }) => {
  return (
    <div className="max-w-screen-xl mx-auto my-0">
      <Header />
      {children}
      <ScrollToTopBtn />
    </div>
  );
};

export default MainLayout;
