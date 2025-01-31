import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Star, Archive, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  focused: boolean;
  content?: string;
}

const Inbox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = window.innerWidth < 768;
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages] = useState<Message[]>([
    {
      id: '1',
      from: 'Principal Smith',
      subject: 'Staff Meeting Tomorrow',
      preview: 'Please be prepared to discuss the upcoming...',
      date: '10:30 AM',
      read: false,
      focused: true,
      content: 'Please be prepared to discuss the upcoming school events and curriculum changes. We will also be reviewing the new safety protocols.'
    },
    {
      id: '2',
      from: 'John Parent',
      subject: 'Regarding Tommy\'s Progress',
      preview: 'I wanted to discuss Tommy\'s recent...',
      date: 'Yesterday',
      read: true,
      focused: false,
      content: 'I wanted to discuss Tommy\'s recent performance in class. He seems to be struggling with the new math concepts.'
    },
    // Add more messages as needed
  ]);

  const handleMessageClick = (message: Message) => {
    if (isMobile) {
      navigate(`/teacher/inbox/${message.id}`, { state: { message } });
    } else {
      setSelectedMessage(message);
    }
  };

  // Mobile message detail view
  if (isMobile && location.pathname.includes('/inbox/')) {
    const message = location.state?.message;
    if (!message) return null;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button
          onClick={() => navigate('/teacher/inbox')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Inbox
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{message.subject}</h2>
          
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-medium text-gray-600">
                {message.from[0]}
              </span>
            </div>
            <div className="ml-4">
              <p className="font-medium text-gray-900">{message.from}</p>
              <p className="text-sm text-gray-500">{message.date}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p>{message.content}</p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              Reply
            </button>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-12">
            {/* Message List */}
            <div className={`md:col-span-${selectedMessage ? '4' : '12'} border-r`}>
              <div className="p-4 border-b bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900">Inbox</h2>
              </div>

              <div className="divide-y">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      !message.read ? 'bg-blue-50' : ''
                    } ${selectedMessage?.id === message.id ? 'bg-gray-100' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          {message.focused && (
                            <Star className="h-4 w-4 text-yellow-400 mr-2" />
                          )}
                          <p className={`text-sm font-medium ${
                            !message.read ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {message.from}
                          </p>
                        </div>
                        <h3 className={`mt-1 text-sm ${
                          !message.read ? 'font-semibold' : ''
                        }`}>
                          {message.subject}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 truncate">
                          {message.preview}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {message.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Detail */}
            {!isMobile && selectedMessage && (
              <div className="md:col-span-8 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                      <Archive className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {selectedMessage.from[0]}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">
                        {selectedMessage.from}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedMessage.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p>{selectedMessage.content}</p>
                </div>

                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;