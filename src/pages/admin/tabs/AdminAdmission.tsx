import React from 'react';
import { ChevronRight, Users } from 'lucide-react';

interface AdmissionStage {
  id: string;
  name: string;
  count: number;
  candidates: {
    name: string;
    status: string;
    date: string;
  }[];
}

const ADMISSION_STAGES: AdmissionStage[] = [
  {
    id: 'started',
    name: 'Started',
    count: 15,
    candidates: [
      { name: 'John Doe', status: 'Form Filling', date: '2024-03-20' },
      { name: 'Jane Smith', status: 'Documents Upload', date: '2024-03-19' }
    ]
  },
  {
    id: 'submitted',
    name: 'Submitted',
    count: 10,
    candidates: [
      { name: 'Mike Johnson', status: 'Under Review', date: '2024-03-18' },
      { name: 'Sarah Wilson', status: 'Under Review', date: '2024-03-17' }
    ]
  },
  {
    id: 'payment',
    name: 'Payment Completed',
    count: 8,
    candidates: [
      { name: 'Robert Brown', status: 'Paid', date: '2024-03-16' },
      { name: 'Emma Davis', status: 'Paid', date: '2024-03-15' }
    ]
  },
  {
    id: 'validation',
    name: 'Document Validation',
    count: 6,
    candidates: [
      { name: 'William Taylor', status: 'In Progress', date: '2024-03-14' },
      { name: 'Olivia Martin', status: 'Completed', date: '2024-03-13' }
    ]
  },
  {
    id: 'interview',
    name: 'Interview Invite',
    count: 4,
    candidates: [
      { name: 'James Anderson', status: 'Scheduled', date: '2024-03-12' },
      { name: 'Sophia Clark', status: 'Pending', date: '2024-03-11' }
    ]
  },
  {
    id: 'assessment',
    name: 'F2F Assessment',
    count: 3,
    candidates: [
      { name: 'Daniel Lee', status: 'Completed', date: '2024-03-10' },
      { name: 'Isabella White', status: 'Scheduled', date: '2024-03-09' }
    ]
  },
  {
    id: 'completed',
    name: 'Completed',
    count: 2,
    candidates: [
      { name: 'Matthew Harris', status: 'Admitted', date: '2024-03-08' },
      { name: 'Ava Thompson', status: 'Admitted', date: '2024-03-07' }
    ]
  }
];

export const AdminAdmission: React.FC = () => {
  const [selectedStage, setSelectedStage] = React.useState<string | null>(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admission Journey</h2>
      
      <div className="space-y-4">
        {ADMISSION_STAGES.map((stage, index) => (
          <div key={stage.id} className="relative">
            {/* Connecting Line */}
            {index < ADMISSION_STAGES.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-blue-200" />
            )}
            
            <div className="relative">
              <button
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                className="w-full bg-white rounded-lg shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{stage.name}</h3>
                    <p className="text-sm text-gray-600">{stage.count} candidates</p>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className={`transform transition-transform ${
                    selectedStage === stage.id ? 'rotate-90' : ''
                  }`}
                />
              </button>
              
              {/* Expanded Content */}
              {selectedStage === stage.id && (
                <div className="mt-2 ml-16 bg-white rounded-lg shadow-lg p-4">
                  <div className="space-y-3">
                    {stage.candidates.map((candidate, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-gray-600">{candidate.status}</p>
                        </div>
                        <p className="text-sm text-gray-500">{candidate.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};