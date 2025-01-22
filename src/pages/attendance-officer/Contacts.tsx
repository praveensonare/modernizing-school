import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

interface Contact {
  role: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
}

interface EmergencyContact {
  service: string;
  number: string;
}

const SCHOOL_CONTACTS: Contact[] = [
  {
    role: 'Admin',
    name: 'Sarah Wilson',
    phone: '+1234567890',
    whatsapp: '+1234567890',
    email: 'admin@school.com'
  },
  {
    role: 'Principal',
    name: 'David Thompson',
    phone: '+1234567891',
    whatsapp: '+1234567891',
    email: 'principal@school.com'
  },
  {
    role: 'Transport Head',
    name: 'Michael Brown',
    phone: '+1234567892',
    whatsapp: '+1234567892',
    email: 'transport@school.com'
  }
];

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { service: 'Police', number: '911' },
  { service: 'Ambulance', number: '112' },
  { service: 'Hospital', number: '+1234567893' },
  { service: 'Fire', number: '101' }
];

export const Contacts: React.FC = () => {
  return (
    <div className="flex-1 p-4 space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-4">School Contacts</h2>
        <div className="space-y-4">
          {SCHOOL_CONTACTS.map((contact, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-lg mb-2">{contact.role}</h3>
              <p className="text-gray-600 mb-1">{contact.name}</p>
              <div className="space-y-2">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-2 text-blue-600"
                >
                  <Phone size={20} />
                  <span>{contact.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-600"
                >
                  <MessageSquare size={20} />
                  <span>{contact.whatsapp}</span>
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center space-x-2 text-red-600"
                >
                  <Mail size={20} />
                  <span>{contact.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-2 gap-4">
          {EMERGENCY_CONTACTS.map((contact, index) => (
            <a
              key={index}
              href={`tel:${contact.number}`}
              className="bg-red-500 text-white rounded-lg p-4 flex flex-col items-center justify-center space-y-2"
            >
              <Phone size={24} />
              <span className="font-semibold">{contact.service}</span>
              <span>{contact.number}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};