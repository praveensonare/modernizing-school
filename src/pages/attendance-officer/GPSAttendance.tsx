import React, { useState } from 'react';
import { Check, Filter } from 'lucide-react';
import { useAuth } from '../../store/auth';

interface Student {
  id: string;
  name: string;
  class: string;
  photo: string;
  droppedBy: 'bus' | 'parent' | 'self';
  selected: boolean;
}

const DUMMY_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?auto=format&fit=crop&q=80&w=100',
    droppedBy: 'bus',
    selected: false
  },
  {
    id: '2',
    name: 'Emma Johnson',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
    droppedBy: 'parent',
    selected: false
  }
];

export const GPSAttendance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(DUMMY_STUDENTS);
  const [dropFilter, setDropFilter] = useState<'bus' | 'parent' | 'self' | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const { user } = useAuth();

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setStudents(students.map(student => ({ ...student, selected: !selectAll })));
  };

  const handleStudentSelect = (id: string) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, selected: !student.selected } : student
    ));
  };

  const filteredStudents = dropFilter
    ? students.filter(student => student.droppedBy === dropFilter)
    : students;

  const getAttendanceStatus = () => {
    const status = localStorage.getItem('attendanceStatus');
    return status === '"check-in"' ? 'Check In' : 'Check Out';
  };

  return (
    <div className="flex-1 p-4">
      <div className="mb-4 flex justify-between items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="mr-2"
          />
          Select All
        </label>
        
        <div className="relative">
          <button
            onClick={() => setDropFilter(null)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
          >
            <Filter size={20} />
            <span>Filter by Drop</span>
          </button>
          {dropFilter && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              1
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-4">
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
              <p className="text-sm text-gray-600">
                Class: {student.class} • Dropped by: {student.droppedBy}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
        <Check size={20} />
        <span>{getAttendanceStatus()}</span>
      </button>
    </div>
  );
};