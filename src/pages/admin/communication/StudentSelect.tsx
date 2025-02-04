import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Class {
  id: string;
  name: string;
  students: Student[];
}

interface Student {
  id: string;
  name: string;
  photo: string;
  parentName: string;
  whatsapp: string;
  email: string;
}

const dummyClasses: Class[] = [
  {
    id: '1',
    name: '10A',
    students: [
      {
        id: '1',
        name: 'John Smith',
        photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1',
        parentName: 'Michael Smith',
        whatsapp: '+1234567890',
        email: 'john.smith@example.com',
      },
      {
        id: '2',
        name: 'Emma Wilson',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
        parentName: 'David Wilson',
        whatsapp: '+1234567891',
        email: 'emma.wilson@example.com',
      },
    ],
  },
  {
    id: '2',
    name: '9B',
    students: [
      {
        id: '3',
        name: 'Sarah Johnson',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        parentName: 'Robert Johnson',
        whatsapp: '+1234567892',
        email: 'sarah.johnson@example.com',
      },
    ],
  },
];

export function StudentSelect() {
  const navigate = useNavigate();
  const [expandedClasses, setExpandedClasses] = useState<Set<string>>(new Set());
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());

  const toggleClass = (classId: string) => {
    const newExpanded = new Set(expandedClasses);
    if (newExpanded.has(classId)) {
      newExpanded.delete(classId);
    } else {
      newExpanded.add(classId);
    }
    setExpandedClasses(newExpanded);
  };

  const toggleStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const selectAll = () => {
    const allStudents = dummyClasses.flatMap(c => c.students);
    setSelectedStudents(new Set(allStudents.map(s => s.id)));
  };

  const deselectAll = () => {
    setSelectedStudents(new Set());
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Select Students</h1>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedStudents.size === dummyClasses.flatMap(c => c.students).length}
                onChange={(e) => e.target.checked ? selectAll() : deselectAll()}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </label>
          </div>
          <span className="text-gray-500">
            {selectedStudents.size} students selected
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {dummyClasses.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-lg shadow-sm">
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleClass(classItem.id)}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={classItem.students.every(s => selectedStudents.has(s.id))}
                  onChange={() => selectAllInClass(classItem.id)}
                  onClick={e => e.stopPropagation()}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <h3 className="text-lg font-medium">Class {classItem.name}</h3>
              </div>
              {expandedClasses.has(classItem.id) ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            {expandedClasses.has(classItem.id) && (
              <div className="border-t border-gray-100">
                {classItem.students.map((student) => (
                  <div
                    key={student.id}
                    className={cn(
                      'p-4 flex items-center gap-4 hover:bg-gray-50',
                      selectedStudents.has(student.id) && 'bg-blue-50'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.has(student.id)}
                      onChange={() => toggleStudent(student.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-gray-500">
                        Parent: {student.parentName}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>{student.whatsapp}</p>
                      <p>{student.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/admin/comm/teacher')}
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
            onClick={() => navigate('/admin/comm/vendor')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={selectedStudents.size === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}