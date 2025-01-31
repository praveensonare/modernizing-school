import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCommunicationStore } from '../../../store/useCommunicationStore';

interface Receiver {
  id: string;
  name: string;
  type: 'teacher' | 'student' | 'vendor';
  contact: {
    whatsapp?: string;
    email?: string;
  };
}

// In a real app, this would come from your previous selections
const dummyReceivers: Receiver[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    type: 'teacher',
    contact: {
      whatsapp: '+1234567890',
      email: 'sarah.j@school.com',
    },
  },
  {
    id: '2',
    name: 'John Smith',
    type: 'student',
    contact: {
      whatsapp: '+1234567891',
      email: 'john.smith@example.com',
    },
  },
  {
    id: '3',
    name: 'ABC Supplies',
    type: 'vendor',
    contact: {
      whatsapp: '+1234567892',
      email: 'contact@abcsupplies.com',
    },
  },
];

export function ReviewReceivers() {
  const navigate = useNavigate();
  const [receivers, setReceivers] = React.useState<Receiver[]>(dummyReceivers);

  const removeReceiver = (id: string) => {
    setReceivers(receivers.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Review Recipients</h1>
        <p className="mt-2 text-gray-600">
          Review and confirm your message recipients
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <span className="font-medium">{receivers.length} Recipients</span>
        </div>
        <div className="divide-y divide-gray-100">
          {receivers.map((receiver) => (
            <div
              key={receiver.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium">{receiver.name}</h3>
                <p className="text-sm text-gray-500 capitalize">
                  {receiver.type}
                </p>
                <div className="mt-1 text-sm text-gray-500">
                  {receiver.contact.whatsapp && (
                    <p>WhatsApp: {receiver.contact.whatsapp}</p>
                  )}
                  {receiver.contact.email && (
                    <p>Email: {receiver.contact.email}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeReceiver(receiver.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/admin/comm/vendor')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/admin/communication')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/admin/comm/message')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={receivers.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}