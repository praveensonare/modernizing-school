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
  ]);

  const handleMessageClick = (message: Message) => {
    if (isMobile) {
      navigate(`/teacher/inbox/${message.id}`, { state: { message } });
    } else {
      setSelectedMessage(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">


        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
          <div className={`w-${selectedMessage ? '1/3' : 'full'} border-r bg-gray-50`}> 
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Inbox</h2>
            </div>
            <div className="divide-y overflow-auto max-h-[70vh]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-200 transition-all ${!message.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {message.focused && <Star className="h-4 w-4 text-yellow-400 mr-2" />}
                        <p className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>{message.from}</p>
                      </div>
                      <h3 className={`mt-1 text-sm ${!message.read ? 'font-semibold' : ''}`}>{message.subject}</h3>
                      <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                    </div>
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && selectedMessage && (
            <div className="w-2/3 p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                    <Archive className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-200">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">{selectedMessage.from[0]}</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{selectedMessage.from}</p>
                    <p className="text-sm text-gray-500">{selectedMessage.date}</p>
                  </div>
                </div>
              </div>

              <div className="text-gray-800 leading-relaxed">
                <p>{selectedMessage.content}</p>
              </div>

              <div className="mt-6 border-t pt-6">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Mail className="h-4 w-4 mr-2" />
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;