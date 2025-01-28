import React, { useState } from 'react';
import { UserPlus, User } from 'lucide-react';

interface LinkedChild {
  id: string;
  name: string;
  class: string;
  linkedDate: string;
}

const linkedChildren: LinkedChild[] = [
  {
    id: '1',
    name: 'John Doe',
    class: 'Grade 5-A',
    linkedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Doe',
    class: 'Grade 3-B',
    linkedDate: '2024-02-01'
  }
];

export default function LinkChild() {
  const [uniqueId, setUniqueId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Linking child with ID:', uniqueId);
    // Implement child linking logic here
    setUniqueId('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <User className="mr-2 text-blue-500" />
          Linked Children
        </h2>
        <div className="space-y-4">
          {linkedChildren.map((child) => (
            <div
              key={child.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium">{child.name}</h3>
                <p className="text-sm text-gray-500">{child.class}</p>
              </div>
              <div className="text-sm text-gray-500">
                Linked on {new Date(child.linkedDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <UserPlus className="mr-2 text-green-500" />
          Link New Child
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="uniqueId" className="block text-sm font-medium text-gray-700 mb-1">
              Child's Unique ID
            </label>
            <input
              type="text"
              id="uniqueId"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter unique ID"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <UserPlus size={16} className="mr-2" />
            Link Child
          </button>
        </form>
      </section>
    </div>
  );
}