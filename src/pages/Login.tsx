import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, School, Bus, UserCheck, User,
  Mail, LogIn
} from 'lucide-react';
import { useAuthStore } from '../store/auth';
import type { UserType } from '../types';

const userTypeData = {
  admin: {
    title: 'Administrator',
    description: 'School administration and management',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    icon: Users
  },
  teacher: {
    title: 'Teacher',
    description: 'Classroom management and student progress',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    icon: School
  },
  'attendance-officer': {
    title: 'Attendance Officer',
    description: 'Student attendance tracking and management',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    icon: UserCheck
  },
  parent: {
    title: 'Parent',
    description: 'Track your child\'s progress and activities',
    image: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=800',
    icon: User
  },
  'school-bus': {
    title: 'School Bus',
    description: 'Transportation tracking and management',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=800',
    icon: Bus
  }
};

export const Login: React.FC = () => {
  const [selectedType, setSelectedType] = useState<UserType>('parent');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = (type: string) => {
    // Simulate login
    const user = {
      id: '1',
      name: 'John Doe',
      email: email,
      type: type as UserType,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800'
    };
    setUser(user);
    navigate(`/${type}`);
  };

  const isDesktop = window.innerWidth >= 768;
  const userTypes = isDesktop 
    ? ['parent', 'admin', 'teacher']
    : ['parent', 'teacher', 'attendance-officer', 'school-bus'];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row border-2 border-gray-200">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={userTypeData[selectedType].image}
            alt={userTypeData[selectedType].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center p-6">
              <h2 className="text-2xl font-bold mb-2">{userTypeData[selectedType].title}</h2>
              <p>{userTypeData[selectedType].description}</p>
            </div>
          </div>
        </div>

        {/* Right side - Login */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          
          <div className="space-y-4">
            {userTypes.map((type) => {
              const TypeIcon = userTypeData[type as UserType].icon;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type as UserType)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    selectedType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <TypeIcon size={20} />
                  <span className="capitalize">{userTypeData[type as UserType].title}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => handleLogin(selectedType)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <LogIn size={20} />
                <span>Get Login Link</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={() => handleLogin(selectedType)}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};