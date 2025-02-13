import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Save } from 'lucide-react';
import { useAuth } from './../../store/useAuth';

interface TeacherProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  schedule: {
    day: string;
    slots: string[];
  }[];
}

const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<TeacherProfile>({
    name: user?.name || "",
    email: user?.email || "",
    phone: '+1 (555) 123-4567',
    address: '123 Education Street, Teaching City, TC 12345',
    schedule: [
      {
        day: 'Monday',
        slots: ['9:00 AM - 10:30 AM', '11:00 AM - 12:30 PM']
      },
      {
        day: 'Tuesday',
        slots: ['9:00 AM - 10:30 AM', '2:00 PM - 3:30 PM']
      },
    ]
  });

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);


  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/teacher')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-6">
              <img
                src={user?.avatar}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          <div className="pt-20 px-6 pb-6">
            <div className="flex justify-end mb-6">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  ) : (
                    profile.name
                  )}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full p-2 border rounded-md mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="w-full p-2 border rounded-md mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  {isEditing ? (
                    <textarea
                      value={profile.address}
                      onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                      className="w-full p-2 border rounded-md mt-1"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.address}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Schedule at School
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {profile.schedule.map((day, index) => (
                    <div
                      key={index}
                      className="py-3 border-b last:border-0"
                    >
                      <h4 className="font-medium text-gray-900">{day.day}</h4>
                      <div className="mt-2 space-y-2">
                        {day.slots.map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className="text-sm text-gray-600"
                          >
                            {isEditing ? (
                              <input
                                type="text"
                                value={slot}
                                onChange={(e) => {
                                  const newSchedule = [...profile.schedule];
                                  newSchedule[index].slots[slotIndex] = e.target.value;
                                  setProfile({ ...profile, schedule: newSchedule });
                                }}
                                className="w-full p-2 border rounded-md"
                              />
                            ) : (
                              slot
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;