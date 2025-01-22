import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Phone } from 'lucide-react';

interface AttendanceStatus {
  type: 'check-in' | 'check-out' | null;
}

export const AttendanceOfficerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AttendanceStatus['type']>(() => {
    const saved = localStorage.getItem('attendanceStatus');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('attendanceStatus', JSON.stringify(status));
  }, [status]);

  return (
    <div className="flex-1 flex flex-col p-4">
      <h1 className="text-xl font-bold text-center mb-6">St. Mary's School</h1>
      
      {/* Status Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Set Status</h2>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="check-in"
              checked={status === 'check-in'}
              onChange={(e) => setStatus(e.target.value as AttendanceStatus['type'])}
              className="mr-2"
            />
            Check In
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="check-out"
              checked={status === 'check-out'}
              onChange={(e) => setStatus(e.target.value as AttendanceStatus['type'])}
              className="mr-2"
            />
            Check Out
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => navigate('/attendance-officer/gps-attnd')}
          disabled={!status}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
            status
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <MapPin size={24} />
          <span>GPS Attendance</span>
        </button>

        <button
          onClick={() => navigate('/attendance-officer/search')}
          disabled={!status}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
            status
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Search size={24} />
          <span>Student Search</span>
        </button>

        <button
          onClick={() => navigate('/attendance-officer/contacts')}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          <Phone size={24} />
          <span>Contacts</span>
        </button>
      </div>
    </div>
  );
};