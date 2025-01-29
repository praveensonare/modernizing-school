import React, { useState } from 'react';
import { UserPlus, User, Camera, Plus, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface LinkedChild {
  id: string;
  name: string;
  class: string;
  linkedDate: string;
  profilePicture: string;
}

const linkedChildren: LinkedChild[] = [
  {
    id: '1',
    name: 'John Doe',
    class: 'Grade 5-A',
    linkedDate: '2024-01-15',
    profilePicture: 'https://images.unsplash.com/photo-1570632267781-46f97c2a4f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: '2',
    name: 'Jane Doe',
    class: 'Grade 3-B',
    linkedDate: '2024-02-01',
    profilePicture: 'https://images.unsplash.com/photo-1567168544646-208fa5d408fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  }
];

export default function LinkChild() {
  const [uniqueId, setUniqueId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Linking child with ID:', uniqueId);
    setUniqueId('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <User className="mr-2 text-blue-500" />
          Linked Children
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {linkedChildren.map((child) => (
            <div
              key={child.id}
              onClick={() => navigate(`/parent/child/${child.id}`)}
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <img
                src={child.profilePicture}
                alt={child.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                  {child.name}
                </h3>
                <p className="text-sm text-gray-500">{child.class}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Linked on {new Date(child.linkedDate).toLocaleDateString()}
                </p>
              </div>
              <Pencil size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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