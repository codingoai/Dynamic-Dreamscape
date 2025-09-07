
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
        Dynamic Dreamscape
      </h1>
      <p className="text-slate-400 mt-2 text-lg">Your story, your face, your world.</p>
    </header>
  );
};

export default Header;
