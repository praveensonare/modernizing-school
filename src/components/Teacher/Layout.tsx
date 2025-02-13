import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../store/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    setShowProfileDropdown(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-800 text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Home 
              className="h-6 w-6 cursor-pointer hover:text-blue-400 transition-colors" 
              onClick={() => navigate('/teacher')} 
            />
            <a 
              href="https://school-website.com" 
              className="text-xl font-semibold hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Evergreen International School
            </a>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <img
                src={user?.photoURL}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-white hover:border-blue-400 transition-colors"
              />
              <ChevronDown className="h-4 w-4" />
            </div>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 transform transition-all">
                <button
                  onClick={() => handleNavigation('/teacher/myprofile')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  My Profile
                </button>
                <button
                  onClick={() => handleNavigation('/teacher/inbox')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  Inbox
                </button>
                <button
                  onClick={() => handleNavigation('/teacher/meeting')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  Meeting
                </button>
                <button
                  onClick={() => handleNavigation('/teacher/myclass')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                >
                  My Class
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-800 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <a
            href="https://tap2share.co"
            className="text-sm hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2024 tap2share.co
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;