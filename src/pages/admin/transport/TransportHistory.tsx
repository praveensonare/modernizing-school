import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

interface RouteHistory {
  date: Date;
  entries: {
    time: string;
    event: string;
    location: string;
    details?: string;
  }[];
}

const dummyHistory: RouteHistory[] = [
  {
    date: new Date(),
    entries: [
      {
        time: '07:30',
        event: 'Started Route',
        location: 'Bus Depot',
        details: 'Driver: David Johnson',
      },
      {
        time: '07:45',
        event: 'Pickup',
        location: 'Central Park',
        details: '5 students boarded',
      },
      {
        time: '08:15',
        event: 'Reached School',
        location: 'Main Gate',
        details: 'All students safely dropped',
      },
    ],
  },
  {
    date: new Date(Date.now() - 86400000), // Yesterday
    entries: [
      {
        time: '07:30',
        event: 'Started Route',
        location: 'Bus Depot',
        details: 'Driver: David Johnson',
      },
      {
        time: '07:45',
        event: 'Pickup',
        location: 'Central Park',
        details: '5 students boarded',
      },
      {
        time: '08:15',
        event: 'Reached School',
        location: 'Main Gate',
        details: 'All students safely dropped',
      },
    ],
  },
];

export function TransportHistory() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Route History</h1>
          <p className="mt-2 text-gray-600">Route: R101</p>
        </div>
        <button
          onClick={() => navigate('/admin/transport')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back to Routes
        </button>
      </div>

      <div className="space-y-8">
        {dummyHistory.map((day, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={20} />
                <span className="font-medium">
                  {format(day.date, 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />

                <div className="space-y-6">
                  {day.entries.map((entry, entryIndex) => (
                    <div key={entryIndex} className="relative pl-8">
                      <div className="absolute left-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500" />
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2 text-gray-500 min-w-[100px]">
                          <Clock size={16} />
                          <span>{entry.time}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{entry.event}</h3>
                          <p className="text-sm text-gray-600">
                            {entry.location}
                          </p>
                          {entry.details && (
                            <p className="text-sm text-gray-500 mt-1">
                              {entry.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}