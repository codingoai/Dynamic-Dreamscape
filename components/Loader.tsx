
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
      <p className="mt-6 text-lg text-slate-300 font-medium transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default Loader;
