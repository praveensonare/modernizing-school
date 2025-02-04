import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ChevronDown, LogOut, User, Bus, History, Inbox, UserPlus } from 'lucide-react';

interface Child {
  id: string;
  name: string;
}

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [children] = useState<Child[]>([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' }
  ]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <Link to="/parent" className="hover:text-gray-300">
          <Home size={24} />
        </Link>
        
        <select 
          className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedChild(children.find(c => c.id === e.target.value) || null)}
          value={selectedChild?.id || ''}
        >
          <option value="">Select Child</option>
          {children.map(child => (
            <option key={child.id} value={child.id}>{child.name}</option>
          ))}
        </select>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <ChevronDown size={16} />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button onClick={() => handleMenuItemClick('/parent/profile')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
              <User size={16} className="mr-2" /> Profile
            </button>
            <button onClick={() => handleMenuItemClick('/parent/transport')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Bus size={16} className="mr-2" /> Transport
            </button>
            <button onClick={() => handleMenuItemClick('/parent/history')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
              <History size={16} className="mr-2" /> History
            </button>
            <button onClick={() => handleMenuItemClick('/parent/inbox')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Inbox size={16} className="mr-2" /> Inbox
            </button>
            <button onClick={() => handleMenuItemClick('/parent/link-child')} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
              <UserPlus size={16} className="mr-2" /> Link Child
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" /> Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}