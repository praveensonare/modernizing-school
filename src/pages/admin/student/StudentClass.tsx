import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  photo: string;
  schoolId: string;
  attendance: number;
}

interface TimeTableEntry {
  time: string;
  subject: string;
  teacher: string;
}

const dummyStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1',
    schoolId: 'STU001',
    attendance: 95,
  },
  {
    id: '2',
    name: 'Emma Wilson',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    schoolId: 'STU002',
    attendance: 98,
  },
  {
    id: '3',
    name: 'Michael Brown',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    schoolId: 'STU003',
    attendance: 92,
  },
];

const todayTimeTable: TimeTableEntry[] = [
  {
    time: '08:00 AM',
    subject: 'Mathematics',
    teacher: 'Mr. Johnson',
  },
  {
    time: '09:00 AM',
    subject: 'English',
    teacher: 'Ms. Wilson',
  },
  {
    time: '10:00 AM',
    subject: 'Science',
    teacher: 'Dr. Brown',
  },
  {
    time: '11:00 AM',
    subject: 'History',
    teacher: 'Mrs. Davis',
  },
];

export function StudentClass() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="relative h-64">
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754"
            alt="Class 10A"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold">Class 10A</h1>
            <p className="mt-2">
              Class Teacher: Sarah Johnson | Assistant: Michael Chen
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <div className="bg-white rounded-lg shadow-sm">
            {dummyStudents.map((student) => (
              <div
                key={student.id}
                className="p-4 flex items-center gap-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/admin/student/${student.id}`)}
              >
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-500">ID: {student.schoolId}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Attendance</p>
                  <p
                    className={`text-sm ${
                      student.attendance >= 95
                        ? 'text-green-600'
                        : student.attendance >= 90
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {student.attendance}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Today's Timetable</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-4">
              {todayTimeTable.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-2 text-gray-600 min-w-[100px]">
                    <Clock size={16} />
                    <span>{entry.time}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{entry.subject}</h4>
                    <p className="text-sm text-gray-500">{entry.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}