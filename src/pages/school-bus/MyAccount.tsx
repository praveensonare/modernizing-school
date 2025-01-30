import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';
interface RouteStation {
  name: string;
  pickTime: string;
  dropTime: string;
}

interface StaffMember {
  role: string;
  name: string;
  phone: string;
}

export default function MyAccount() {
  const schoolName = "ABC School";
  const staff: StaffMember[] = [
    {
      role: "Transport Head",
      name: "Robert Wilson",
      phone: "+1234567890"
    },
    {
      role: "Driver",
      name: "John Driver",
      phone: "+1234567891"
    },
    {
      role: "Assistant",
      name: "Jane Assistant",
      phone: "+1234567892"
    }
  ];

  const route: RouteStation[] = [
    {
      name: "Green Valley",
      pickTime: "7:30 AM",
      dropTime: "3:40 PM"
    },
    {
      name: "Riverside Park",
      pickTime: "7:40 AM",
      dropTime: "3:30 PM"
    },
    {
      name: "Oak Street",
      pickTime: "7:50 AM",
      dropTime: "3:20 PM"
    },
    {
      name: "Maple Avenue",
      pickTime: "8:00 AM",
      dropTime: "3:15 PM"
    },
    {
      name: "Pine Heights",
      pickTime: "8:10 AM",
      dropTime: "3:10 PM"
    },
    {
      name: "Cedar Lane",
      pickTime: "8:20 AM",
      dropTime: "3:05 PM"
    },
    {
      name: "Birch Road",
      pickTime: "8:30 AM",
      dropTime: "3:00 PM"
    },
    {
      name: "Elm Street",
      pickTime: "8:40 AM",
      dropTime: "2:55 PM"
    },
    {
      name: "School",
      pickTime: "8:50 AM",
      dropTime: "2:45 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16 pt-16">
      <Header />
      
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold mb-4">{schoolName}</h2>
          
          {staff.map((member, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="font-semibold">{member.role}</h3>
              <p className="text-gray-600">{member.name}</p>
              
              <div className="flex items-center space-x-4 mt-2">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center space-x-1 text-blue-600"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
                
                <a
                  href={`https://wa.me/${member.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-green-600"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-4">Route Schedule</h3>
          
          <div className="space-y-3">
            {route.map((station, index) => (
              <div key={index} className="border-b last:border-0 pb-3">
                <h4 className="font-medium">{station.name}</h4>
                <div className="text-sm text-gray-600">
                  <p>Morning Pick-up: {station.pickTime}</p>
                  <p>Afternoon Drop-off: {station.dropTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}