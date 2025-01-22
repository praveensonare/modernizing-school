import React from 'react';
import { Users, Plus, Clock } from 'lucide-react';

interface Class {
  id: string;
  name: string;
  image: string;
  teacher: string;
  totalStudents: number;
  schedule: {
    subject: string;
    time: string;
    teacher: string;
  }[];
}

const DUMMY_CLASSES: Class[] = [
  {
    id: '1',
    name: '10A',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400',
    teacher: 'Sarah Wilson',
    totalStudents: 30,
    schedule: [
      { subject: 'Mathematics', time: '8:00 AM', teacher: 'John Smith' },
      { subject: 'Science', time: '9:00 AM', teacher: 'Emma Johnson' },
      { subject: 'English', time: '10:00 AM', teacher: 'Michael Brown' }
    ]
  },
  {
    id: '2',
    name: '10B',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
    teacher: 'Robert Brown',
    totalStudents: 28,
    schedule: [
      { subject: 'Science', time: '8:00 AM', teacher: 'Emma Johnson' },
      { subject: 'Mathematics', time: '9:00 AM', teacher: 'John Smith' },
      { subject: 'English', time: '10:00 AM', teacher: 'Michael Brown' }
    ]
  }
];

export const AdminStudent: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Classes</h2>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Add New Class</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {DUMMY_CLASSES.map(classItem => (
          <div
            key={classItem.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 relative">
              <img
                src={classItem.image}
                alt={classItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Class {classItem.name}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">Class Teacher</p>
                  <p className="text-gray-600">{classItem.teacher}</p>
                </div>
                <div className="flex items-center space-x-1 text-blue-500">
                  <Users size={20} />
                  <span>{classItem.totalStudents}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Clock size={16} />
                  <span>Today's Schedule</span>
                </h4>
                <div className="space-y-2">
                  {classItem.schedule.map((slot, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{slot.time}</span>
                      <span className="font-medium">{slot.subject}</span>
                      <span className="text-gray-600">{slot.teacher}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};