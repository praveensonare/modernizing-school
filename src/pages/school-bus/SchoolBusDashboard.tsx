import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  expanded: boolean;
}

export const SchoolBusDashboard: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bus 123 will be delayed by 10 minutes due to traffic.',
      timestamp: '10:30 AM',
      expanded: false
    },
    {
      id: '2',
      text: 'Route changed due to road construction. Taking alternate route.',
      timestamp: '09:15 AM',
      expanded: false
    }
  ]);

  const handleSOS = () => {
    alert('SoS Executed');
  };

  const toggleMessage = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, expanded: !msg.expanded } : msg
    ));
  };

  return (
    <div className="flex-1 p-4 space-y-6">
      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type emergency message here..."
          className="w-full h-24 p-3 border rounded-lg resize-none"
          maxLength={500}
        />
        
        <button
          onClick={handleSOS}
          className="w-full bg-red-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
        >
          <AlertTriangle size={20} />
          <span>SOS/Notify</span>
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className={`text-gray-800 ${!msg.expanded && 'line-clamp-2'}`}>
                    {msg.text}
                  </p>
                  <span className="text-sm text-gray-500">{msg.timestamp}</span>
                </div>
                <button
                  onClick={() => toggleMessage(msg.id)}
                  className="ml-2 p-1 hover:bg-gray-100 rounded"
                >
                  {msg.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};