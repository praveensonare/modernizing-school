import React, { useState } from 'react';
import { Phone, MessageSquare, Clock, Pencil, X, Check, Bus } from 'lucide-react';
import Header from './../../components/SchoolBus/Header';
import Footer from './../../components/SchoolBus/Footer';

interface Staff {
  id: number;
  role: string;
  name: string;
  phone: string;
  whatsapp: string;
}

interface Route {
  name: string;
  pickTime: string;
  dropTime: string;
}

export default function MyAccount() {
  const [editingStaffId, setEditingStaffId] = useState<number | null>(null);
  const [editedStaff, setEditedStaff] = useState<Staff | null>(null);
  const schoolName = "ABC School";
  const userEmail = "admin@abcschool.com";
  const routeNumber = "R-123";
  const busNumber = "B-456";

  const staff: Staff[] = [
    { id: 1, role: 'Transport Head', name: 'John Doe', phone: '+1234567890', whatsapp: '+1234567890' },
    { id: 2, role: 'Driver', name: 'Jane Smith', phone: '+1234567891', whatsapp: '+1234567891' },
    { id: 3, role: 'Assistant', name: 'Mike Johnson', phone: '+1234567892', whatsapp: '+1234567892' }
  ];

  const route: Route[] = [
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

  const handleEdit = (member: Staff) => {
    setEditingStaffId(member.id);
    setEditedStaff(member);
  };

  const handleSave = () => {
    // API call would go here
    setEditingStaffId(null);
    setEditedStaff(null);
  };

  const handleCancel = () => {
    setEditingStaffId(null);
    setEditedStaff(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-16 pt-16">
      <Header />
      
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {schoolName}
            </h2>
            <p className="text-slate-600">{userEmail}</p>
          </div>

          <div className="space-y-6">
            {staff.map((member) => (
              <div key={member.id} className="border-b border-slate-100 last:border-0 pb-6">
                {editingStaffId === member.id && editedStaff ? (
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Name</label>
                        <input
                          type="text"
                          value={editedStaff.name}
                          onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
                          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Phone</label>
                        <input
                          type="tel"
                          value={editedStaff.phone}
                          onChange={(e) => setEditedStaff({ ...editedStaff, phone: e.target.value })}
                          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">WhatsApp</label>
                        <input
                          type="tel"
                          value={editedStaff.whatsapp}
                          onChange={(e) => setEditedStaff({ ...editedStaff, whatsapp: e.target.value })}
                          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-3 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-slate-800">{member.role}</h3>
                        <p className="text-slate-600">{member.name}</p>
                      </div>
                      {member.role !== 'Transport Head' && (
                        <button
                          onClick={() => handleEdit(member)}
                          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
                        >
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call</span>
                      </a>
                      
                      <a
                        href={`https://wa.me/${member.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800">Route Details</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-violet-50 px-3 py-1.5 rounded-lg">
                <Bus className="w-4 h-4 text-violet-600" />
                <span className="text-violet-600 font-medium">{routeNumber}</span>
              </div>
              <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-lg">
                <span className="text-indigo-600 font-medium">{busNumber}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {route.map((station, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="font-medium text-slate-700">{station.name}</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded">
                    {station.pickTime}
                  </span>
                  <span className="bg-amber-50 text-amber-600 px-2 py-1 rounded">
                    {station.dropTime}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-600">Pick Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-slate-600">Drop Time</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}