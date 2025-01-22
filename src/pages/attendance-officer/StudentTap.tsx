import React from 'react';
import { Check } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  class: string;
  photo: string;
}

const DUMMY_STUDENT: Student = {
  id: '1',
  name: 'John Smith',
  class: '10A',
  photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?auto=format&fit=crop&q=80&w=200'
};

export const StudentTap: React.FC = () => {
  return (
    <div className="flex-1 p-4 flex flex-col items-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-500">
          <img
            src={DUMMY_STUDENT.photo}
            alt={DUMMY_STUDENT.name}
            className="w-32 h-32 rounded-full mx-auto border-4 border-white"
          />
        </div>
        
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{DUMMY_STUDENT.name}</h2>
          <p className="text-gray-600 mb-6">Class: {DUMMY_STUDENT.class}</p>
          
          <button className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
            <Check size={20} />
            <span>Mark Present</span>
          </button>
        </div>
      </div>
    </div>
  );
};