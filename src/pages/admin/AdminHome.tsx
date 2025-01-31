

import React, { useEffect } from 'react';
import { Bus, User, Users } from 'lucide-react';
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
  return (
    <div className="grid grid-cols-12 gap-6">
      
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14683.264204204204!2d75.857725!3d22.719568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc1c5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sIndore%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1616161616161!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
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

