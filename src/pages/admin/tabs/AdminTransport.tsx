import React, { useState } from 'react';
import { Bus, Plus, MapPin, X } from 'lucide-react';

interface BusRoute {
  id: string;
  busNumber: string;
  routeNumber: string;
  driver: {
    name: string;
    contact: string;
  };
  assistant: {
    name: string;
    contact: string;
  };
  capacity: number;
  registeredStudents: number;
  status: 'on-duty' | 'off-duty' | 'cancelled';
  stops: {
    name: string;
    pickupTime: string;
    dropTime: string;
    students: number;
  }[];
}

const DUMMY_ROUTES: BusRoute[] = [
  {
    id: '1',
    busNumber: 'BUS001',
    routeNumber: 'R1',
    driver: {
      name: 'John Doe',
      contact: '+1234567890'
    },
    assistant: {
      name: 'Jane Smith',
      contact: '+1234567891'
    },
    capacity: 40,
    registeredStudents: 35,
    status: 'on-duty',
    stops: [
      { name: 'Green Park', pickupTime: '7:30 AM', dropTime: '4:00 PM', students: 10 },
      { name: 'Central Square', pickupTime: '7:45 AM', dropTime: '3:45 PM', students: 15 },
      { name: 'Market Place', pickupTime: '8:00 AM', dropTime: '3:30 PM', students: 10 }
    ]
  },
  {
    id: '2',
    busNumber: 'BUS002',
    routeNumber: 'R2',
    driver: {
      name: 'Robert Wilson',
      contact: '+1234567892'
    },
    assistant: {
      name: 'Sarah Thompson',
      contact: '+1234567893'
    },
    capacity: 40,
    registeredStudents: 30,
    status: 'on-duty',
    stops: [
      { name: 'Hill View', pickupTime: '7:30 AM', dropTime: '4:00 PM', students: 12 },
      { name: 'River Side', pickupTime: '7:45 AM', dropTime: '3:45 PM', students: 8 },
      { name: 'Town Hall', pickupTime: '8:00 AM', dropTime: '3:30 PM', students: 10 }
    ]
  }
];

export const AdminTransport: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transport Routes</h2>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Add New Route</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {DUMMY_ROUTES.map(route => (
          <button
            key={route.id}
            onClick={() => setSelectedRoute(route)}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow"
          >
            <Bus size={32} className="text-blue-500 mb-2" />
            <h3 className="font-semibold">Route {route.routeNumber}</h3>
            <p className="text-sm text-gray-600">Bus {route.busNumber}</p>
          </button>
        ))}
      </div>

      {/* Route Details Popup */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Route Details</h2>
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Bus Information</h3>
                  <p>Bus Number: {selectedRoute.busNumber}</p>
                  <p>Route Number: {selectedRoute.routeNumber}</p>
                  <p>Status: {selectedRoute.status}</p>
                  <p>Capacity: {selectedRoute.registeredStudents}/{selectedRoute.capacity}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Staff</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">Driver</p>
                      <p>{selectedRoute.driver.name}</p>
                      <p className="text-sm text-blue-600">{selectedRoute.driver.contact}</p>
                    </div>
                    <div>
                      <p className="font-medium">Assistant</p>
                      <p>{selectedRoute.assistant.name}</p>
                      <p className="text-sm text-blue-600">{selectedRoute.assistant.contact}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Route Stops</h3>
                  <div className="space-y-4">
                    {selectedRoute.stops.map((stop, index) => (
                      <div key={index} className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200" />
                        <div className="relative flex items-start space-x-4">
                          <div className="bg-blue-500 rounded-full p-2">
                            <MapPin size={20} className="text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{stop.name}</h4>
                            <p className="text-sm text-gray-600">
                              Pickup: {stop.pickupTime} • Drop: {stop.dropTime}
                            </p>
                            <p className="text-sm text-gray-600">
                              {stop.students} students
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};