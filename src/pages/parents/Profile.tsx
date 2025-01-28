import React from 'react';
import { Phone, MessageSquare, Home as HomeIcon } from 'lucide-react';

interface EmergencyContact {
  name: string;
  phone: string;
}

interface Address {
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
}

const emergencyContacts: EmergencyContact[] = [
  { name: 'John Smith', phone: '+1234567890' },
  { name: 'Jane Doe', phone: '+1234567891' }
];

const address: Address = {
  line1: '123 Main Street',
  line2: 'Apt 4B',
  city: 'New York, NY',
  postalCode: '10001'
};

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Emergency Contacts</h2>
        <div className="space-y-6">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-medium mb-2">{contact.name}</h3>
              <div className="flex space-x-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                >
                  <Phone size={16} />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <HomeIcon className="mr-2" />
          Home Address
        </h2>
        <div className="space-y-2">
          <p className="text-gray-700">{address.line1}</p>
          <p className="text-gray-700">{address.line2}</p>
          <p className="text-gray-700">{address.city}</p>
          <p className="text-gray-700">{address.postalCode}</p>
        </div>
      </section>
    </div>
  );
}