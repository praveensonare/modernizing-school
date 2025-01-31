import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, MapPin, Clock, Calendar, X, AlertCircle } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'online' | 'in-person';
  location?: string;
  link?: string;
  credentials?: {
    id: string;
    password: string;
  };
  description: string;
  attendees: string[];
}

const MeetingPage = () => {
  const navigate = useNavigate();
  const [meetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Weekly Department Meeting',
      date: '2024-03-15',
      time: '10:00 AM - 11:30 AM',
      type: 'online',
      link: 'https://meet.google.com/abc-defg-hij',
      credentials: {
        id: '123456789',
        password: 'dept2024'
      },
      description: 'Weekly sync-up with the Mathematics department to discuss curriculum progress.',
      attendees: ['John Smith', 'Sarah Johnson', 'Mike Wilson']
    },
    {
      id: '2',
      title: 'Parent-Teacher Conference',
      date: '2024-03-16',
      time: '2:00 PM - 3:00 PM',
      type: 'in-person',
      location: 'Room 204, Main Building',
      description: 'Individual meeting with Tommy\'s parents to discuss academic progress.',
      attendees: ['Mr. Thompson', 'Mrs. Thompson']
    }
  ]);

  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const handlePostponeMeeting = () => {
    // Add API call to postpone meeting
    setShowPostponeModal(false);
  };

  const handleCancelMeeting = (meetingId: string) => {
    // Add API call to cancel meeting
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/teacher')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Meetings</h1>

          <div className="grid gap-6 md:grid-cols-2">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {meeting.title}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedMeeting(meeting);
                        setShowPostponeModal(true);
                      }}
                      className="px-3 py-1 text-sm text-yellow-700 bg-yellow-100 rounded-full hover:bg-yellow-200"
                    >
                      Postpone
                    </button>
                    <button
                      onClick={() => handleCancelMeeting(meeting.id)}
                      className="px-3 py-1 text-sm text-red-700 bg-red-100 rounded-full hover:bg-red-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{meeting.time}</span>
                  </div>
                  {meeting.type === 'online' ? (
                    <div className="space-y-2">
                      <div className="flex items-center text-blue-600">
                        <Video className="h-5 w-5 mr-2" />
                        <a href={meeting.link} className="hover:underline">
                          Join Meeting
                        </a>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-600">
                          Meeting ID: {meeting.credentials?.id}
                          <br />
                          Password: {meeting.credentials?.password}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{meeting.location}</span>
                    </div>
                  )}
                  <p className="text-gray-600">{meeting.description}</p>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Attendees
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {meeting.attendees.map((attendee, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Postpone Meeting Modal */}
      {showPostponeModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Postpone Meeting
              </h3>
              <button
                onClick={() => setShowPostponeModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-yellow-600 bg-yellow-50 p-3 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p className="text-sm">
                  Are you sure you want to postpone "{selectedMeeting.title}"?
                </p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  New Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  New Time
                </label>
                <input
                  type="time"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPostponeModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostponeMeeting}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Confirm Postpone
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingPage;