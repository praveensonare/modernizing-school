import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, Mail, AlertCircle, X } from 'lucide-react';

interface StudentDetails {
  id: string;
  name: string;
  photo: string;
  schoolId: string;
  class: string;
  medicalConditions: string[];
  allergies: string[];
  parents: {
    father: {
      name: string;
      phone: string;
      whatsapp: string;
      email: string;
    };
    mother: {
      name: string;
      phone: string;
      whatsapp: string;
      email: string;
    };
  };
}

const dummyStudent: StudentDetails = {
  id: '1',
  name: 'John Smith',
  photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1',
  schoolId: 'STU001',
  class: '10A',
  medicalConditions: ['Asthma'],
  allergies: ['Peanuts', 'Dust'],
  parents: {
    father: {
      name: 'Michael Smith',
      phone: '+1234567890',
      whatsapp: '+1234567890',
      email: 'michael.smith@example.com',
    },
    mother: {
      name: 'Sarah Smith',
      phone: '+1234567891',
      whatsapp: '+1234567891',
      email: 'sarah.smith@example.com',
    },
  },
};

export function StudentDetail() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Student Details</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/admin/student/class')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
          <button
            onClick={() => navigate('/admin/student')}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-start gap-6">
            <img
              src={dummyStudent.photo}
              alt={dummyStudent.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{dummyStudent.name}</h2>
              <div className="mt-2 space-y-1 text-gray-600">
                <p>School ID: {dummyStudent.schoolId}</p>
                <p>Class: {dummyStudent.class}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Medical Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">
                    Medical Conditions
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dummyStudent.medicalConditions.map((condition) => (
                      <span
                        key={condition}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Allergies</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dummyStudent.allergies.map((allergy) => (
                      <span
                        key={allergy}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Parent Information</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700">Father</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-600">
                      {dummyStudent.parents.father.name}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      <span>{dummyStudent.parents.father.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                      <span>{dummyStudent.parents.father.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Mother</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-600">
                      {dummyStudent.parents.mother.name}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      <span>{dummyStudent.parents.mother.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                      <span>{dummyStudent.parents.mother.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {dummyStudent.medicalConditions.length > 0 && (
            <div className="mt-8 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle size={20} />
                <span className="font-medium">Medical Alert</span>
              </div>
              <p className="mt-2 text-red-700">
                This student has medical conditions that require attention.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}