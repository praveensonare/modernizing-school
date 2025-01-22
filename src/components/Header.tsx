import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleHomeClick = () => {
    if (user) {
      navigate(`/${user.type}`);
    }
  };

  const getDropdownItems = () => {
    if (user?.type === 'school-bus') {
      return [
        { label: 'My Account', route: '/school-bus/my-account' },
        { label: 'Trip', route: '/school-bus/trip' },
        { label: 'Student', route: '/school-bus/student' },
        { label: 'History', route: '/school-bus/history' },
        { label: 'Log Out', action: handleLogout }
      ];
    }
    return [
      { label: 'My Account', route: '/profile' },
      { label: 'Log Out', action: handleLogout }
    ];
  };

  return (
    <header className="bg-gray-100 shadow-md px-4 py-2 flex justify-between items-center">
      <button onClick={handleHomeClick} className="text-gray-700 hover:text-gray-900">
        <Home size={24} />
      </button>
      
      <h1 className="text-xl font-semibold text-center flex-1">School Management System</h1>
      
      <div className="relative">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2"
        >
          <img
            src={user?.avatar || 'https://via.placeholder.com/40'}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <ChevronDown size={20} />
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            {getDropdownItems().map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.route) {
                    navigate(item.route);
                  } else if (item.action) {
                    item.action();
                  }
                  setShowDropdown(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};