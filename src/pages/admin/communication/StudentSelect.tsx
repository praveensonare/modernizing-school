import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
        id: '1-1',
        name: 'John Smith',
        photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1',
        parentName: 'Michael Smith',
        whatsapp: '+1234567890',
        email: 'john.smith@example.com',
      },
      {
        id: '1-2',
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
        id: '2-1',
        name: 'Sarah Johnson',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        parentName: 'Robert Johnson',
        whatsapp: '+1234567892',
        email: 'sarah.johnson@example.com',
      },
    ],
  },
  {
    id: '3',
    name: '8C',
    students: [
      {
        id: '3-1',
        name: 'Liam Brown',
        photo: 'https://images.unsplash.com/photo-1502767089025-6572583495b6',
        parentName: 'James Brown',
        whatsapp: '+1234567893',
        email: 'liam.brown@example.com',
      },
      {
        id: '3-2',
        name: 'Olivia Garcia',
        photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
        parentName: 'William Garcia',
        whatsapp: '+1234567894',
        email: 'olivia.garcia@example.com',
      },
    ],
  },
  {
    id: '4',
    name: '7D',
    students: [
      {
        id: '4-1',
        name: 'Noah Martinez',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
        parentName: 'Emma Martinez',
        whatsapp: '+1234567895',
        email: 'noah.martinez@example.com',
      },
      {
        id: '4-2',
        name: 'Ava Rodriguez',
        photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
        parentName: 'Liam Rodriguez',
        whatsapp: '+1234567896',
        email: 'ava.rodriguez@example.com',
      },
    ],
  },
  {
    id: '5',
    name: '6E',
    students: [
      {
        id: '5-1',
        name: 'Sophia Lee',
        photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a',
        parentName: 'Olivia Lee',
        whatsapp: '+1234567897',
        email: 'sophia.lee@example.com',
      },
    ],
  },
  {
    id: '6',
    name: '5F',
    students: [
      {
        id: '6-1',
        name: 'Mason Davis',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
        parentName: 'Ethan Davis',
        whatsapp: '+1234567898',
        email: 'mason.davis@example.com',
      },
      {
        id: '6-2',
        name: 'Isabella Martinez',
        photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
        parentName: 'Sophia Martinez',
        whatsapp: '+1234567899',
        email: 'isabella.martinez@example.com',
      },
    ],
  },
  {
    id: '7',
    name: '4G',
    students: [
      {
        id: '7-1',
        name: 'Ethan Taylor',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        parentName: 'Lucas Taylor',
        whatsapp: '+1234567800',
        email: 'ethan.taylor@example.com',
      },
    ],
  },
  {
    id: '8',
    name: '3H',
    students: [
      {
        id: '8-1',
        name: 'Mia Anderson',
        photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4',
        parentName: 'Charlotte Anderson',
        whatsapp: '+1234567801',
        email: 'mia.anderson@example.com',
      },
      {
        id: '8-2',
        name: 'William Thomas',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        parentName: 'Benjamin Thomas',
        whatsapp: '+1234567802',
        email: 'william.thomas@example.com',
      },
    ],
  },
  {
    id: '9',
    name: '2I',
    students: [
      {
        id: '9-1',
        name: 'Amelia Harris',
        photo: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
        parentName: 'Henry Harris',
        whatsapp: '+1234567803',
        email: 'amelia.harris@example.com',
      },
    ],
  },
  {
    id: '10',
    name: '1J',
    students: [
      {
        id: '10-1',
        name: 'James Clark',
        photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
        parentName: 'Daniel Clark',
        whatsapp: '+1234567804',
        email: 'james.clark@example.com',
      },
      {
        id: '10-2',
        name: 'Ella Robinson',
        photo: 'https://images.unsplash.com/photo-1502767089025-6572583495b6',
        parentName: 'Samuel Robinson',
        whatsapp: '+1234567805',
        email: 'ella.robinson@example.com',
      },
    ],
  },
];

export default dummyClasses;

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

  // New function: toggles selection of all students in a class.
  const selectAllInClass = (classId: string) => {
    const classItem = dummyClasses.find(c => c.id === classId);
    if (!classItem) return;

    const isAllSelected = classItem.students.every(s => selectedStudents.has(s.id));
    const newSelected = new Set(selectedStudents);

    if (isAllSelected) {
      // Deselect all students in this class.
      classItem.students.forEach(s => newSelected.delete(s.id));
    } else {
      // Select all students in this class.
      classItem.students.forEach(s => newSelected.add(s.id));
    }
    setSelectedStudents(newSelected);
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
                checked={
                  selectedStudents.size ===
                  dummyClasses.flatMap(c => c.students).length
                }
                onChange={(e) =>
                  e.target.checked ? selectAll() : deselectAll()
                }
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

      <div className="space-y-4 h-96 overflow-y-auto">
        {dummyClasses.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-lg shadow-sm">
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleClass(classItem.id)}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={classItem.students.every((s) =>
                    selectedStudents.has(s.id)
                  )}
                  onChange={() => selectAllInClass(classItem.id)}
                  onClick={(e) => e.stopPropagation()}
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
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
