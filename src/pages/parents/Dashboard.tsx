import React from 'react';
import { MapPin, Book, Bus as BusIcon, Phone, MessageSquare } from 'lucide-react';
import GoogleMapView from './GoogleMap/GoogleMapView';

interface Child {
  id: string;
  name: string;
  location: string;
  lastSeen: string;
  schoolStatus: {
    checkIn: string | null;
    checkOut: string | null;
    isPresent: boolean;
  };
  class: string;
  busRoute: {
    routeNumber: string;
    boarded: boolean;
    driver: {
      name: string;
      phone: string;
    };
    assistant: {
      name: string;
      phone: string;
    };
  };
}


const children: Child[] = [
  {
    id: '1',
    name: 'John Doe',
    location: 'School Campus',
    lastSeen: '2 mins ago',
    schoolStatus: {
      checkIn: '07:45 AM',
      checkOut: null,
      isPresent: true
    },
    class: 'Grade 5-A',
    busRoute: {
      routeNumber: 'R-123',
      boarded: true,
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
  {
    id: '2',
    name: 'Jane Doe',
    location: 'Central Park',
    lastSeen: '5 mins ago',
    schoolStatus: {
      checkIn: '07:50 AM',
      checkOut: '03:30 PM',
      isPresent: true
    },
    class: 'Grade 3-B',
    busRoute: {
      routeNumber: 'R-123',
      boarded: true,
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
  {
    id: '3',
    name: 'Mike Smith',
    location: 'Unknown',
    lastSeen: '1 hour ago',
    schoolStatus: {
      checkIn: null,
      checkOut: null,
      isPresent: false
    },
    class: 'Grade 4-C',
    busRoute: {
      routeNumber: 'R-124',
      boarded: false,
      driver: {
        name: 'John Wilson',
        phone: '+1234567892'
      },
      assistant: {
        name: 'Mary Brown',
        phone: '+1234567893'
      }
    }
  }
];
const locations = [
  { latitude: 40.7128, longitude: -74.0060, title: "New York" },
  { latitude: 34.0522, longitude: -118.2437, title: "Los Angeles" },
  { latitude: 41.8781, longitude: -87.6298, title: "Chicago" }
];
// Group children by route number
const groupChildrenByRoute = (children: Child[]) => {
  return children.reduce((acc, child) => {
    const route = child.busRoute.routeNumber;
    if (!acc[route]) {
      acc[route] = {
        children: [],
        driver: child.busRoute.driver,
        assistant: child.busRoute.assistant
      };
    }
    acc[route].children.push(child.name);
    return acc;
  }, {} as Record<string, { children: string[], driver: Child['busRoute']['driver'], assistant: Child['busRoute']['assistant'] }>);
};

export default function Dashboard() {
  const routeGroups = groupChildrenByRoute(children);

  return (
    <div className="space-y-6">
      {/* Location Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <MapPin className="mr-2 text-blue-500" />
          Location Tracking
        </h2>
        <div className="aspect-video bg-gray-100 rounded-lg mb-4">
          {/* Google Maps integration would go here */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <GoogleMapView
              locations={locations}
              defaultZoom={10}
              centerLocation={locations[0]} // Optional: specify center location
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <div
              key={child.id}
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-all"
            >
              <div>
                <h3 className="font-medium">{child.name}</h3>
                <p className="text-sm text-gray-500">
                  {child.location} • {child.lastSeen}
                </p>
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
          {children.map((child) => (
            <div key={child.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{child.name}</h3>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  child.schoolStatus.isPresent
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {child.schoolStatus.isPresent ? 'Present' : 'Absent'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{child.class}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className={`px-2 py-1 rounded ${
                  child.schoolStatus.checkIn 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {child.schoolStatus.checkIn || 'NA'}
                </div>
                <div className={`px-2 py-1 rounded ${
                  child.schoolStatus.checkOut 
                    ? 'bg-orange-50 text-orange-700' 
                    : 'bg-gray-50 text-gray-500'
                }`}>
                  {child.schoolStatus.checkOut || 'NA'}
                </div>
              </div>
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
        <div className="space-y-4">
          {Object.entries(routeGroups).map(([routeNumber, data]) => (
            <div key={routeNumber} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Route: {routeNumber}</h3>
                <span className="text-sm text-gray-500">
                  {data.children.length} children
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {data.children.join(', ')}
              </p>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium w-24">Driver:</span>
                  <span className="text-sm mr-4">{data.driver.name}</span>
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${data.driver.phone}`}
                      className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      title="Call Driver"
                    >
                      <Phone size={14} />
                    </a>
                    <a
                      href={`https://wa.me/${data.driver.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200"
                      title="WhatsApp Driver"
                    >
                      <MessageSquare size={14} />
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium w-24">Assistant:</span>
                  <span className="text-sm mr-4">{data.assistant.name}</span>
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${data.assistant.phone}`}
                      className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      title="Call Assistant"
                    >
                      <Phone size={14} />
                    </a>
                    <a
                      href={`https://wa.me/${data.assistant.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200"
                      title="WhatsApp Assistant"
                    >
                      <MessageSquare size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}