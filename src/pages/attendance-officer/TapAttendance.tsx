import React from 'react';
import Header from '../../components/Attendance-officer/Header';
import Footer from '../../components/Attendance-officer/Footer';
import { Check, Phone, MessageSquare } from 'lucide-react';

// Mock student data - replace with actual data from your backend
const student = {
  id: 'STU123456',
  name: 'John Doe',
  class: '10A',
  photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=200&h=200&fit=crop',
  school: 'Global International School',
  parent: {
    name: 'Robert Doe',
    mobile: '+1234567890',
    whatsapp: '+1234567890'
  }
};

export default function TapAttendance() {
  const status = localStorage.getItem('attendanceStatus');

  const handleAttendance = () => {
    // Implement attendance update logic
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-16">
      <Header />
      
      <main className="max-w-md mx-auto p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={student.photo}
                alt={student.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-600"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                ID: {student.id}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
              <p className="text-lg text-gray-600">Class: {student.class}</p>
              <p className="text-gray-500">{student.school}</p>
            </div>

            <div className="border-t border-b py-4 space-y-3">
              <h2 className="font-semibold text-gray-700">Parent Contact</h2>
              <p className="text-gray-600">{student.parent.name}</p>
              
              <div className="flex justify-center space-x-4">
                <a
                  href={`tel:${student.parent.mobile}`}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call</span>
                </a>
                
                <a
                  href={`https://wa.me/${student.parent.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <button
              onClick={handleAttendance}
              className="w-full bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center space-x-2 text-lg hover:bg-blue-700 transition"
            >
              <Check className="h-6 w-6" />
              <span>{status === 'check-in' ? 'Check In' : 'Check Out'}</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}