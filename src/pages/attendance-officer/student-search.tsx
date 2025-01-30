import React, { useState } from 'react';
import Header from '../../components/Attendance-officer/Header';
import Footer from '../../components/Attendance-officer/Footer';
import { Search, Check } from 'lucide-react';

type Student = {
  id: string;
  name: string;
  class: string;
  photo: string;
};

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=64&h=64&fit=crop'
  },
  {
    id: '2',
    name: 'Jane Smith',
    class: '10B',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    class: '10C',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop'
  },
  {
    id: '5',
    name: 'David Brown',
    class: '10B',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop'
  }
];

export default function StudentSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [classFilter, setClassFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'class'>('name');
  const status = localStorage.getItem('attendanceStatus');

  const handleSearch = async () => {
    // Simulate API call with mock data
    const filtered = mockStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStudents(filtered);
  };

  const filteredAndSortedStudents = [...students]
    .filter(student => classFilter === 'all' || student.class === classFilter)
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-16">
      <Header />
      
      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students..."
              className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>

          <div className="mt-4 flex justify-between">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="border rounded-md px-3 py-1.5 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Classes</option>
              <option value="10A">10A</option>
              <option value="10B">10B</option>
              <option value="10C">10C</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'class')}
              className="border rounded-md px-3 py-1.5 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="class">Sort by Class</option>
            </select>
          </div>

          <div className="mt-4 space-y-4">
            {filteredAndSortedStudents.map(student => (
              <div key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-600">Class: {student.class}</p>
                </div>
                <button
                  onClick={() => {/* Implement attendance update logic */}}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
                >
                  <Check className="h-5 w-5" />
                  <span>{status === 'check-in' ? 'Check In' : 'Check Out'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}