import React from 'react';
import Header from '../Header';

const MainLayout = ({ children }) => {
  return (
    <div className="max-w-screen-xl mx-auto my-0">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
