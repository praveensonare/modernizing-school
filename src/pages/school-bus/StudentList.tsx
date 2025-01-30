import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';

interface Student {
  id: number;
  name: string;
  address: string;
  parent: {
    name: string;
    phone: string;
  };
}

export default function Student() {
  const students: Student[] = [
    {
      id: 1,
      name: 'John Smith',
      address: '123 Green Valley Road',
      parent: {
        name: 'Sarah Smith',
        phone: '+1234567890'
      }
    },
    {
      id: 2,
      name: 'Emma Wilson',
      address: '456 Riverside Park Ave',
      parent: {
        name: 'Michael Wilson',
        phone: '+1234567891'
      }
    },
    {
      id: 3,
      name: 'Oliver Brown',
      address: '789 Oak Street',
      parent: {
        name: 'Emily Brown',
        phone: '+1234567892'
      }
    },
    {
      id: 4,
      name: 'Sophia Davis',
      address: '321 Maple Avenue',
      parent: {
        name: 'David Davis',
        phone: '+1234567893'
      }
    },
    {
      id: 5,
      name: 'William Taylor',
      address: '654 Pine Heights',
      parent: {
        name: 'Jennifer Taylor',
        phone: '+1234567894'
      }
    },
    {
      id: 6,
      name: 'Isabella Martinez',
      address: '987 Cedar Lane',
      parent: {
        name: 'Carlos Martinez',
        phone: '+1234567895'
      }
    },
    {
      id: 7,
      name: 'James Johnson',
      address: '147 Birch Road',
      parent: {
        name: 'Lisa Johnson',
        phone: '+1234567896'
      }
    },
    {
      id: 8,
      name: 'Mia Anderson',
      address: '258 Elm Street',
      parent: {
        name: 'Robert Anderson',
        phone: '+1234567897'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16 pt-16">
      <Header />
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow mb-4">
          <h2 className="text-xl font-bold">
            Total Students: {students.length}
          </h2>
        </div>

        <div className="space-y-4">
          {students.map(student => (
            <div key={student.id} className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold text-lg">{student.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{student.address}</p>
              
              <div className="mt-3">
                <p className="text-sm">Parent: {student.parent.name}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <a
                    href={`tel:${student.parent.phone}`}
                    className="flex items-center space-x-1 text-blue-600"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </a>
                  
                  <a
                    href={`https://wa.me/${student.parent.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-green-600"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}