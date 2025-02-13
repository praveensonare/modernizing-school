import React, { useState, useEffect } from 'react';
import Header from '../../components/Attendance-officer/Header';
import Footer from '../../components/Attendance-officer/Footer';
import { useAuth} from "../../store/useAuth"

import { Save } from 'lucide-react';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
};

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      name: user?.displayName||'',
      email:  user?.email || '',
      phone: '+1234567890'
    };
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-16">
      <Header />
      
      <main className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-lg">{profile.phone}</p>
              )}
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition mt-6"
              >
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}