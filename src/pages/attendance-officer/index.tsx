import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Phone, Radio } from 'lucide-react';
import Header from '../../components/Attendance-officer/Header';
import Footer from '../../components/Attendance-officer/Footer';

type AttendanceStatus = 'check-in' | 'check-out' | null;

export default function AttendanceOfficerHome() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AttendanceStatus>(() => {
    const saved = localStorage.getItem('attendanceStatus');
    return saved ? (saved as AttendanceStatus) : null;
  });

  useEffect(() => {
    if (status) {
      localStorage.setItem('attendanceStatus', status);
    } else {
      localStorage.removeItem('attendanceStatus');
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-16">
      <Header />
      
      <main className="max-w-md mx-auto p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Set Status</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                checked={status === 'check-in'}
                onChange={() => setStatus('check-in')}
                className="h-4 w-4 text-blue-600"
              />
              <span>Check In</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                checked={status === 'check-out'}
                onChange={() => setStatus('check-out')}
                className="h-4 w-4 text-blue-600"
              />
              <span>Check Out</span>
            </label>
          </div>
        </div>

        {status && (
          <div className="space-y-4">
            <button
              onClick={() => navigate('/attendance-officer/gps-attnd')}
              className="w-full bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-gray-50 transition"
            >
              <MapPin className="h-6 w-6 text-blue-600" />
              <span className="font-medium">GPS Attendance</span>
            </button>

            <button
              onClick={() => navigate('/attendance-officer/search')}
              className="w-full bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-gray-50 transition"
            >
              <Search className="h-6 w-6 text-blue-600" />
              <span className="font-medium">Student Search</span>
            </button>

            <button
              onClick={() => navigate('/attendance-officer/contacts')}
              className="w-full bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-gray-50 transition"
            >
              <Phone className="h-6 w-6 text-blue-600" />
              <span className="font-medium">Contacts</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}