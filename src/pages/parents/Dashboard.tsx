import React from 'react';
import { MapPin, Book, Bus as BusIcon, Phone, MessageSquare } from 'lucide-react';

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <div
              key={child.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium">{child.name}</h3>
              <p className="text-sm text-gray-500">
                {child.location} • {child.lastSeen}
              </p>
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
            <div key={child.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{child.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  child.schoolStatus.isPresent
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {child.schoolStatus.isPresent ? 'Present' : 'Absent'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{child.class}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Check In:</span>
                  <span className={child.schoolStatus.checkIn ? 'text-green-600' : 'text-red-500'}>
                    {child.schoolStatus.checkIn || 'NA'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Check Out:</span>
                  <span className={child.schoolStatus.checkOut ? 'text-green-600' : 'text-gray-500'}>
                    {child.schoolStatus.checkOut || 'NA'}
                  </span>
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
        <div className="space-y-6">
          {Object.entries(routeGroups).map(([routeNumber, data]) => (
            <div key={routeNumber} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Route: {routeNumber}</h3>
                <span className="text-sm text-gray-500">
                  {data.children.length} children
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Children: {data.children.join(', ')}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Driver:</span>
                    <span className="text-sm">{data.driver.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${data.driver.phone}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                    >
                      <Phone size={14} />
                      <span className="text-sm">Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${data.driver.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                    >
                      <MessageSquare size={14} />
                      <span className="text-sm">WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Assistant:</span>
                    <span className="text-sm">{data.assistant.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${data.assistant.phone}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                    >
                      <Phone size={14} />
                      <span className="text-sm">Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${data.assistant.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                    >
                      <MessageSquare size={14} />
                      <span className="text-sm">WhatsApp</span>
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