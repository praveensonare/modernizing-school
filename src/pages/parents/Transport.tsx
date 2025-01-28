import React from 'react';
import { Bus, Phone, MessageSquare, ArrowRight } from 'lucide-react';

interface BusStop {
  name: string;
  scheduledTime: string;
  actualTime: string;
  status: 'passed' | 'current' | 'upcoming';
}

interface BusDetails {
  routeNumber: string;
  busNumber: string;
  capacity: number;
  driver: {
    name: string;
    phone: string;
  };
  assistant: {
    name: string;
    phone: string;
  };
  morningStops: BusStop[];
  afternoonStops: BusStop[];
}

const busDetails: BusDetails = {
  routeNumber: 'R-123',
  busNumber: 'BUS-456',
  capacity: 40,
  driver: {
    name: 'David Smith',
    phone: '+1234567890'
  },
  assistant: {
    name: 'Sarah Johnson',
    phone: '+1234567891'
  },
  morningStops: [
    { name: 'Bus Depot', scheduledTime: '7:00 AM', actualTime: '7:00 AM', status: 'passed' },
    { name: 'Green Valley', scheduledTime: '7:10 AM', actualTime: '7:12 AM', status: 'passed' },
    { name: 'Riverside Park', scheduledTime: '7:20 AM', actualTime: '7:22 AM', status: 'passed' },
    { name: 'Main Street', scheduledTime: '7:30 AM', actualTime: '7:32 AM', status: 'passed' },
    { name: 'Central Park', scheduledTime: '7:45 AM', actualTime: '7:45 AM', status: 'current' },
    { name: 'Oak Avenue', scheduledTime: '7:50 AM', actualTime: '-', status: 'upcoming' },
    { name: 'School', scheduledTime: '8:00 AM', actualTime: '-', status: 'upcoming' }
  ],
  afternoonStops: [
    { name: 'School', scheduledTime: '3:00 PM', actualTime: '-', status: 'upcoming' },
    { name: 'Oak Avenue', scheduledTime: '3:10 PM', actualTime: '-', status: 'upcoming' },
    { name: 'Central Park', scheduledTime: '3:20 PM', actualTime: '-', status: 'upcoming' },
    { name: 'Main Street', scheduledTime: '3:30 PM', actualTime: '-', status: 'upcoming' },
    { name: 'Riverside Park', scheduledTime: '3:40 PM', actualTime: '-', status: 'upcoming' },
    { name: 'Green Valley', scheduledTime: '3:50 PM', actualTime: '-', status: 'upcoming' },
    { name: 'Bus Depot', scheduledTime: '4:00 PM', actualTime: '-', status: 'upcoming' }
  ]
};

export default function Transport() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-6">
          {/* Bus Information Card */}
          <div className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{busDetails.routeNumber}</h3>
                <p className="text-sm text-gray-500">{busDetails.busNumber}</p>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Bus className="mr-2" size={18} />
                <span>{busDetails.capacity} seats</span>
              </div>
            </div>

            {/* Staff Information */}
            <div className="space-y-4">
              <div className="p-3 bg-white rounded-md">
                <p className="font-medium mb-2">Driver: {busDetails.driver.name}</p>
                <div className="flex space-x-3">
                  <a
                    href={`tel:${busDetails.driver.phone}`}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                  >
                    <Phone size={14} />
                    <span className="text-sm">Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${busDetails.driver.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                  >
                    <MessageSquare size={14} />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="p-3 bg-white rounded-md">
                <p className="font-medium mb-2">Assistant: {busDetails.assistant.name}</p>
                <div className="flex space-x-3">
                  <a
                    href={`tel:${busDetails.assistant.phone}`}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                  >
                    <Phone size={14} />
                    <span className="text-sm">Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${busDetails.assistant.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                  >
                    <MessageSquare size={14} />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Route Timelines */}
          <div className="flex-[2] min-w-[300px]">
            <div className="space-y-6">
              {/* Morning Route */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm mr-2">Morning Route</span>
                  <ArrowRight size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500 ml-2">To School</span>
                </h3>
                <div className="space-y-4">
                  {busDetails.morningStops.map((stop, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`
                        w-3 h-3 rounded-full flex-shrink-0
                        ${stop.status === 'passed' ? 'bg-gray-300' : ''}
                        ${stop.status === 'current' ? 'bg-green-500 ring-4 ring-green-100' : ''}
                        ${stop.status === 'upcoming' ? 'bg-yellow-500' : ''}
                      `} />
                      <div className="ml-3 flex-grow">
                        <p className="text-sm font-medium">{stop.name}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Scheduled: {stop.scheduledTime}</span>
                          <span>Actual: {stop.actualTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Afternoon Route */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm mr-2">Afternoon Route</span>
                  <ArrowRight size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500 ml-2">From School</span>
                </h3>
                <div className="space-y-4">
                  {busDetails.afternoonStops.map((stop, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`
                        w-3 h-3 rounded-full flex-shrink-0
                        ${stop.status === 'passed' ? 'bg-gray-300' : ''}
                        ${stop.status === 'current' ? 'bg-green-500 ring-4 ring-green-100' : ''}
                        ${stop.status === 'upcoming' ? 'bg-yellow-500' : ''}
                      `} />
                      <div className="ml-3 flex-grow">
                        <p className="text-sm font-medium">{stop.name}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Scheduled: {stop.scheduledTime}</span>
                          <span>Actual: {stop.actualTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}