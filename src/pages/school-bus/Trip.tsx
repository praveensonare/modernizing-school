import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';

export default function Trip() {
  const [tripType, setTripType] = useState<'pick' | 'drop' | null>(null);
  const [ongoingTrip, setOngoingTrip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an ongoing trip
    // This would typically be an API call
    checkOngoingTrip();
  }, []);

  const checkOngoingTrip = () => {
    // Simulating an API call
    const hasOngoingTrip = localStorage.getItem('ongoingTrip') === 'true';
    setOngoingTrip(hasOngoingTrip);
    
    if (hasOngoingTrip) {
      navigate('/school-bus/trip-start');
    }
  };

  const handleStartTrip = () => {
    localStorage.setItem('ongoingTrip', 'true');
    navigate('/school-bus/trip-start');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16 pt-16">
      <Header />
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold mb-4">ABC School</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTripType('pick')}
                className={`py-3 px-4 rounded-lg border-2 ${
                  tripType === 'pick'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300'
                }`}
                disabled={ongoingTrip}
              >
                Pick
              </button>
              
              <button
                onClick={() => setTripType('drop')}
                className={`py-3 px-4 rounded-lg border-2 ${
                  tripType === 'drop'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300'
                }`}
                disabled={ongoingTrip}
              >
                Drop
              </button>
            </div>

            {tripType && !ongoingTrip && (
              <button
                onClick={handleStartTrip}
                className="w-full bg-blue-600 text-white py-3 rounded-lg
                         hover:bg-blue-700 transition-colors duration-300"
              >
                Start Trip
              </button>
            )}

            {ongoingTrip && (
              <div className="text-center text-gray-600">
                There is an ongoing trip. New trips can only be started after the current trip is finished.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}