import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface AdmissionApplication {
  id: string;
  studentName: string;
  photo: string;
  dateOfBirth: string;
  grade: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  parentName: string;
  phone: string;
  email: string;
  documents: {
    name: string;
    status: 'verified' | 'pending' | 'rejected';
  }[];
}

const dummyApplications: AdmissionApplication[] = [
  {
    id: 'APP001',
    studentName: 'John Smith',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1',
    dateOfBirth: '2010-05-15',
    grade: '10',
    status: 'pending',
    submittedDate: '2024-02-15',
    parentName: 'Michael Smith',
    phone: '+1234567890',
    email: 'michael.smith@example.com',
    documents: [
      { name: 'Birth Certificate', status: 'verified' },
      { name: 'Previous School Records', status: 'pending' },
      { name: 'Medical Records', status: 'verified' },
    ],
  },
  {
    id: 'APP002',
    studentName: 'Emma Wilson',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    dateOfBirth: '2011-08-20',
    grade: '9',
    status: 'approved',
    submittedDate: '2024-02-10',
    parentName: 'David Wilson',
    phone: '+1234567891',
    email: 'david.wilson@example.com',
    documents: [
      { name: 'Birth Certificate', status: 'verified' },
      { name: 'Previous School Records', status: 'verified' },
      { name: 'Medical Records', status: 'verified' },
    ],
  },
];

export function Admission() {
  const [selectedApplication, setSelectedApplication] = useState<AdmissionApplication | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredApplications = dummyApplications.filter(
    (app) => filter === 'all' || app.status === filter
  );

  const getStatusColor = (status: AdmissionApplication['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'pending':
        return <Clock className="text-yellow-600" size={16} />;
      case 'rejected':
        return <XCircle className="text-red-600" size={16} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admission Applications
        </h1>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-md ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-md ${
              filter === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer ${
                selectedApplication?.id === application.id
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
              onClick={() => setSelectedApplication(application)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={application.photo}
                  alt={application.studentName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{application.studentName}</h3>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>Grade {application.grade}</p>
                    <p>Parent: {application.parentName}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    application.status
                  )}`}
                >
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedApplication && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-6 mb-6">
              <img
                src={selectedApplication.photo}
                alt={selectedApplication.studentName}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedApplication.studentName}
                </h2>
                <div className="mt-2 space-y-1 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>DOB: {selectedApplication.dateOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Applied: {selectedApplication.submittedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Parent Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Name: {selectedApplication.parentName}</p>
                  <p>Phone: {selectedApplication.phone}</p>
                  <p>Email: {selectedApplication.email}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Documents</h3>
                <div className="space-y-2">
                  {selectedApplication.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <span>{doc.name}</span>
                      {getDocumentStatusIcon(doc.status)}
                    </div>
                  ))}
                </div>
              </div>

              {selectedApplication.status === 'pending' && (
                <div className="flex gap-4">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}