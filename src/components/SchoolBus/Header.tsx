import React, { useState, useRef, useEffect } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { Link} from 'react-router-dom';






export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { title: 'My Account', path: '/school-bus/my-account' },
    { title: 'Trip', path: '/school-bus/trip' },
    { title: 'Student', path: '/school-bus/student' },
    { title: 'History', path: '/school-bus/history' },
  ];

  
    const handleLogout = () => {
      
      localStorage.clear();
      window.location.href = '/login';
    };
  


  return (
    <header className="bg-black text-white px-4 py-3 fixed top-0 w-full z-50">
      <div className="flex items-center justify-between">
        <Link to="/school-bus" className="flex items-center space-x-2">
          <Home className="w-6 h-6" />
          <span className="font-semibold text-lg">School Bus</span>
        </Link>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 hover:bg-gray-800 rounded-full"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}