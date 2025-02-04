import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  photo: string;
  class: string;
}

const dummyTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    class: '10A',
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    class: '9B',
  },
  // Add more dummy teachers
];

export function TeacherSelect() {
  const navigate = useNavigate();
  const [selectedTeachers, setSelectedTeachers] = useState<Set<string>>(new Set());

  const toggleTeacher = (teacherId: string) => {
    const newSelected = new Set(selectedTeachers);
    if (newSelected.has(teacherId)) {
      newSelected.delete(teacherId);
    } else {
      newSelected.add(teacherId);
    }
    setSelectedTeachers(newSelected);
  };

  const selectAll = () => {
    const allIds = dummyTeachers.map(t => t.id);
    setSelectedTeachers(new Set(allIds));
  };

  const deselectAll = () => {
    setSelectedTeachers(new Set());
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Select Teachers</h1>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTeachers.size === dummyTeachers.length}
                onChange={(e) => e.target.checked ? selectAll() : deselectAll()}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </label>
          </div>
          <span className="text-gray-500">
            {selectedTeachers.size} teachers selected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {dummyTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className={`relative bg-white rounded-lg shadow-sm p-4 cursor-pointer
              ${selectedTeachers.has(teacher.id) ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => toggleTeacher(teacher.id)}
          >
            {selectedTeachers.has(teacher.id) && (
              <div className="absolute top-2 right-2">
                <Check className="text-blue-500" size={20} />
              </div>
            )}
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-medium text-center">{teacher.name}</h3>
            <p className="text-gray-500 text-center">Class {teacher.class}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/admin/communication')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/admin/communication')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/admin/comm/student')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={selectedTeachers.size === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}