import React from 'react';
import { User, Phone, MapPin, Clock } from 'lucide-react';

interface RouteStop {
  name: string;
  pickupTime: string;
  dropTime: string;
}

interface BusDetails {
  driver: {
    name: string;
    phone: string;
  };
  assistant: {
    name: string;
    phone: string;
  };
  route: {
    number: string;
    stops: RouteStop[];
  };
}

const DUMMY_DETAILS: BusDetails = {
  driver: {
    name: 'Robert Wilson',
    phone: '+1234567890'
  },
  assistant: {
    name: 'Sarah Thompson',
    phone: '+1234567891'
  },
  route: {
    number: 'R123',
    stops: [
      {
        name: 'Green Park',
        pickupTime: '7:30 AM',
        dropTime: '3:30 PM'
      },
      {
        name: 'Central Square',
        pickupTime: '7:45 AM',
        dropTime: '3:45 PM'
      },
      {
        name: 'School',
        pickupTime: '8:00 AM',
        dropTime: '3:15 PM'
      }
    ]
  }
};

export const MyAccount: React.FC = () => {
  return (
    <div className="flex-1 p-4 space-y-6">
      {/* Staff Details */}
      <section className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3 mb-4">
            <User size={24} className="text-blue-500" />
            <h2 className="text-lg font-semibold">Driver</h2>
          </div>
          <p className="font-medium">{DUMMY_DETAILS.driver.name}</p>
          <a
            href={`tel:${DUMMY_DETAILS.driver.phone}`}
            className="flex items-center space-x-2 text-blue-600 mt-2"
          >
            <Phone size={20} />
            <span>{DUMMY_DETAILS.driver.phone}</span>
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3 mb-4">
            <User size={24} className="text-blue-500" />
            <h2 className="text-lg font-semibold">Assistant</h2>
          </div>
          <p className="font-medium">{DUMMY_DETAILS.assistant.name}</p>
          <a
            href={`tel:${DUMMY_DETAILS.assistant.phone}`}
            className="flex items-center space-x-2 text-blue-600 mt-2"
          >
            <Phone size={20} />
            <span>{DUMMY_DETAILS.assistant.phone}</span>
          </a>
        </div>
      </section>

      {/* Route Details */}
      <section>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin size={24} className="text-blue-500" />
            <h2 className="text-lg font-semibold">Route {DUMMY_DETAILS.route.number}</h2>
          </div>
          
          <div className="space-y-4">
            {DUMMY_DETAILS.route.stops.map((stop, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <h3 className="font-medium mb-2">{stop.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>Pick: {stop.pickupTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>Drop: {stop.dropTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};