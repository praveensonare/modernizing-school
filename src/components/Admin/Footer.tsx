import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 shadow-md px-4 py-3 mt-auto">
      <div className="text-center">
        <a 
          href="https://tap2share.co" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          tap2share.co
        </a>
      </div>
    </footer>
  );
};