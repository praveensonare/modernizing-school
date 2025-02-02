import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface ContainerStyle {
  width: string;
  height: string;
  borderRadius: string;
}

const containerStyle: ContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: "8px",
};

interface Location {
  latitude: number;
  longitude: number;
  title?: string;
}

interface GoogleMapViewProps {
  locations: Location[];
  defaultZoom?: number;
  centerLocation?: Location; // Optional center location
}

interface MapCenter {
  lat: number;
  lng: number;
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({ 
  locations,
  defaultZoom = 13,
  centerLocation
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'dab5d4e7c25716fb',
    googleMapsApiKey: "AIzaSyAC4adI5_5XusAtEBJkleRlvVouqpWnAVw"
  });

  // If centerLocation is not provided, use the first location in the array
  const center: MapCenter = {
    lat: centerLocation?.latitude || locations[0]?.latitude || 0,
    lng: centerLocation?.longitude || locations[0]?.longitude || 0
  };

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  // Function to fit bounds to include all markers
  const fitBoundsToMarkers = React.useCallback((map: google.maps.Map) => {
    if (locations.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend({ lat: location.latitude, lng: location.longitude });
      });
      map.fitBounds(bounds);
    }
  }, [locations]);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
    fitBoundsToMarkers(map);
  }, [fitBoundsToMarkers]);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={defaultZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations.map((location, index) => (
        <Marker
          key={`${location.latitude}-${location.longitude}-${index}`}
          position={{ lat: location.latitude, lng: location.longitude }}
          title={location.title}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapView;