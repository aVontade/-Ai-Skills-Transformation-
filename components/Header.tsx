
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-bg-secondary shadow-md p-4 sm:p-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary">AI Transformation Command Center</h1>
        <p className="text-sm sm:text-base text-text-secondary">Navigating the Future of Work</p>
      </div>
      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline text-text-secondary">Welcome, CEO</span>
        <img
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-brand-blue"
          src="https://picsum.photos/id/433/200/200"
          alt="CEO"
        />
      </div>
    </header>
  );
};

export default Header;