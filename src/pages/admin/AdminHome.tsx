import React, { useEffect, useRef, useState } from 'react';
import { Bus, User, Users, X, Phone, MessageSquare } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { cn, formatTime } from '../../lib/utils';

interface RecentCheckIn {
  id: string;
  name: string;
  photo: string;
  class: string;
  checkInTime: Date;
  droppedBy: 'bus' | 'parent' | 'self';
}

interface BusRoute {
  id: string;
  routeNumber: string;
  capacity: number;
  registered: number;
  status: 'OTW' | 'Destination';
  busNumber: string;
  driver: {
    name: string;
    phone: string;
    whatsapp: string;
  };
  assistant: {
    name: string;
    phone: string;
    whatsapp: string;
  };
  currentLocation?: {
    lat: number;
    lng: number;
  };
  lastKnownLocation: string;
}

const recentCheckIns: RecentCheckIn[] = [
  {
    id: '1',
    name: 'John Smith',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1',
    class: '10A',
    checkInTime: new Date(),
    droppedBy: 'bus',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    class: '9B',
    checkInTime: new Date(Date.now() - 5 * 60000),
    droppedBy: 'parent',
  },
  {
    id: '3',
    name: 'Michael Brown',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    class: '11A',
    checkInTime: new Date(Date.now() - 10 * 60000),
    droppedBy: 'self',
  },
];

const busRoutes: BusRoute[] = [
  {
    id: '1',
    routeNumber: 'R101',
    capacity: 40,
    registered: 35,
    status: 'OTW',
    busNumber: 'KA01AB1234',
    driver: {
      name: 'David Johnson',
      phone: '+1234567890',
      whatsapp: '+1234567890',
    },
    assistant: {
      name: 'Sarah Wilson',
      phone: '+1234567891',
      whatsapp: '+1234567891',
    },
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
    },
    lastKnownLocation: 'Central Park, Main Road',
  },
  {
    id: '2',
    routeNumber: 'R102',
    capacity: 35,
    registered: 30,
    status: 'Destination',
    busNumber: 'KA01CD5678',
    driver: {
      name: 'Robert Smith',
      phone: '+1234567892',
      whatsapp: '+1234567892',
    },
    assistant: {
      name: 'Mary Brown',
      phone: '+1234567893',
      whatsapp: '+1234567893',
    },
    currentLocation: {
      lat: 12.9815,
      lng: 77.5968,
    },
    lastKnownLocation: 'School Campus',
  },
];

export function AdminHome() {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
      version: 'weekly',
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: 12.9716, lng: 77.5946 },
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Add bus markers
      busRoutes.forEach(route => {
        if (route.currentLocation) {
          const marker = new google.maps.Marker({
            position: route.currentLocation,
            map,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/bus.png',
              scaledSize: new google.maps.Size(32, 32),
            },
            title: `Route ${route.routeNumber}`,
          });
        }
      });
    });

    // Handle click outside popup
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedRoute(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Recent Check-ins */}
      <div className="col-span-4 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Check-ins</h2>
        <div className="space-y-4">
          {recentCheckIns.map((checkIn) => (
            <div
              key={checkIn.id}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={checkIn.photo}
                alt={checkIn.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{checkIn.name}</h3>
                <p className="text-sm text-gray-500">
                  {checkIn.class}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {formatTime(checkIn.checkInTime)}
                </p>
                <div className="mt-1">
                  {checkIn.droppedBy === 'bus' && <Bus size={20} className="text-blue-600" />}
                  {checkIn.droppedBy === 'parent' && <Users size={20} className="text-green-600" />}
                  {checkIn.droppedBy === 'self' && <User size={20} className="text-purple-600" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map and Bus Routes */}
      <div className="col-span-8 space-y-6">
        {/* Google Map */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div id="map" className="w-full h-[400px] rounded-lg"></div>
        </div>

        {/* Bus Routes */}
        <div className="grid grid-cols-2 gap-4">
          {busRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRoute(route)}
            >
              <div className="flex p-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
                    alt="Bus"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Route {route.routeNumber}</h3>
                      <p className="text-sm text-gray-500">Bus: {route.busNumber}</p>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs',
                        route.status === 'OTW'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      )}
                    >
                      {route.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {route.registered}/{route.capacity} Students
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Route Details Popup */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-start z-50">
          <div
            ref={popupRef}
            className="bg-white w-full max-w-md m-4 rounded-lg shadow-xl"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Route Details</h2>
              <button
                onClick={() => setSelectedRoute(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-medium text-lg">Route Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">Route Number: {selectedRoute.routeNumber}</p>
                  <p className="text-gray-600">Bus Number: {selectedRoute.busNumber}</p>
                  <p className="text-gray-600">
                    Students: {selectedRoute.registered}/{selectedRoute.capacity}
                  </p>
                  <p className="text-gray-600">Last Known Location: {selectedRoute.lastKnownLocation}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg">Driver</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">{selectedRoute.driver.name}</p>
                  <div className="flex gap-4">
                    <a
                      href={`tel:${selectedRoute.driver.phone}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Phone size={16} />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${selectedRoute.driver.whatsapp.replace(/\+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >
                      <MessageSquare size={16} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg">Assistant</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">{selectedRoute.assistant.name}</p>
                  <div className="flex gap-4">
                    <a
                      href={`tel:${selectedRoute.assistant.phone}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Phone size={16} />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${selectedRoute.assistant.whatsapp.replace(/\+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >
                      <MessageSquare size={16} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/admin/transport/route`)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Route
                </button>
                <button
                  onClick={() => navigate(`/admin/transport/history`)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}