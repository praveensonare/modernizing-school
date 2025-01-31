import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Plus, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface BusRoute {
  id: string;
  routeNumber: string;
  capacity: number;
  registered: number;
  status: 'on-duty' | 'off-duty';
  busNumber: string;
  driver: {
    name: string;
    phone: string;
  };
  assistant: {
    name: string;
    phone: string;
  };
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

const dummyRoutes: BusRoute[] = [
  {
    id: '1',
    routeNumber: 'R101',
    capacity: 40,
    registered: 35,
    status: 'on-duty',
    busNumber: 'KA01AB1234',
    driver: {
      name: 'David Johnson',
      phone: '+1234567890',
    },
    assistant: {
      name: 'Sarah Wilson',
      phone: '+1234567891',
    },
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
    },
  },
  {
    id: '2',
    routeNumber: 'R102',
    capacity: 35,
    registered: 30,
    status: 'on-duty',
    busNumber: 'KA01CD5678',
    driver: {
      name: 'Robert Smith',
      phone: '+1234567892',
    },
    assistant: {
      name: 'Mary Brown',
      phone: '+1234567893',
    },
    currentLocation: {
      lat: 12.9815,
      lng: 77.5968,
    },
  },
];

interface Station {
  name: string;
  pickupTime: string;
  dropoffTime: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface NewRouteForm {
  driverName: string;
  driverContact: string;
  assistantName: string;
  assistantContact: string;
  routeNumber: string;
  busNumber: string;
  capacity: number;
  schoolName: string;
  stations: Station[];
}

const initialFormState: NewRouteForm = {
  driverName: '',
  driverContact: '',
  assistantName: '',
  assistantContact: '',
  routeNumber: '',
  busNumber: '',
  capacity: 40,
  schoolName: '',
  stations: [],
};

export function Transport() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<BusRoute[]>(dummyRoutes);
  const [showNewRouteForm, setShowNewRouteForm] = useState(false);
  const [formData, setFormData] = useState<NewRouteForm>(initialFormState);
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  const handleAddStation = () => {
    setFormData(prev => ({
      ...prev,
      stations: [
        ...prev.stations,
        {
          name: '',
          pickupTime: '',
          dropoffTime: '',
          location: { lat: 0, lng: 0 },
        },
      ],
    }));
  };

  const handleRemoveStation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stations: prev.stations.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the new route
    setShowNewRouteForm(false);
    setFormData(initialFormState);
  };

  const handleRouteClick = (routeId: string) => {
    setExpandedRoute(expandedRoute === routeId ? null : routeId);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Transport Routes</h1>
        <button
          onClick={() => setShowNewRouteForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          New Route
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className={cn(
              'bg-white rounded-lg shadow-sm transition-all',
              expandedRoute === route.id ? 'col-span-3' : ''
            )}
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => handleRouteClick(route.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <Bus className="text-blue-600" />
                <h3 className="font-medium">Route {route.routeNumber}</h3>
              </div>
              <p className="text-sm text-gray-500">
                {route.registered}/{route.capacity} Students
              </p>
              <span
                className={cn(
                  'inline-block px-2 py-1 rounded-full text-xs mt-2',
                  route.status === 'on-duty'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                )}
              >
                {route.status === 'on-duty' ? 'On Duty' : 'Off Duty'}
              </span>

              {expandedRoute === route.id && (
                <div className="mt-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Bus Details</h4>
                      <p className="text-sm text-gray-600">
                        Bus Number: {route.busNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Capacity: {route.capacity}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Staff</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Driver</p>
                          <p className="text-sm text-gray-600">
                            {route.driver.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {route.driver.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Assistant</p>
                          <p className="text-sm text-gray-600">
                            {route.assistant.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {route.assistant.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={() => navigate(`/admin/transport/route`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Route
                    </button>
                    <button
                      onClick={() => navigate(`/admin/transport/history`)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      History
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showNewRouteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Create New Route</h2>
              <button
                onClick={() => setShowNewRouteForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    value={formData.driverName}
                    onChange={(e) =>
                      setFormData({ ...formData, driverName: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Driver Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.driverContact}
                    onChange={(e) =>
                      setFormData({ ...formData, driverContact: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assistant Name
                  </label>
                  <input
                    type="text"
                    value={formData.assistantName}
                    onChange={(e) =>
                      setFormData({ ...formData, assistantName: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assistant Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.assistantContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assistantContact: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Route Number
                  </label>
                  <input
                    type="text"
                    value={formData.routeNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, routeNumber: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bus Number
                  </label>
                  <input
                    type="text"
                    value={formData.busNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, busNumber: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School
                  </label>
                  <select
                    value={formData.schoolName}
                    onChange={(e) =>
                      setFormData({ ...formData, schoolName: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select School</option>
                    <option value="school1">International School</option>
                    <option value="school2">Global Academy</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Stations</h3>
                  <button
                    type="button"
                    onClick={handleAddStation}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={16} />
                    Add Station
                  </button>
                </div>

                {formData.stations.map((station, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 mb-4 items-start"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Station Name
                      </label>
                      <input
                        type="text"
                        value={station.name}
                        onChange={(e) => {
                          const newStations = [...formData.stations];
                          newStations[index].name = e.target.value;
                          setFormData({ ...formData, stations: newStations });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Pickup Time
                      </label>
                      <input
                        type="time"
                        value={station.pickupTime}
                        onChange={(e) => {
                          const newStations = [...formData.stations];
                          newStations[index].pickupTime = e.target.value;
                          setFormData({ ...formData, stations: newStations });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Drop-off Time
                      </label>
                      <input
                        type="time"
                        value={station.dropoffTime}
                        onChange={(e) => {
                          const newStations = [...formData.stations];
                          newStations[index].dropoffTime = e.target.value;
                          setFormData({ ...formData, stations: newStations });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveStation(index)}
                        className="mb-1 p-2 text-red-600 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewRouteForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}