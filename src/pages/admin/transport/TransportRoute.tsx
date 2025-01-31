import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  arrivalTime: string;
  departureTime: string;
  students: {
    id: string;
    name: string;
    grade: string;
    photo: string;
  }[];
}

const dummyStations: Station[] = [
  {
    id: '1',
    name: 'Central Park',
    arrivalTime: '07:30',
    departureTime: '07:35',
    students: [
      {
        id: '1',
        name: 'John Smith',
        grade: '10A',
        photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1',
      },
      {
        id: '2',
        name: 'Emma Wilson',
        grade: '9B',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      },
    ],
  },
  {
    id: '2',
    name: 'Market Square',
    arrivalTime: '07:45',
    departureTime: '07:50',
    students: [
      {
        id: '3',
        name: 'Sarah Johnson',
        grade: '11A',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      },
    ],
  },
];

export function TransportRoute() {
  const navigate = useNavigate();
  const [expandedStation, setExpandedStation] = React.useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Route R101</h1>
          <p className="mt-2 text-gray-600">
            Morning Route: School to Destination
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/transport')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back to Routes
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200" />

        <div className="space-y-6">
          {dummyStations.map((station) => (
            <div key={station.id} className="relative">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin className="text-blue-600" />
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-sm">
                  <div
                    className="p-4 cursor-pointer flex items-center justify-between"
                    onClick={() =>
                      setExpandedStation(
                        expandedStation === station.id ? null : station.id
                      )
                    }
                  >
                    <div>
                      <h3 className="font-medium">{station.name}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>
                          Arrival: {station.arrivalTime} | Departure:{' '}
                          {station.departureTime}
                        </p>
                        <p>{station.students.length} students</p>
                      </div>
                    </div>
                    {expandedStation === station.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>

                  {expandedStation === station.id && (
                    <div className="border-t border-gray-100">
                      {station.students.map((student) => (
                        <div
                          key={student.id}
                          className="p-4 flex items-center gap-4 hover:bg-gray-50"
                        >
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-gray-500">
                              Grade: {student.grade}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}