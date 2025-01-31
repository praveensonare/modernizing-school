import React, { useEffect } from 'react';
import { Bus, User, Users } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { cn } from '../../lib/utils';

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

export function AdminHome() {
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
      version: 'weekly',
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: 12.9716, lng: 77.5946 },
        zoom: 12,
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

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-semibold">Route ${route.routeNumber}</h3>
                <p>Bus: ${route.busNumber}</p>
                <p>Driver: ${route.driver.name}</p>
                <p>Phone: ${route.driver.phone}</p>
              </div>
            `,
          });

          marker.addListener('mouseover', () => {
            infoWindow.open(map, marker);
          });

          marker.addListener('mouseout', () => {
            infoWindow.close();
          });
        }
      });
    });
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
                  Class {checkIn.class}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {checkIn.checkInTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
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
          <div id="map" className="w-full h-[500px] rounded-lg"></div>
        </div>

        {/* Bus Routes */}
        <div className="grid grid-cols-4 gap-4">
          {busRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}