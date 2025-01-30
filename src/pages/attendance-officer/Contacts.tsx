import React from 'react';
import Header from '../../components/Attendance-officer/Header';
import Footer from '../../components/Attendance-officer/Footer';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const contacts = {
  staff: [
    {
      role: 'Admin',
      name: 'Jane Smith',
      phone: '+1234567890',
      email: 'admin@school.com',
      whatsapp: '+1234567890'
    },
    {
      role: 'Principal',
      name: 'Dr. Robert Johnson',
      phone: '+1234567891',
      email: 'principal@school.com',
      whatsapp: '+1234567891'
    },
    {
      role: 'Transport Head',
      name: 'Mike Wilson',
      phone: '+1234567892',
      email: 'transport@school.com',
      whatsapp: '+1234567892'
    }
  ],
  emergency: [
    { name: 'Police', number: '911' },
    { name: 'Ambulance', number: '112' },
    { name: 'Hospital', number: '+1234567893' },
    { name: 'Fire Department', number: '101' }
  ]
};

export default function Contacts() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-16">
      <Header />
      
      <main className="max-w-md mx-auto p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Staff Contacts</h2>
          <div className="space-y-6">
            {contacts.staff.map((contact, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-lg">{contact.role}</h3>
                <p className="text-gray-600 text-sm mb-3">{contact.name}</p>
                
                <div className="space-y-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center space-x-2 text-blue-600"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{contact.phone}</span>
                  </a>
                  
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center space-x-2 text-blue-600"
                  >
                    <Mail className="h-5 w-5" />
                    <span>{contact.email}</span>
                  </a>
                  
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-600"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
          <div className="grid grid-cols-2 gap-4">
            {contacts.emergency.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className="bg-red-50 p-4 rounded-lg flex flex-col items-center space-y-2"
              >
                <Phone className="h-6 w-6 text-red-600" />
                <span className="font-medium text-red-600">{contact.name}</span>
                <span className="text-red-800">{contact.number}</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}