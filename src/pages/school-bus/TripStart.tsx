import React, { useState, useEffect } from 'react';
import { Circle, CheckSquare, SkipForward, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';

interface Student {
  id: number;
  name: string;
  onLeave: boolean;
  picked?: boolean;
}

interface Station {
  id: number;
  name: string;
  scheduledTime: string;
  actualTime?: string;
  status: 'passed' | 'next' | 'upcoming';
  students: Student[];
  location: { lat: number; lng: number; };
}

export default function TripStart() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'students'>('ongoing');
  const [tripType, setTripType] = useState<'pick' | 'drop'>('pick');
  const [stations, setStations] = useState<Station[]>([
    {
      id: 1,
      name: 'Green Valley',
      scheduledTime: '7:30 AM',
      actualTime: '7:32 AM',
      status: 'passed',
      location: { lat: 40.7128, lng: -74.0060 },
      students: [
        { id: 1, name: 'John Smith', onLeave: true },
        { id: 2, name: 'Emma Wilson', onLeave: false }
      ]
    },
    {
      id: 2,
      name: 'Riverside Park',
      scheduledTime: '7:40 AM',
      actualTime: '7:41 AM',
      status: 'passed',
      location: { lat: 40.7129, lng: -74.0061 },
      students: [
        { id: 3, name: 'Oliver Brown', onLeave: false },
        { id: 4, name: 'Sophia Davis', onLeave: true }
      ]
    },
    {
      id: 3,
      name: 'Oak Street',
      scheduledTime: '7:50 AM',
      status: 'next',
      location: { lat: 40.7130, lng: -74.0062 },
      students: [
        { id: 5, name: 'William Taylor', onLeave: false },
        { id: 6, name: 'Isabella Martinez', onLeave: false }
      ]
    },
    {
      id: 4,
      name: 'Maple Avenue',
      scheduledTime: '8:00 AM',
      status: 'upcoming',
      location: { lat: 40.7131, lng: -74.0063 },
      students: [
        { id: 7, name: 'James Johnson', onLeave: true },
        { id: 8, name: 'Mia Anderson', onLeave: false }
      ]
    },
    {
      id: 5,
      name: 'Pine Heights',
      scheduledTime: '8:10 AM',
      status: 'upcoming',
      location: { lat: 40.7132, lng: -74.0064 },
      students: [
        { id: 9, name: 'Lucas Garcia', onLeave: false },
        { id: 10, name: 'Ava Thompson', onLeave: false }
      ]
    },
    {
      id: 6,
      name: 'Cedar Lane',
      scheduledTime: '8:20 AM',
      status: 'upcoming',
      location: { lat: 40.7133, lng: -74.0065 },
      students: [
        { id: 11, name: 'Ethan Moore', onLeave: true },
        { id: 12, name: 'Charlotte Lee', onLeave: false }
      ]
    },
    {
      id: 7,
      name: 'Birch Road',
      scheduledTime: '8:30 AM',
      status: 'upcoming',
      location: { lat: 40.7134, lng: -74.0066 },
      students: [
        { id: 13, name: 'Alexander Wright', onLeave: false },
        { id: 14, name: 'Amelia King', onLeave: false }
      ]
    },
    {
      id: 8,
      name: 'Elm Street',
      scheduledTime: '8:40 AM',
      status: 'upcoming',
      location: { lat: 40.7135, lng: -74.0067 },
      students: [
        { id: 15, name: 'Henry Scott', onLeave: true },
        { id: 16, name: 'Victoria Adams', onLeave: false }
      ]
    },
    {
      id: 9,
      name: 'School',
      scheduledTime: '8:50 AM',
      status: 'upcoming',
      location: { lat: 40.7136, lng: -74.0068 },
      students: []
    }
  ]);

  useEffect(() => {
    const savedTripType = localStorage.getItem('tripType');
    if (savedTripType === 'pick' || savedTripType === 'drop') {
      setTripType(savedTripType);
    }
  }, []);

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
            picked: selected && !student.onLeave
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

  const handleSkipStation = (stationId: number) => {
    setStations(stations.map(station => {
      if (station.id === stationId) {
        return {
          ...station,
          status: 'passed',
          actualTime: 'Skipped'
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

  const handleFinishTrip = () => {
    localStorage.removeItem('ongoingTrip');
    localStorage.removeItem('tripType');
    navigate('/school-bus/trip');
  };

  const currentStation = stations.find(s => s.status === 'next');
  const activeStudents = stations.flatMap(station => 
    station.students.filter(student => !student.onLeave && !student.picked)
  );

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
        {activeTab === 'ongoing' && (
          <>
            {currentStation && (
              <div className="mb-4 bg-white rounded-lg shadow overflow-hidden">
                <iframe
                  width="100%"
                  height="200"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${currentStation.location.lat},${currentStation.location.lng}`}
                  allowFullScreen
                ></iframe>
              </div>
            )}

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
                      
                      {station.status === 'next' && (
                        <div className="mt-4">
                          {station.students.filter(s => !s.onLeave).length > 0 && (
                            <>
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
                              {station.students
                                .filter(student => !student.onLeave)
                                .map(student => (
                                  <div key={student.id} className="flex items-center space-x-2 mb-2">
                                    <input
                                      type="checkbox"
                                      checked={student.picked}
                                      onChange={() => handleStudentStatus(station.id, student.id)}
                                    />
                                    <span>{student.name}</span>
                                  </div>
                              ))}
                            </>
                          )}
                          <div className="flex gap-2 mt-3">
                            {station.id === stations.length ? (
                              <button
                                onClick={handleFinishTrip}
                                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2"
                              >
                                <Flag className="w-4 h-4" />
                                Complete Trip
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(station.id)}
                                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                >
                                  {tripType === 'pick' ? 'Pick' : 'Drop'}
                                </button>
                                <button
                                  onClick={() => handleSkipStation(station.id)}
                                  className="flex items-center gap-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                >
                                  <SkipForward className="w-4 h-4" />
                                  Skip
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === 'students' && (
          <div className="bg-white rounded-lg p-4 shadow">
            {stations.map(station => {
              const activeStudents = station.students.filter(s => !s.onLeave && !s.picked);
              return activeStudents.length > 0 && (
                <div key={station.id} className="mb-4">
                  <h3 className="font-medium mb-2">{station.name}</h3>
                  {activeStudents.map(student => (
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
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}