import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';

interface TripHistory {
  id: number;
  type: 'pick' | 'drop';
  date: string;
  stations: {
    name: string;
    scheduledTime: string;
    actualTime: string;
    students: { name: string; status: 'picked' | 'dropped' }[];
  }[];
}

export default function History() {
  const [selectedDate, setSelectedDate] = useState('');
  const [expandedTrip, setExpandedTrip] = useState<number | null>(null);
  const [tripHistory, setTripHistory] = useState<TripHistory[]>([
    {
      id: 1,
      type: 'pick',
      date: '2024-03-10',
      stations: [
        {
          name: 'Green Valley',
          scheduledTime: '7:30 AM',
          actualTime: '7:32 AM',
          students: [
            { name: 'John Smith', status: 'picked' },
            { name: 'Emma Wilson', status: 'picked' }
          ]
        },
        {
          name: 'Riverside Park',
          scheduledTime: '7:40 AM',
          actualTime: '7:41 AM',
          students: [
            { name: 'Oliver Brown', status: 'picked' }
          ]
        },
        {
          name: 'Oak Street',
          scheduledTime: '7:50 AM',
          actualTime: '7:52 AM',
          students: [
            { name: 'Sophia Davis', status: 'picked' },
            { name: 'William Taylor', status: 'picked' }
          ]
        },
        {
          name: 'School',
          scheduledTime: '8:50 AM',
          actualTime: '8:55 AM',
          students: []
        }
      ]
    },
    {
      id: 2,
      type: 'drop',
      date: '2024-03-10',
      stations: [
        {
          name: 'School',
          scheduledTime: '3:00 PM',
          actualTime: '3:05 PM',
          students: []
        },
        {
          name: 'Oak Street',
          scheduledTime: '3:20 PM',
          actualTime: '3:25 PM',
          students: [
            { name: 'Sophia Davis', status: 'dropped' },
            { name: 'William Taylor', status: 'dropped' }
          ]
        },
        {
          name: 'Riverside Park',
          scheduledTime: '3:30 PM',
          actualTime: '3:35 PM',
          students: [
            { name: 'Oliver Brown', status: 'dropped' }
          ]
        },
        {
          name: 'Green Valley',
          scheduledTime: '3:40 PM',
          actualTime: '3:45 PM',
          students: [
            { name: 'John Smith', status: 'dropped' },
            { name: 'Emma Wilson', status: 'dropped' }
          ]
        }
      ]
    }
  ]);

  const handleFind = () => {
    // Implement API call to fetch trip history for selected date
    console.log('Fetching history for:', selectedDate);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16 pt-16">
      <Header />
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow mb-4">
          <div className="flex space-x-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 border rounded p-2"
            />
            <button
              onClick={handleFind}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Find
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {tripHistory.map(trip => (
            <div key={trip.id} className="bg-white rounded-lg shadow">
              <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
              >
                <div>
                  <h3 className="font-semibold">
                    {trip.type === 'pick' ? 'Morning Pick-up' : 'Afternoon Drop-off'} Trip
                  </h3>
                  <p className="text-sm text-gray-500">{trip.date}</p>
                </div>
                {expandedTrip === trip.id ? <ChevronUp /> : <ChevronDown />}
              </div>

              {expandedTrip === trip.id && (
                <div className="border-t px-4 py-2">
                  {trip.stations.map((station, index) => (
                    <div key={index} className="py-2 border-b last:border-b-0">
                      <h4 className="font-medium">{station.name}</h4>
                      <p className="text-sm text-gray-600">
                        Scheduled: {station.scheduledTime} • 
                        Actual: {station.actualTime}
                      </p>
                      {station.students.length > 0 && (
                        <div className="mt-2 pl-4">
                          <p className="text-sm font-medium mb-1">Students:</p>
                          {station.students.map((student, idx) => (
                            <p key={idx} className="text-sm text-gray-600">
                              {student.name} - {student.status}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}