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
  {
    id: '3',
    name: 'Ava Thompson',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    class: '11C',
  },
  {
    id: '4',
    name: 'David Smith',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    class: '10B',
  },
  {
    id: '5',
    name: 'Emily Brown',
    photo: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
    class: '12A',
  },
  {
    id: '6',
    name: 'James Wilson',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
    class: '9A',
  },
  {
    id: '7',
    name: 'Sophia Martinez',
    photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4',
    class: '8B',
  },
  {
    id: '8',
    name: 'William Anderson',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
    class: '11A',
  },
  {
    id: '9',
    name: 'Olivia Garcia',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    class: '10C',
  },
  {
    id: '10',
    name: 'Liam Rodriguez',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    class: '12B',
  },
];

export default dummyTeachers;


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

      <div className="grid grid-cols-3 gap-3 h-96 overflow-auto ">
        {dummyTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className={`relative bg-white rounded-lg shadow-sm p-4 m-4 cursor-pointer
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
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}