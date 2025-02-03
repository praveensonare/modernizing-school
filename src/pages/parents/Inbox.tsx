import React, { useState } from 'react';
import { PlusCircle, Send, ChevronLeft } from 'lucide-react';

interface Message {
  id: string;
  subject: string;
  date: string;
  content: string;
  read: boolean;
}

interface Child {
  id: string;
  name: string;
}

const requestTypes = [
  'Request for Leave',
  'Request for Late Attendance',
  'Request for Information',
  'Other'
];

const children: Child[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Doe' }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    subject: 'Leave Request - John Doe',
    date: '2024-03-15',
    content: 'Requesting leave for John Doe on March 20th due to medical appointment.',
    read: false
  },
  {
    id: '2',
    subject: 'Late Attendance - Jane Doe',
    date: '2024-03-14',
    content: 'Jane will be arriving 30 minutes late tomorrow due to a dental checkup.',
    read: true
  }
];

export default function Inbox() {
  const [messages] = useState<Message[]>(sampleMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [composing, setComposing] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  
  const [selectedType, setSelectedType] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChildToggle = (childId: string) => {
    setSelectedChildren(prev =>
      prev.includes(childId)
        ? prev.filter(id => id !== childId)
        : [...prev, childId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      type: selectedType,
      content: messageContent,
      children: selectedChildren
    });
    setComposing(false);
    setSelectedType('');
    setMessageContent('');
    setSelectedChildren([]);
  };

  const MessageList = () => (
    <div className="border-r h-full bg-gray-50">
      <div className="p-4 border-b bg-white">
        <button
          onClick={() => {
            setComposing(true);
            setSelectedMessage(null);
          }}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} className="mr-2" />
          New Message
        </button>
      </div>
      <div className="overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => {
              setSelectedMessage(message);
              setComposing(false);
            }}
            className={`p-4 border-b cursor-pointer transition-all duration-200 ${
              !message.read ? 'bg-blue-50 hover:bg-blue-100' : 'bg-white hover:bg-gray-50'
            } ${selectedMessage?.id === message.id ? 'border-l-4 border-l-blue-500 shadow-sm' : ''}`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className={`${!message.read ? 'font-semibold text-blue-900' : 'font-medium text-gray-900'}`}>
                {message.subject}
                {!message.read && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                )}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(message.date).toLocaleDateString()}
              </span>
            </div>
            <p className={`text-sm ${!message.read ? 'text-blue-800' : 'text-gray-600'} truncate`}>
              {message.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const ComposeForm = () => (
    <div className="h-full flex flex-col bg-gray-50" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className="h-full flex flex-col">
        {isMobileView && (
          <div className="p-4 border-b bg-white flex items-center">
            <button
              type="button"
              onClick={() => setComposing(false)}
              className="mr-4"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold">New Message</h2>
          </div>
        )}
        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select request type</option>
              {requestTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows={6}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your message..."
              required
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Children
            </label>
            <div className="space-y-3">
              {children.map((child) => (
                <label key={child.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedChildren.includes(child.id)}
                    onChange={() => handleChildToggle(child.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5"
                  />
                  <span className="text-gray-700 ml-3">{child.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 bg-white border-t">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Send size={20} className="mr-2" />
            Send Message
          </button>
        </div>
      </form>
    </div>
  );

  const MessageView = () => (
    <div className="h-full flex flex-col bg-gray-50">
      {isMobileView && (
        <div className="p-4 border-b bg-white flex items-center">
          <button
            onClick={() => setSelectedMessage(null)}
            className="mr-4"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-semibold">Message</h2>
        </div>
      )}
      <div className="p-6 flex-grow">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">{selectedMessage?.subject}</h2>
            <p className="text-sm text-gray-500">
              {new Date(selectedMessage?.date || '').toLocaleDateString()}
            </p>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage?.content}</p>
        </div>
      </div>
    </div>
  );

  if (isMobileView) {
    if (composing) {
      return <ComposeForm />;
    }
    if (selectedMessage) {
      return <MessageView />;
    }
    return <MessageList />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1">
          <MessageList />
        </div>
        <div className="col-span-2">
          {composing ? (
            <ComposeForm />
          ) : selectedMessage ? (
            <MessageView />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
}