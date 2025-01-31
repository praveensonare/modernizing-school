import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, MessageCircle } from 'lucide-react';

const communicationMethods = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Send messages via WhatsApp',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    description: 'Send messages via Email',
  },
  {
    id: 'both',
    icon: MessageSquare,
    title: 'Both WhatsApp and Email',
    description: 'Send messages via both channels',
  },
];

export function CommunicationHome() {
  const navigate = useNavigate();

  const handleMethodSelect = (methodId: string) => {
    // Store selected method in state management
    navigate('/admin/comm/teacher');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Communication</h1>
        <p className="mt-2 text-gray-600">
          Choose your preferred method of communication
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {communicationMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <method.icon size={48} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              {method.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              {method.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/admin/comm/teacher')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}