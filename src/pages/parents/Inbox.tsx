import React, { useState, useEffect } from 'react';
import { Search, Plus, ArrowLeft, Reply, X, Send } from 'lucide-react';

interface Message {
  id: string;
  from: string;
  to: string[];
  cc: string[];
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    from: 'principal@school.com',
    to: ['parent@example.com'],
    cc: [],
    subject: 'Parent-Teacher Meeting Schedule',
    content: `Dear Parent,

We are organizing a parent-teacher meeting next week to discuss your child's academic progress. The meeting is scheduled for March 25th, 2024, from 9:00 AM to 11:00 AM.

Please confirm your attendance by replying to this message.

Best regards,
Principal`,
    date: '2024-03-15T10:30:00',
    read: false
  },
  {
    id: '2',
    from: 'teacher@school.com',
    to: ['parent@example.com'],
    cc: ['coordinator@school.com'],
    subject: 'Monthly Progress Report - March 2024',
    content: `Dear Parent,

Please find attached the monthly progress report for your child. They have shown remarkable improvement in Mathematics and Science this month.

We would like to highlight the following achievements:
1. Perfect attendance
2. Active participation in class discussions
3. Excellent performance in the recent science project

Keep encouraging them!

Best regards,
Class Teacher`,
    date: '2024-03-14T15:45:00',
    read: true
  },
  {
    id: '3',
    from: 'sports@school.com',
    to: ['parent@example.com'],
    cc: [],
    subject: 'Annual Sports Day Registration',
    content: `Dear Parent,

The Annual Sports Day is approaching! We're excited to announce that registrations are now open for various events.

Your child has been recommended for:
- 100m Sprint
- Long Jump
- Relay Race

Please reply with your child's preferred events by March 20th.

Best regards,
Sports Department`,
    date: '2024-03-13T09:15:00',
    read: false
  },
  {
    id: '4',
    from: 'library@school.com',
    to: ['parent@example.com'],
    cc: [],
    subject: 'Overdue Library Books Notice',
    content: `Dear Parent,

This is a reminder that the following library books are overdue:
1. "The Magic of Science" - Due: March 1st
2. "World History: Volume 2" - Due: March 5th

Please ensure these books are returned as soon as possible.

Regards,
School Librarian`,
    date: '2024-03-12T14:20:00',
    read: true
  },
  {
    id: '5',
    from: 'cafeteria@school.com',
    to: ['parent@example.com'],
    cc: [],
    subject: 'March Lunch Menu Update',
    content: `Dear Parent,

We're excited to share our new healthy lunch menu for March. We've incorporated more organic vegetables and whole grains.

Please review the attached menu and let us know if your child has any dietary restrictions we should be aware of.

Best regards,
Cafeteria Management`,
    date: '2024-03-11T11:00:00',
    read: true
  },
  {
    id: '6',
    from: 'nurse@school.com',
    to: ['parent@example.com'],
    cc: ['health@school.com'],
    subject: 'Health Check-up Schedule',
    content: `Dear Parent,

The annual health check-up is scheduled for next week. Your child's appointment is on March 22nd at 10:00 AM.

Please ensure your child has had breakfast before the check-up.

Regards,
School Nurse`,
    date: '2024-03-10T13:45:00',
    read: false
  }
];

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [composing, setComposing] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [newMessage, setNewMessage] = useState({
    to: '',
    cc: '',
    subject: '',
    content: ''
  });
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageClick = (message: Message) => {
    if (!message.read) {
      const updatedMessages = messages.map(m =>
        m.id === message.id ? { ...m, read: true } : m
      );
      setMessages(updatedMessages);
    }
    setSelectedMessage(message);
    setIsReplying(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', newMessage);
    setComposing(false);
    setNewMessage({ to: '', cc: '', subject: '', content: '' });
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending reply:', newMessage);
    setIsReplying(false);
    setNewMessage({ to: '', cc: '', subject: '', content: '' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const MessageList = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={() => {
              setComposing(true);
              setSelectedMessage(null);
              setIsReplying(false);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Compose
          </button>
        </div>
      </div>
      <div className="overflow-y-auto flex-1">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            onClick={() => handleMessageClick(message)}
            className={`
              p-4 border-b cursor-pointer transition-colors
              ${!message.read ? 'bg-blue-50 hover:bg-blue-100 font-medium' : 'hover:bg-gray-50'}
              ${selectedMessage?.id === message.id ? 'bg-blue-100 border-l-4 border-l-blue-500' : ''}
            `}
          >
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-medium">{message.from}</span>
              <span className="text-sm text-gray-500">{formatDate(message.date)}</span>
            </div>
            <h3 className="text-gray-900 mb-1">{message.subject}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ComposeForm = ({ isReply = false }) => (
    <form onSubmit={isReply ? handleReply : handleSend} className="h-full flex flex-col bg-white">
      <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              if (isReply) {
                setIsReplying(false);
              } else {
                setComposing(false);
              }
            }}
            className="mr-4"
          >
            {isMobileView ? <ArrowLeft size={24} /> : <X size={24} />}
          </button>
          <h2 className="text-lg font-semibold">{isReply ? 'Reply' : 'New Message'}</h2>
        </div>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Send size={20} className="mr-2" />
          Send
        </button>
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">To:</label>
          </div>
          <div className="col-span-11">
            <input
              type="email"
              value={isReply ? selectedMessage?.from || '' : newMessage.to}
              onChange={(e) => {
                e.stopPropagation();
                setNewMessage({ ...newMessage, to: e.target.value });
              }}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isReply}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Cc:</label>
          </div>
          <div className="col-span-11">
            <input
              type="text"
              value={newMessage.cc}
              onChange={(e) => {
                e.stopPropagation();
                setNewMessage({ ...newMessage, cc: e.target.value });
              }}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Subject:</label>
          </div>
          <div className="col-span-11">
            <input
              type="text"
              value={isReply ? `Re: ${selectedMessage?.subject || ''}` : newMessage.subject}
              onChange={(e) => {
                e.stopPropagation();
                setNewMessage({ ...newMessage, subject: e.target.value });
              }}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isReply}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        
        <div className="flex-1">
          <textarea
            value={newMessage.content}
            onChange={(e) => {
              e.stopPropagation();
              setNewMessage({ ...newMessage, content: e.target.value });
            }}
            className="w-full h-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
            required
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </form>
  );

  const MessageView = () => (
    <div className="h-full flex flex-col bg-white">
      {isMobileView && (
        <div className="p-4 border-b flex items-center">
          <button
            onClick={() => setSelectedMessage(null)}
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-semibold">Message</h2>
        </div>
      )}
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedMessage?.subject}</h2>
          <div className="flex justify-between items-baseline mb-4 text-sm text-gray-600">
            <div>
              <p><span className="font-medium">From:</span> {selectedMessage?.from}</p>
              <p><span className="font-medium">To:</span> {selectedMessage?.to.join(', ')}</p>
              {selectedMessage?.cc.length ? (
                <p><span className="font-medium">Cc:</span> {selectedMessage?.cc.join(', ')}</p>
              ) : null}
            </div>
            <p>{formatDate(selectedMessage?.date || '')}</p>
          </div>
          <button
            onClick={() => setIsReplying(true)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Reply size={20} className="mr-2" />
            Reply
          </button>
        </div>
        <div className="whitespace-pre-wrap text-gray-800">
          {selectedMessage?.content}
        </div>
      </div>
    </div>
  );

  if (isMobileView) {
    if (composing || isReplying) {
      return <ComposeForm isReply={isReplying} />;
    }
    if (selectedMessage) {
      return <MessageView />;
    }
    return <MessageList />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 border-r">
          <MessageList />
        </div>
        <div className="col-span-2">
          {composing || isReplying ? (
            <ComposeForm isReply={isReplying} />
          ) : selectedMessage ? (
            <MessageView />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
