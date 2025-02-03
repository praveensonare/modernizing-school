import React, { useState } from 'react';
import { Phone, MessageSquare, Search, ChevronDown } from 'lucide-react';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';

interface Student {
  id: number;
  name: string;
  grade: string;
  address: string;
  onLeave: boolean;
  parent: {
    name: string;
    phone: string;
  };
}

export default function Student() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

  const students: Student[] = [
    {
      id: 1,
      name: 'John Smith',
      grade: 'Grade 5',
      address: '123 Green Valley Road',
      onLeave: true,
      parent: {
        name: 'Sarah Smith',
        phone: '+1234567890'
      }
    },
    {
      id: 2,
      name: 'Emma Wilson',
      grade: 'Grade 4',
      address: '456 Riverside Park Ave',
      onLeave: false,
      parent: {
        name: 'Michael Wilson',
        phone: '+1234567891'
      }
    },
    {
      id: 3,
      name: 'Oliver Brown',
      grade: 'Grade 3',
      address: '789 Oak Street',
      onLeave: false,
      parent: {
        name: 'Emily Brown',
        phone: '+1234567892'
      }
    },
    {
      id: 4,
      name: 'Sophia Davis',
      grade: 'Grade 5',
      address: '321 Maple Avenue',
      onLeave: true,
      parent: {
        name: 'David Davis',
        phone: '+1234567893'
      }
    },
    {
      id: 5,
      name: 'William Taylor',
      grade: 'Grade 4',
      address: '654 Pine Heights',
      onLeave: false,
      parent: {
        name: 'Jennifer Taylor',
        phone: '+1234567894'
      }
    },
    {
      id: 6,
      name: 'Isabella Martinez',
      grade: 'Grade 3',
      address: '987 Cedar Lane',
      onLeave: false,
      parent: {
        name: 'Carlos Martinez',
        phone: '+1234567895'
      }
    },
    {
      id: 7,
      name: 'James Johnson',
      grade: 'Grade 5',
      address: '147 Birch Road',
      onLeave: true,
      parent: {
        name: 'Lisa Johnson',
        phone: '+1234567896'
      }
    },
    {
      id: 8,
      name: 'Mia Anderson',
      grade: 'Grade 4',
      address: '258 Elm Street',
      onLeave: false,
      parent: {
        name: 'Robert Anderson',
        phone: '+1234567897'
      }
    },
    {
      id: 9,
      name: 'Lucas Garcia',
      grade: 'Grade 3',
      address: '369 Willow Way',
      onLeave: false,
      parent: {
        name: 'Ana Garcia',
        phone: '+1234567898'
      }
    },
    {
      id: 10,
      name: 'Ava Thompson',
      grade: 'Grade 5',
      address: '741 Spruce Street',
      onLeave: false,
      parent: {
        name: 'Mark Thompson',
        phone: '+1234567899'
      }
    },
    {
      id: 11,
      name: 'Ethan Moore',
      grade: 'Grade 4',
      address: '852 Ash Avenue',
      onLeave: true,
      parent: {
        name: 'Rachel Moore',
        phone: '+1234567900'
      }
    },
    {
      id: 12,
      name: 'Charlotte Lee',
      grade: 'Grade 3',
      address: '963 Beech Boulevard',
      onLeave: false,
      parent: {
        name: 'Daniel Lee',
        phone: '+1234567901'
      }
    },
    {
      id: 13,
      name: 'Alexander Wright',
      grade: 'Grade 5',
      address: '159 Dogwood Drive',
      onLeave: false,
      parent: {
        name: 'Jessica Wright',
        phone: '+1234567902'
      }
    },
    {
      id: 14,
      name: 'Amelia King',
      grade: 'Grade 4',
      address: '357 Fir Lane',
      onLeave: false,
      parent: {
        name: 'Thomas King',
        phone: '+1234567903'
      }
    },
    {
      id: 15,
      name: 'Henry Scott',
      grade: 'Grade 3',
      address: '486 Hazel Court',
      onLeave: true,
      parent: {
        name: 'Laura Scott',
        phone: '+1234567904'
      }
    },
    {
      id: 16,
      name: 'Victoria Adams',
      grade: 'Grade 5',
      address: '159 Ivy Path',
      onLeave: false,
      parent: {
        name: 'Steven Adams',
        phone: '+1234567905'
      }
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id: number) => {
    setExpandedStudent(expandedStudent === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-16 pt-16">
      <Header />
      
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Students Directory
            </h2>
            <div className="text-sm">
              <span className="text-slate-500">Total:</span>
              <span className="ml-1 font-semibold text-indigo-600">{students.length}</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="space-y-3">
          {filteredStudents.map(student => (
            <div 
              key={student.id} 
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer hover:bg-slate-50 transition-colors duration-150"
                onClick={() => toggleExpand(student.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium text-slate-900">{student.name}</h3>
                      <p className="text-sm text-slate-500">{student.grade}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {student.onLeave && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-medium">
                        On Leave
                      </span>
                    )}
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 
                        ${expandedStudent === student.id ? 'transform rotate-180' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {expandedStudent === student.id && (
                <div className="px-4 pb-4 border-t border-slate-100">
                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Address:</span> {student.address}
                    </p>
                    <div className="pt-2">
                      <p className="text-sm font-medium text-slate-700">Parent Contact</p>
                      <p className="text-sm text-slate-600">{student.parent.name}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <a
                          href={`tel:${student.parent.phone}`}
                          className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">Call</span>
                        </a>
                        
                        <a
                          href={`https://wa.me/${student.parent.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}