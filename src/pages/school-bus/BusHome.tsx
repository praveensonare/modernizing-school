import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Bell } from 'lucide-react';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';

interface Message {
  id: number;
  subject: string;
  content: string;
  sender: string;
  time: string;
  expanded: boolean;
}

export default function Home() {
  const [emergency, setEmergency] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      subject: 'Route Change Notice',
      content: 'Due to road construction, the bus will take an alternate route tomorrow. Please expect a 5-minute delay.',
      sender: 'Transport Manager',
      time: '2:30 PM',
      expanded: false
    },
    {
      id: 2,
      subject: 'School Event Tomorrow',
      content: 'Annual Sports Day tomorrow. Bus pickup will be 30 minutes earlier than usual.',
      sender: 'School Admin',
      time: '1:15 PM',
      expanded: false
    },
    {
      id: 3,
      subject: 'Weather Alert',
      content: 'Heavy rain expected tomorrow morning. Bus service will operate as usual but please prepare for slight delays.',
      sender: 'System',
      time: '11:30 AM',
      expanded: false
    }
  ]);

  const notifications = [
    {
      id: 1,
      title: 'Bus Arriving Soon',
      message: 'Bus will arrive at Station C in 5 minutes',
      time: 'Just now'
    },
    {
      id: 2,
      title: 'Schedule Update',
      message: 'Tomorrow\'s pickup time changed to 7:45 AM',
      time: '10 minutes ago'
    }
  ];

  const handleSOS = () => {
    alert('SOS Executed');
  };

  const toggleMessage = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, expanded: !msg.expanded } : msg
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16 pt-16">
      <Header />
      
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <textarea
            value={emergency}
            onChange={(e) => setEmergency(e.target.value)}
            placeholder="Enter emergency message..."
            className="w-full h-24 border rounded p-2 mb-4"
          />
          
          <button
            onClick={handleSOS}
            className="w-32 h-32 rounded-full bg-red-600 text-white font-bold text-xl
                     shadow-lg mx-auto block animate-pulse hover:bg-red-700
                     transition-colors duration-300"
          >
            SOS
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Recent Notifications
          </h2>
          {notifications.map(notification => (
            <div key={notification.id} className="mb-3 p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Important Messages</h2>
          <div className="space-y-2">
            {messages.map(message => (
              <div key={message.id} className="bg-gray-50 rounded-lg">
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMessage(message.id)}
                >
                  <div>
                    <h3 className="font-semibold">{message.subject}</h3>
                    <p className="text-sm text-gray-500">
                      {message.sender} • {message.time}
                    </p>
                  </div>
                  {message.expanded ? <ChevronUp /> : <ChevronDown />}
                </div>
                
                {message.expanded && (
                  <div className="px-4 pb-4 border-t">
                    <p className="mt-2 text-gray-700">{message.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}