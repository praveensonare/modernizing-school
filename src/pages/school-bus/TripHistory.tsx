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
    students: { name: string; }[];
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
            { name: 'John Smith' },
            { name: 'Emma Wilson' }
          ]
        },
        {
          name: 'Riverside Park',
          scheduledTime: '7:40 AM',
          actualTime: '7:41 AM',
          students: [
            { name: 'Oliver Brown' }
          ]
        },
        {
          name: 'Oak Street',
          scheduledTime: '7:50 AM',
          actualTime: '7:52 AM',
          students: [
            { name: 'Sophia Davis' },
            { name: 'William Taylor' }
          ]
        }
      ]
    },
    {
      id: 2,
      type: 'drop',
      date: '2024-03-10',
      stations: [
        {
          name: 'Oak Street',
          scheduledTime: '3:20 PM',
          actualTime: '3:25 PM',
          students: [
            { name: 'Sophia Davis' },
            { name: 'William Taylor' }
          ]
        },
        {
          name: 'Riverside Park',
          scheduledTime: '3:30 PM',
          actualTime: '3:35 PM',
          students: [
            { name: 'Oliver Brown' }
          ]
        },
        {
          name: 'Green Valley',
          scheduledTime: '3:40 PM',
          actualTime: '3:45 PM',
          students: [
            { name: 'John Smith' },
            { name: 'Emma Wilson' }
          ]
        }
      ]
    }
  ]);

  const handleFind = () => {
    console.log('Fetching history for:', selectedDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-16 pt-16">
      <Header />
      
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100 mb-4">
          <div className="flex space-x-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleFind}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-lg
                       hover:from-indigo-700 hover:to-violet-700 transition-all duration-200"
            >
              Find
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {tripHistory.map(trip => (
            <div key={trip.id} className="bg-white rounded-xl shadow-lg border border-slate-100">
              <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {trip.type === 'pick' ? 'Morning Pick-up' : 'Afternoon Drop-off'} Trip
                  </h3>
                  <p className="text-sm text-slate-500">{trip.date}</p>
                </div>
                {expandedTrip === trip.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </div>

              {expandedTrip === trip.id && (
                <div className="border-t border-slate-100 px-4 py-2">
                  {trip.stations.map((station, index) => (
                    <div key={index} className="py-3 border-b border-slate-100 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-700">{station.name}</h4>
                        <div className="text-sm">
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                            {station.scheduledTime}
                          </span>
                          <span className="mx-2 text-slate-400">•</span>
                          <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded">
                            {station.actualTime}
                          </span>
                        </div>
                      </div>
                      {station.students.length > 0 && (
                        <details className="mt-2">
                          <summary className="text-sm text-indigo-600 cursor-pointer hover:text-indigo-700">
                            Students ({station.students.length})
                          </summary>
                          <div className="mt-2 pl-4 space-y-1">
                            {station.students.map((student, idx) => (
                              <p key={idx} className="text-sm text-slate-600">
                                {student.name}
                              </p>
                            ))}
                          </div>
                        </details>
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