import React, { useState, useRef, useEffect } from 'react';
import { Home, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
   const { user } = useAuth();


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/attendance-officer" className="flex items-center space-x-2 text-white">
          <Home className="h-6 w-6" />
          <span className="text-lg font-semibold">Home</span>
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-gray-700 rounded-full pl-1 pr-3 py-1 hover:bg-gray-600 transition"
          >
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <img src={user?.photoURL} className="h-9 w-9 text-white rounded-2xl "/>
            </div>
            <ChevronDown className={`h-5 w-5 text-white transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <Link
                to="/attendance-officer/account"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                My Account
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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