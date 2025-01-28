import React from 'react';
import { MapPin, Book, Bus as BusIcon, Phone, MessageSquare } from 'lucide-react';

interface Child {
  name: string;
  location: string;
  lastSeen: string;
  inSchool: boolean;
  class: string;
  busStatus: {
    boarded: boolean;
    routeNumber?: string;
    driver?: {
      name: string;
      phone: string;
    };
    assistant?: {
      name: string;
      phone: string;
    };
  };
}

const children: Child[] = [
  {
    name: 'John Doe',
    location: 'School Campus',
    lastSeen: '2 mins ago',
    inSchool: true,
    class: 'Grade 5-A',
    busStatus: {
      boarded: true,
      routeNumber: 'R-123',
      driver: {
        name: 'David Smith',
        phone: '+1234567890'
      },
      assistant: {
        name: 'Sarah Johnson',
        phone: '+1234567891'
      }
    }
  },
  // Add more children as needed
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Location Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <MapPin className="mr-2 text-blue-500" />
          Location Tracking
        </h2>
        <div className="aspect-video bg-gray-100 rounded-lg mb-4">
          {/* Google Maps integration would go here */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Google Maps Integration
          </div>
        </div>
        <div className="space-y-4">
          {children.map((child, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{child.name}</h3>
                <p className="text-sm text-gray-500">{child.location} • {child.lastSeen}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* School Status Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Book className="mr-2 text-green-500" />
          School Status
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {children.map((child, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{child.name}</h3>
                <span className={`h-3 w-3 rounded-full ${child.inSchool ? 'bg-green-500' : 'bg-red-500'}`} />
              </div>
              <p className="text-sm text-gray-500">{child.class}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transport Status Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BusIcon className="mr-2 text-yellow-500" />
          Transport Status
        </h2>
        <div className="space-y-6">
          {children.map((child, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">{child.name}</h3>
              {child.busStatus.boarded ? (
                <div className="space-y-3">
                  <p className="text-sm">Route Number: {child.busStatus.routeNumber}</p>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-sm font-medium">Driver</p>
                      <p className="text-sm">{child.busStatus.driver?.name}</p>
                      <div className="flex space-x-2 mt-1">
                        <a
                          href={`tel:${child.busStatus.driver?.phone}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                        >
                          <Phone size={16} />
                        </a>
                        <a
                          href={`https://wa.me/${child.busStatus.driver?.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                        >
                          <MessageSquare size={16} />
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Assistant</p>
                      <p className="text-sm">{child.busStatus.assistant?.name}</p>
                      <div className="flex space-x-2 mt-1">
                        <a
                          href={`tel:${child.busStatus.assistant?.phone}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                        >
                          <Phone size={16} />
                        </a>
                        <a
                          href={`https://wa.me/${child.busStatus.assistant?.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                        >
                          <MessageSquare size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Not boarded</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}