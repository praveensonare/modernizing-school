import React, { useState } from 'react';
import Header from '../../components/Attendance-officer/Header';
import Footer from '../../components/Attendance-officer/Footer';
import { Check } from 'lucide-react';

type Student = {
  id: string;
  name: string;
  class: string;
  photo: string;
  droppedBy: 'bus' | 'parent' | 'self';
};

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=64&h=64&fit=crop',
    droppedBy: 'bus'
  },
  {
    id: '2',
    name: 'Jane Smith',
    class: '10B',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop',
    droppedBy: 'parent'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop',
    droppedBy: 'self'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    class: '10C',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
    droppedBy: 'bus'
  },
  {
    id: '5',
    name: 'David Brown',
    class: '10B',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop',
    droppedBy: 'parent'
  }
];

export default function GPSAttendance() {
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [dropByFilter, setDropByFilter] = useState<string>('all');
  const status = localStorage.getItem('attendanceStatus');

  const handleSelectAll = () => {
    if (selectedStudents.size === mockStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(mockStudents.map(s => s.id)));
    }
  };

  const filteredStudents = mockStudents.filter(student => 
    dropByFilter === 'all' || student.droppedBy === dropByFilter
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-16">
      <Header />
      
      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedStudents.size === mockStudents.length}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span>Select All</span>
            </label>

            <select
              value={dropByFilter}
              onChange={(e) => setDropByFilter(e.target.value)}
              className="border rounded-md px-3 py-1.5 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="bus">Bus</option>
              <option value="parent">Parent</option>
              <option value="self">Self</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredStudents.map(student => (
              <div key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedStudents.has(student.id)}
                  onChange={() => {
                    const newSelected = new Set(selectedStudents);
                    if (newSelected.has(student.id)) {
                      newSelected.delete(student.id);
                    } else {
                      newSelected.add(student.id);
                    }
                    setSelectedStudents(newSelected);
                  }}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <img
                  src={student.photo}
                  alt={student.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-600">
                    Class: {student.class} • Dropped by: {student.droppedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedStudents.size > 0 && (
          <button
            onClick={() => {/* Implement attendance update logic */}}
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
          >
            <Check className="h-5 w-5" />
            <span>{status === 'check-in' ? 'Check In' : 'Check Out'} Selected</span>
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}