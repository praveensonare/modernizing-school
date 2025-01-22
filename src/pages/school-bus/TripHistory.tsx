import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface TripStop {
  name: string;
  scheduledTime: string;
  actualTime: string;
  students: {
    name: string;
    status: 'picked' | 'dropped';
  }[];
}

interface TripHistory {
  date: string;
  morning: TripStop[];
  afternoon: TripStop[];
}

const DUMMY_HISTORY: TripHistory = {
  date: '2024-03-20',
  morning: [
    {
      name: 'Green Park',
      scheduledTime: '7:30 AM',
      actualTime: '7:35 AM',
      students: [
        { name: 'John Smith', status: 'picked' },
        { name: 'Emma Johnson', status: 'picked' }
      ]
    },
    {
      name: 'Central Square',
      scheduledTime: '7:45 AM',
      actualTime: '7:50 AM',
      students: [
        { name: 'Michael Brown', status: 'picked' }
      ]
    }
  ],
  afternoon: [
    {
      name: 'Central Square',
      scheduledTime: '3:30 PM',
      actualTime: '3:35 PM',
      students: [
        { name: 'Michael Brown', status: 'dropped' }
      ]
    },
    {
      name: 'Green Park',
      scheduledTime: '3:45 PM',
      actualTime: '3:50 PM',
      students: [
        { name: 'John Smith', status: 'dropped' },
        { name: 'Emma Johnson', status: 'dropped' }
      ]
    }
  ]
};

export const TripHistory: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(DUMMY_HISTORY.date);

  return (
    <div className="flex-1 p-4">
      <div className="mb-6">
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Find
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Morning Trip */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Morning Trip</h2>
          <div className="space-y-6">
            {DUMMY_HISTORY.morning.map((stop, index) => (
              <div key={index} className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
                <div className="relative flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-2">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{stop.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock size={16} className="mr-1" />
                      <span>Scheduled: {stop.scheduledTime}</span>
                      <span className="mx-2">•</span>
                      <span>Actual: {stop.actualTime}</span>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-sm font-medium mb-1">Students:</p>
                      {stop.students.map((student, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {student.name} - {student.status}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Afternoon Trip */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Afternoon Trip</h2>
          <div className="space-y-6">
            {DUMMY_HISTORY.afternoon.map((stop, index) => (
              <div key={index} className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
                <div className="relative flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-2">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{stop.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock size={16} className="mr-1" />
                      <span>Scheduled: {stop.scheduledTime}</span>
                      <span className="mx-2">•</span>
                      <span>Actual: {stop.actualTime}</span>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-sm font-medium mb-1">Students:</p>
                      {stop.students.map((student, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {student.name} - {student.status}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};