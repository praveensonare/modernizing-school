import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ChevronDown, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Home 
              className="h-6 w-6 cursor-pointer" 
              onClick={() => navigate('/teacher')} 
            />
            <a 
              href="https://school-website.com" 
              className="text-xl font-semibold hover:text-gray-200"
            >
              Evergreen International School
            </a>
          </div>
          
          <div className="relative">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-white"
              />
              <ChevronDown className="h-4 w-4" />
            </div>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/teacher/myprofile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/teacher/inbox"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Inbox
                </Link>
                <Link
                  to="/teacher/meeting"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Meeting
                </Link>
                <Link
                  to="/teacher/myclass"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Class
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <a
            href="https://tap2share.co"
            className="text-sm hover:text-gray-200"
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