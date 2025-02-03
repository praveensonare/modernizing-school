import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../store/useAuth';

export function AdminHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {

    
    localStorage.clear();

    window.location.href = '/login';
  };

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="text-blue-400 hover:text-blue-300">
          <Home size={24} />
        </Link>
        <Link
          to="https://school-website.com"
          className="text-lg font-semibold text-gray-100 hover:text-blue-300"
        >
          International School
        </Link>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2"
        >
          <img
            src={user?.avatar || 'https://via.placeholder.com/40'}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <ChevronDown size={16} className="text-gray-300" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <Link
              to="/admin/myprofile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}