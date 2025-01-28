import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-4 py-3 mt-auto">
      <div className="container mx-auto text-center">
        <a 
          href="https://tap2share.co" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-colors"
        >
          © {new Date().getFullYear()} tap2share.co
        </a>
      </div>
    </footer>
  );
}