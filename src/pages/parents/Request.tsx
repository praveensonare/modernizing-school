import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Child {
  id: string;
  name: string;
}

const requestTypes = [
  'Request for Leave',
  'Request for Late Attendance',
  'Request for Information',
  'Other'
];

const children: Child[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Doe' }
];

export default function Request() {
  const [selectedType, setSelectedType] = useState('');
  const [message, setMessage] = useState('');
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      type: selectedType,
      message,
      children: selectedChildren
    });
    // Implement submission logic here
  };

  const handleChildToggle = (childId: string) => {
    setSelectedChildren(prev =>
      prev.includes(childId)
        ? prev.filter(id => id !== childId)
        : [...prev, childId]
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Submit Request</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Request Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select request type</option>
            {requestTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your request details..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Children
          </label>
          <div className="space-y-2">
            {children.map((child) => (
              <label key={child.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedChildren.includes(child.id)}
                  onChange={() => handleChildToggle(child.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{child.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Send size={16} className="mr-2" />
          Submit Request
        </button>
      </form>
    </div>
  );
}