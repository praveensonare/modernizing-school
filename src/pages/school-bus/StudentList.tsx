import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  class: string;
  address: string;
  parent: {
    name: string;
    phone: string;
  };
}

const DUMMY_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    class: '10A',
    address: '123 Green Street, City',
    parent: {
      name: 'Robert Smith',
      phone: '+1234567890'
    }
  },
  {
    id: '2',
    name: 'Emma Johnson',
    class: '10B',
    address: '456 Blue Avenue, City',
    parent: {
      name: 'Mary Johnson',
      phone: '+1234567891'
    }
  }
];

export const StudentList: React.FC = () => {
  return (
    <div className="flex-1 p-4">
      <div className="space-y-4">
        {DUMMY_STUDENTS.map(student => (
          <div key={student.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-lg">{student.name}</h3>
            <p className="text-gray-600 text-sm mb-2">Class: {student.class}</p>
            <p className="text-gray-600 text-sm mb-3">{student.address}</p>
            
            <div className="border-t pt-3">
              <p className="font-medium mb-2">{student.parent.name}</p>
              <div className="flex space-x-4">
                <a
                  href={`tel:${student.parent.phone}`}
                  className="flex items-center space-x-2 text-blue-600"
                >
                  <Phone size={20} />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${student.parent.phone.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-600"
                >
                  <MessageSquare size={20} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};