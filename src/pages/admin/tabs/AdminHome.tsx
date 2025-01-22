import React from 'react';
import { MapPin, Users, UserCheck } from 'lucide-react';

interface BusLocation {
  id: string;
  route: string;
  lat: number;
  lng: number;
  status: 'on-duty' | 'off-duty';
  studentsBoarded: number;
  capacity: number;
}

interface RecentStudent {
  id: string;
  name: string;
  class: string;
  photo: string;
  checkInTime: string;
  droppedBy: 'bus' | 'parent' | 'self';
}

const DUMMY_BUS_LOCATIONS: BusLocation[] = [
  {
    id: '1',
    route: 'R1',
    lat: 40.7128,
    lng: -74.0060,
    status: 'on-duty',
    studentsBoarded: 25,
    capacity: 40
  },
  {
    id: '2',
    route: 'R2',
    lat: 40.7589,
    lng: -73.9851,
    status: 'on-duty',
    studentsBoarded: 30,
    capacity: 40
  }
];

const DUMMY_RECENT_STUDENTS: RecentStudent[] = [
  {
    id: '1',
    name: 'John Smith',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?auto=format&fit=crop&q=80&w=100',
    checkInTime: '8:30 AM',
    droppedBy: 'bus'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    class: '10B',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
    checkInTime: '8:25 AM',
    droppedBy: 'parent'
  }
];

export const AdminHome: React.FC = () => {
  React.useEffect(() => {
    // Initialize Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const mapElement = document.getElementById('map');
    if (mapElement && window.google) {
      const map = new window.google.maps.Map(mapElement, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
      });

      // Add markers for each bus
      DUMMY_BUS_LOCATIONS.forEach(bus => {
        new window.google.maps.Marker({
          position: { lat: bus.lat, lng: bus.lng },
          map,
          title: `Route ${bus.route}`,
        });
      });
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Check-ins */}
        <div className="col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Check-ins</h2>
          <div className="space-y-4">
            {DUMMY_RECENT_STUDENTS.map(student => (
              <div key={student.id} className="flex items-center space-x-3">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-500">
                    {student.class} • {student.checkInTime}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {student.droppedBy === 'bus' && <MapPin size={16} />}
                  {student.droppedBy === 'parent' && <Users size={16} />}
                  {student.droppedBy === 'self' && <UserCheck size={16} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map and Bus Status */}
        <div className="col-span-2 space-y-6">
          {/* Map */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Live Bus Locations</h2>
            <div id="map" className="h-96 w-full rounded"></div>
          </div>

          {/* Bus Status */}
          <div className="grid grid-cols-3 gap-4">
            {DUMMY_BUS_LOCATIONS.map(bus => (
              <div key={bus.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin size={20} className="text-blue-500" />
                  <h3 className="font-semibold">Route {bus.route}</h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Students: {bus.studentsBoarded}/{bus.capacity}</p>
                  <p>Status: {bus.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};