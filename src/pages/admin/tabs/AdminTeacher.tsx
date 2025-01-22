import React from 'react';
import { Plus, Phone, Mail } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  photo: string;
  role: string;
  subject: string;
  phone: string;
  email: string;
  experience: number;
}

const DUMMY_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    role: 'Senior Teacher',
    subject: 'Mathematics',
    phone: '+1234567890',
    email: 'sarah.wilson@school.com',
    experience: 8
  },
  {
    id: '2',
    name: 'John Smith',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    role: 'Subject Teacher',
    subject: 'Science',
    phone: '+1234567891',
    email: 'john.smith@school.com',
    experience: 5
  }
];

export const AdminTeacher: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Teachers</h2>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Add New Teacher</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {DUMMY_TEACHERS.map(teacher => (
          <div
            key={teacher.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{teacher.name}</h3>
                  <p className="text-gray-600">{teacher.role}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Subject:</span> {teacher.subject}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Experience:</span> {teacher.experience} years
                </p>
                
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <Phone size={16} />
                  <a href={`tel:${teacher.phone}`}>{teacher.phone}</a>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <Mail size={16} />
                  <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};