import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 shadow-md fixed bottom-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-center">
        <a
          href="https://tap2share.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-300 font-medium transition"
        >
          tap2share.co
        </a>
      </div>
    </footer>
  );
}