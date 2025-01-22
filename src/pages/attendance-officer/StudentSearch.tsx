import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  class: string;
  photo: string;
  selected: boolean;
}

const DUMMY_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?auto=format&fit=crop&q=80&w=100',
    selected: false
  },
  {
    id: '2',
    name: 'Emma Johnson',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
    selected: false
  }
];

export const StudentSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [classFilter, setClassFilter] = useState<string>('all');

  const handleSearch = () => {
    // Simulate API call
    setStudents(DUMMY_STUDENTS);
  };

  const handleStudentSelect = (id: string) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, selected: !student.selected } : student
    ));
  };

  const filteredStudents = classFilter === 'all'
    ? students
    : students.filter(student => student.class === classFilter);

  return (
    <div className="flex-1 p-4">
      <div className="mb-6 space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2"
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="all">All Classes</option>
          <option value="10A">Class 10A</option>
          <option value="10B">Class 10B</option>
        </select>
      </div>

      <div className="space-y-4 mb-6">
        {filteredStudents.map(student => (
          <div
            key={student.id}
            className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow"
          >
            <input
              type="checkbox"
              checked={student.selected}
              onChange={() => handleStudentSelect(student.id)}
              className="mr-2"
            />
            <img
              src={student.photo}
              alt={student.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{student.name}</h3>
              <p className="text-sm text-gray-600">Class: {student.class}</p>
            </div>
          </div>
        ))}
      </div>

      {students.length > 0 && (
        <button className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
          <Check size={20} />
          <span>Mark Attendance</span>
        </button>
      )}
    </div>
  );
};