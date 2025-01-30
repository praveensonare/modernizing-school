import React, { useState } from 'react';
import { Circle, CheckSquare } from 'lucide-react';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';

interface Station {
  id: number;
  name: string;
  scheduledTime: string;
  actualTime?: string;
  status: 'passed' | 'next' | 'upcoming';
  students: { id: number; name: string; picked: boolean; }[];
}

export default function TripStart() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'students'>('ongoing');
  const [stations, setStations] = useState<Station[]>([
    {
      id: 1,
      name: 'Green Valley',
      scheduledTime: '7:30 AM',
      actualTime: '7:32 AM',
      status: 'passed',
      students: [
        { id: 1, name: 'John Smith', picked: true },
        { id: 2, name: 'Emma Wilson', picked: true }
      ]
    },
    {
      id: 2,
      name: 'Riverside Park',
      scheduledTime: '7:40 AM',
      actualTime: '7:41 AM',
      status: 'passed',
      students: [
        { id: 3, name: 'Oliver Brown', picked: true }
      ]
    },
    {
      id: 3,
      name: 'Oak Street',
      scheduledTime: '7:50 AM',
      status: 'next',
      students: [
        { id: 4, name: 'Sophia Davis', picked: false },
        { id: 5, name: 'William Taylor', picked: false }
      ]
    },
    {
      id: 4,
      name: 'Maple Avenue',
      scheduledTime: '8:00 AM',
      status: 'upcoming',
      students: [
        { id: 6, name: 'Isabella Martinez', picked: false }
      ]
    },
    {
      id: 5,
      name: 'Pine Heights',
      scheduledTime: '8:10 AM',
      status: 'upcoming',
      students: [
        { id: 7, name: 'James Johnson', picked: false },
        { id: 8, name: 'Mia Anderson', picked: false }
      ]
    },
    {
      id: 6,
      name: 'Cedar Lane',
      scheduledTime: '8:20 AM',
      status: 'upcoming',
      students: [
        { id: 9, name: 'Lucas Garcia', picked: false }
      ]
    },
    {
      id: 7,
      name: 'Birch Road',
      scheduledTime: '8:30 AM',
      status: 'upcoming',
      students: [
        { id: 10, name: 'Ava Thompson', picked: false }
      ]
    },
    {
      id: 8,
      name: 'Elm Street',
      scheduledTime: '8:40 AM',
      status: 'upcoming',
      students: [
        { id: 11, name: 'Ethan Moore', picked: false }
      ]
    },
    {
      id: 9,
      name: 'School',
      scheduledTime: '8:50 AM',
      status: 'upcoming',
      students: []
    }
  ]);

  const handleStudentStatus = (stationId: number, studentId: number) => {
    setStations(stations.map(station => {
      if (station.id === stationId) {
        return {
          ...station,
          students: station.students.map(student => 
            student.id === studentId 
              ? { ...student, picked: !student.picked }
              : student
          )
        };
      }
      return station;
    }));
  };

  const handleSelectAll = (stationId: number, selected: boolean) => {
    setStations(stations.map(station => {
      if (station.id === stationId) {
        return {
          ...station,
          students: station.students.map(student => ({
            ...student,
            picked: selected
          }))
        };
      }
      return station;
    }));
  };

  const handleUpdateStatus = (stationId: number) => {
    // Here you would typically make an API call to update the status
    setStations(stations.map(station => {
      if (station.id === stationId) {
        return {
          ...station,
          status: 'passed',
          actualTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      if (station.id === stationId + 1) {
        return {
          ...station,
          status: 'next'
        };
      }
      return station;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16 pt-16">
      <Header />
      
      <div className="flex border-b bg-white">
        <button
          className={`flex-1 py-3 ${activeTab === 'ongoing' ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing Trip
        </button>
        <button
          className={`flex-1 py-3 ${activeTab === 'students' ? 'border-b-2 border-blue-600' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'ongoing' ? (
          <div className="space-y-4">
            {stations.map((station, index) => (
              <div key={station.id} className="relative">
                {index !== stations.length - 1 && (
                  <div className="absolute top-6 left-3 w-0.5 h-full bg-gray-300" />
                )}
                
                <div className="flex items-start space-x-4">
                  <Circle 
                    className={`w-6 h-6 z-10 ${
                      station.status === 'passed' ? 'text-gray-400' :
                      station.status === 'next' ? 'text-orange-500 fill-current' :
                      'text-green-500'
                    }`}
                  />
                  
                  <div className="flex-1 bg-white rounded-lg p-4 shadow">
                    <h3 className="font-semibold">{station.name}</h3>
                    <p className="text-sm text-gray-500">
                      Scheduled: {station.scheduledTime}
                      {station.actualTime && ` • Actual: ${station.actualTime}`}
                    </p>
                    
                    {station.status === 'next' && station.students.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Students</h4>
                          <button
                            onClick={() => handleSelectAll(station.id, !station.students.every(s => s.picked))}
                            className="text-sm text-blue-600 flex items-center gap-1"
                          >
                            <CheckSquare className="w-4 h-4" />
                            {station.students.every(s => s.picked) ? 'Unselect All' : 'Select All'}
                          </button>
                        </div>
                        {station.students.map(student => (
                          <div key={student.id} className="flex items-center space-x-2 mb-2">
                            <input
                              type="checkbox"
                              checked={student.picked}
                              onChange={() => handleStudentStatus(station.id, student.id)}
                            />
                            <span>{student.name}</span>
                          </div>
                        ))}
                        <button
                          onClick={() => handleUpdateStatus(station.id)}
                          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                          Update Status
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-4 shadow">
            {stations.map(station => (
              station.students.length > 0 && !station.students.every(s => s.picked) && (
                <div key={station.id} className="mb-4">
                  <h3 className="font-medium mb-2">{station.name}</h3>
                  {station.students.filter(s => !s.picked).map(student => (
                    <div key={student.id} className="flex items-center space-x-2 py-2 pl-4">
                      <input
                        type="checkbox"
                        checked={student.picked}
                        onChange={() => handleStudentStatus(station.id, student.id)}
                      />
                      <span>{student.name}</span>
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}