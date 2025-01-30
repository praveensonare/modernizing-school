import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white px-4 py-3 fixed bottom-0 w-full">
      <div className="text-center">
        <a 
          href="https://tap2share.co" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm hover:underline"
        >
          Powered by tap2share.co
        </a>
      </div>
    </footer>
  );
}