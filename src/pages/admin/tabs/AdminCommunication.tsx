import React, { useState } from 'react';
import { Send, ArrowLeft, X, Search } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  type: 'teacher' | 'student' | 'vendor';
  email: string;
  whatsapp: string;
  photo?: string;
  class?: string;
}

const DUMMY_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    type: 'teacher',
    email: 'sarah@school.com',
    whatsapp: '+1234567890',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'John Smith',
    type: 'student',
    email: 'john@school.com',
    whatsapp: '+1234567891',
    class: '10A',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    name: 'Bus Service',
    type: 'vendor',
    email: 'transport@vendor.com',
    whatsapp: '+1234567892'
  }
];

interface CommunicationState {
  step: 'method' | 'teacher' | 'student' | 'vendor' | 'review' | 'message';
  method: 'whatsapp' | 'email' | 'both' | null;
  selectedContacts: Set<string>;
  message: string;
  agreed: boolean;
}

export const AdminCommunication: React.FC = () => {
  const [state, setState] = useState<CommunicationState>({
    step: 'method',
    method: null,
    selectedContacts: new Set(),
    message: '',
    agreed: false
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleBack = () => {
    const steps: CommunicationState['step'][] = ['method', 'teacher', 'student', 'vendor', 'review', 'message'];
    const currentIndex = steps.indexOf(state.step);
    if (currentIndex > 0) {
      setState(prev => ({ ...prev, step: steps[currentIndex - 1] }));
    }
  };

  const handleNext = () => {
    const steps: CommunicationState['step'][] = ['method', 'teacher', 'student', 'vendor', 'review', 'message'];
    const currentIndex = steps.indexOf(state.step);
    if (currentIndex < steps.length - 1) {
      setState(prev => ({ ...prev, step: steps[currentIndex + 1] }));
    }
  };

  const toggleContact = (id: string) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedContacts);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return { ...prev, selectedContacts: newSelected };
    });
  };

  const renderContacts = (type: Contact['type']) => {
    const filteredContacts = DUMMY_CONTACTS.filter(
      contact => contact.type === type && 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map(contact => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
            >
              <input
                type="checkbox"
                checked={state.selectedContacts.has(contact.id)}
                onChange={() => toggleContact(contact.id)}
                className="h-5 w-5"
              />
              {contact.photo && (
                <img
                  src={contact.photo}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                {contact.class && (
                  <p className="text-sm text-gray-600">Class: {contact.class}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (state.step) {
      case 'method':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6">Select Communication Method</h2>
            <div className="space-y-4">
              {['whatsapp', 'email', 'both'].map((method) => (
                <label key={method} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="method"
                    checked={state.method === method}
                    onChange={() => setState(prev => ({ 
                      ...prev, 
                      method: method as CommunicationState['method']
                    }))}
                    className="h-5 w-5"
                  />
                  <span className="text-lg">
                    {method === 'both' ? 'WhatsApp & Email' : method.charAt(0).toUpperCase() + method.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'teacher':
        return (
          <div>
            <h2 className="text-xl font-bold mb-6">Select Teachers</h2>
            {renderContacts('teacher')}
          </div>
        );

      case 'student':
        return (
          <div>
            <h2 className="text-xl font-bold mb-6">Select Students</h2>
            {renderContacts('student')}
          </div>
        );

      case 'vendor':
        return (
          <div>
            <h2 className="text-xl font-bold mb-6">Select Vendors</h2>
            {renderContacts('vendor')}
          </div>
        );

      case 'review':
        return (
          <div>
            <h2 className="text-xl font-bold mb-6">Review Selected Contacts</h2>
            <div className="space-y-4">
              {Array.from(state.selectedContacts).map(id => {
                const contact = DUMMY_CONTACTS.find(c => c.id === id);
                if (!contact) return null;
                return (
                  <div key={id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                      {contact.photo && (
                        <img
                          src={contact.photo}
                          alt={contact.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleContact(id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'message':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6">Compose Message</h2>
            <textarea
              value={state.message}
              onChange={(e) => setState(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Type your message here..."
              className="w-full h-48 p-4 border rounded-lg resize-none"
              maxLength={500}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={state.agreed}
                onChange={(e) => setState(prev => ({ ...prev, agreed: e.target.checked }))}
                className="h-5 w-5"
              />
              <label>I agree to send messages to selected contacts</label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderStep()}
        
        <div className="mt-6 flex justify-between">
          {state.step !== 'method' && (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}
          
          <div className="flex space-x-4">
            <button
              onClick={() => setState({
                step: 'method',
                method: null,
                selectedContacts: new Set(),
                message: '',
                agreed: false
              })}
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
            
            {state.step === 'message' ? (
              <button
                disabled={!state.agreed}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg ${
                  state.agreed
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={20} />
                <span>Send</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={state.method === null}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg ${
                  state.method !== null
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};