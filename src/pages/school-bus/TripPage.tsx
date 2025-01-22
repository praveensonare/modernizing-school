import React, { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';

interface Stop {
  name: string;
  pickupTime: string;
  dropTime: string;
  students: Student[];
}

interface Student {
  id: string;
  name: string;
  selected: boolean;
}

const DUMMY_STOPS: Stop[] = [
  {
    name: 'Green Park',
    pickupTime: '7:30 AM',
    dropTime: '3:30 PM',
    students: [
      { id: '1', name: 'John Smith', selected: false },
      { id: '2', name: 'Emma Johnson', selected: false }
    ]
  },
  {
    name: 'Central Square',
    pickupTime: '7:45 AM',
    dropTime: '3:45 PM',
    students: [
      { id: '3', name: 'Michael Brown', selected: false },
      { id: '4', name: 'Sarah Wilson', selected: false }
    ]
  }
];

export const TripPage: React.FC = () => {
  const [tripType, setTripType] = useState<'pick' | 'drop' | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'ongoing' | 'students'>('ongoing');
  const [stops, setStops] = useState(DUMMY_STOPS);

  const handleStudentSelect = (stopIndex: number, studentId: string) => {
    setStops(stops.map((stop, index) => {
      if (index === stopIndex) {
        return {
          ...stop,
          students: stop.students.map(student =>
            student.id === studentId ? { ...student, selected: !student.selected } : student
          )
        };
      }
      return stop;
    }));
  };

  if (!tripType) {
    return (
      <div className="flex-1 p-4 space-y-6">
        <h2 className="text-xl font-bold text-center">Select Trip Type</h2>
        <div className="space-y-4">
          <button
            onClick={() => setTripType('pick')}
            className="w-full py-3 bg-blue-500 text-white rounded-lg"
          >
            Pick
          </button>
          <button
            onClick={() => setTripType('drop')}
            className="w-full py-3 bg-blue-500 text-white rounded-lg"
          >
            Drop
          </button>
        </div>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        <button
          onClick={() => setIsStarted(true)}
          className="px-8 py-4 bg-green-500 text-white rounded-lg text-lg font-semibold"
        >
          Start Trip
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`flex-1 py-2 text-center ${
            activeTab === 'ongoing'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          Ongoing Trip
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`flex-1 py-2 text-center ${
            activeTab === 'students'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          Students
        </button>
      </div>

      {activeTab === 'ongoing' ? (
        <div className="space-y-8">
          {stops.map((stop, index) => (
            <div key={index} className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
              <div className="relative flex items-start space-x-4">
                <div className="bg-blue-500 rounded-full p-2">
                  <MapPin size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{stop.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span>{tripType === 'pick' ? stop.pickupTime : stop.dropTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {stops.map((stop, stopIndex) => (
            <div key={stopIndex} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">{stop.name}</h3>
              {stop.students.map(student => (
                <div
                  key={student.id}
                  className="flex items-center space-x-3 py-2 border-b last:border-0"
                >
                  <input
                    type="checkbox"
                    checked={student.selected}
                    onChange={() => handleStudentSelect(stopIndex, student.id)}
                  />
                  <span>{student.name}</span>
                </div>
              ))}
            </div>
          ))}
          <button className="w-full py-3 bg-green-500 text-white rounded-lg">
            {tripType === 'pick' ? 'Mark Picked' : 'Mark Dropped'}
          </button>
        </div>
      )}
    </div>
  );
};