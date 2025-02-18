import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Plus, X, Phone, MessageSquare } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Loader } from '@googlemaps/js-api-loader';
const GOOGLE_API = import.meta.env.VITE_GOOGLE_API_KEY;


interface BusRoute {
  id: string;
  routeNumber: string;
  capacity: number;
  registered: number;
  status: 'on-duty' | 'off-duty';
  busNumber: string;
  photo: string;
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
}

const dummyRoutes: BusRoute[] = [
  {
    id: '1',
    routeNumber: 'R101',
    capacity: 40,
    registered: 35,
    status: 'on-duty',
    busNumber: 'KA01AB1234',
    photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957',
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
  },
  {
    id: '2',
    routeNumber: 'R102',
    capacity: 35,
    registered: 30,
    status: 'on-duty',
    busNumber: 'KA01CD5678',
    photo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e',
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
  driverWhatsapp: string;
  assistantName: string;
  assistantContact: string;
  assistantWhatsapp: string;
  routeNumber: string;
  busNumber: string;
  capacity: number;
  photo: string;
  stations: Station[];
}

const initialFormState: NewRouteForm = {
  driverName: '',
  driverContact: '',
  driverWhatsapp: '',
  assistantName: '',
  assistantContact: '',
  assistantWhatsapp: '',
  routeNumber: '',
  busNumber: '',
  capacity: 40,
  photo: '',
  stations: [],
};

export function Transport() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<BusRoute[]>(dummyRoutes);
  const [showNewRouteForm, setShowNewRouteForm] = useState(false);
  const [formData, setFormData] = useState<NewRouteForm>(initialFormState);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [movingMarker, setMovingMarker] = useState<google.maps.Marker | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [clickedPoints, setClickedPoints] = useState<{ lat: number; lng: number }[]>([]);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [dirService, setDirService] = useState<google.maps.DirectionsService | null>(null);
  const [dirRenderer, setDirRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [routePath, setRoutePath] = useState<google.maps.LatLng[]>([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_API,
      version: 'weekly',
    });
    loader.load().then(() => {
      if (mapRef.current) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: 12.9716, lng: 77.5946 },
          zoom: 12,
        });
        setMap(newMap);
        const ds = new google.maps.DirectionsService();
        const dr = new google.maps.DirectionsRenderer();
        dr.setMap(newMap);
        setDirService(ds);
        setDirRenderer(dr);
        newMap.addListener('click', (e: google.maps.MapMouseEvent) => {
          if (!e.latLng) return;
          const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          setSelectedLocation(point);
          const newMarker = new google.maps.Marker({
            position: point,
            map: newMap,
          });
          setMarkers((prev) => [...prev, newMarker]);
          setClickedPoints((prev) => [...prev, point]);
        });
      }
    });
  }, [showNewRouteForm]);

  useEffect(() => {
    if (clickedPoints.length >= 2 && dirService && dirRenderer && map) {
      const origin = clickedPoints[0];
      const destination = clickedPoints[clickedPoints.length - 1];
      const waypoints = clickedPoints.slice(1, clickedPoints.length - 1).map((point) => ({
        location: point,
        stopover: true,
      }));
      const request: google.maps.DirectionsRequest = {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      dirService.route(request, (result, status) => {
        if (status === 'OK' && result) {
          dirRenderer.setDirections(result);
          const route = result.routes[0];
          if (route && route.overview_path) {
            setRoutePath(route.overview_path);
            setCurrentPathIndex(0);
            if (movingMarker) {
              movingMarker.setMap(null);
            }
            const newMarker = new google.maps.Marker({
              position: route.overview_path[0],
              map: map,
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new google.maps.Size(32, 32),
              },
            });
            setMovingMarker(newMarker);
          }
        }
      });
    }
  }, [clickedPoints, dirService, dirRenderer, map]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedRoute(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddStation = () => {
    if (!selectedLocation) {
      alert('Please select a location on the map first');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      stations: [
        ...prev.stations,
        {
          name: '',
          pickupTime: '',
          dropoffTime: '',
          location: selectedLocation,
        },
      ],
    }));
    setSelectedLocation(null);
    if (marker) {
      marker.setMap(null);
      setMarker(null);
    }
  };

  const handleRemoveStation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stations: prev.stations.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewRouteForm(false);
    setFormData(initialFormState);
  };

  const handleRouteClick = (route: BusRoute) => {
    setSelectedRoute(route);
  };

  const handleUserTravel = () => {
    if (routePath.length > 0 && currentPathIndex < routePath.length - 1) {
      const nextIndex = currentPathIndex + 1;
      setCurrentPathIndex(nextIndex);
      if (movingMarker) {
        movingMarker.setPosition(routePath[nextIndex]);
      }
    }
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
            onClick={() => handleRouteClick(route)}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
          >
            <div className="flex h-40">
              <div className="w-1/2">
                <img
                  src={route.photo}
                  alt={`Route ${route.routeNumber} Bus`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-lg">Route {route.routeNumber}</h3>
                  <p className="text-sm text-gray-600">Bus: {route.busNumber}</p>
                  <p className="text-sm text-gray-600">
                    {route.registered}/{route.capacity} Students
                  </p>
                </div>
                <span
                  className={cn(
                    'inline-block px-2 py-1 rounded-full text-xs',
                    route.status === 'on-duty'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  )}
                >
                  {route.status === 'on-duty' ? 'On Duty' : 'Off Duty'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
          <div ref={popupRef} className="bg-white h-full w-full max-w-md overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Route Details</h2>
              <button onClick={() => setSelectedRoute(null)} className="p-2 hover:bg-gray-100 rounded-full">
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
                    Capacity: {selectedRoute.registered}/{selectedRoute.capacity} Students
                  </p>
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
      {showNewRouteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Create New Route</h2>
              <button onClick={() => setShowNewRouteForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Driver Name</label>
                    <input
                      type="text"
                      value={formData.driverName}
                      onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Driver Contact</label>
                    <input
                      type="tel"
                      value={formData.driverContact}
                      onChange={(e) => setFormData({ ...formData, driverContact: e.target.value })}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Driver WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.driverWhatsapp}
                      onChange={(e) => setFormData({ ...formData, driverWhatsapp: e.target.value })}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assistant Name</label>
                    <input
                      type="text"
                      value={formData.assistantName}
                      onChange={(e) => setFormData({ ...formData, assistantName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assistant Contact</label>
                    <input
                      type="tel"
                      value={formData.assistantContact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assistantContact: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assistant WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.assistantWhatsapp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assistantWhatsapp: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Route Number</label>
                  <input
                    type="text"
                    value={formData.routeNumber}
                    onChange={(e) => setFormData({ ...formData, routeNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bus Number</label>
                  <input
                    type="text"
                    value={formData.busNumber}
                    onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bus Photo URL</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
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
                <div className="mb-4 h-[400px]">
                  <div ref={mapRef} className="w-full h-full rounded-lg"></div>
                </div>
                {formData.stations.map((station, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-4 mb-4 items-start bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Station Name</label>
                      <input
                        type="text"
                        value={station.name}
                        onChange={(e) => {
                          const newStations = [...formData.stations];
                          newStations[index].name = e.target.value;
                          setFormData({ ...formData, stations: newStations });
                        }}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pickup Time</label>
                      <input
                        type="time"
                        value={station.pickupTime}
                        onChange={(e) => {
                          const newStations = [...formData.stations];
                          newStations[index].pickupTime = e.target.value;
                          setFormData({ ...formData, stations: newStations });
                        }}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Drop-off Time</label>
                      <input
                        type="time"
                        value={station.dropoffTime}
                        onChange={(e) => {
                          const newStations = [...formData.stations];
                          newStations[index].dropoffTime = e.target.value;
                          setFormData({ ...formData, stations: newStations });
                        }}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveStation(index)}
                        className="mt-6 p-2 text-red-600 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="col-span-5 text-sm text-gray-600">
                      Location: {station.location.lat.toFixed(6)}, {station.location.lng.toFixed(6)}
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
      {routePath.length > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={handleUserTravel}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Move Bus
          </button>
        </div>
      )}
    </div>
  );
}

export default Transport;
