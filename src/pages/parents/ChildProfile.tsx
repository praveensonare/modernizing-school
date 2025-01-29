import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Plus, Save, X } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

interface ChildDetails {
  id: string;
  name: string;
  class: string;
  dateOfBirth: string;
  bloodGroup: string;
  profilePicture: string;
  wellness: {
    allergies: string[];
    medications: string[];
    conditions: string[];
  };
  emergencyContacts: EmergencyContact[];
}

const childData: ChildDetails = {
  id: '1',
  name: 'John Doe',
  class: 'Grade 5-A',
  dateOfBirth: '2014-05-15',
  bloodGroup: 'A+',
  profilePicture: 'https://images.unsplash.com/photo-1570632267781-46f97c2a4f76?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
  wellness: {
    allergies: ['Peanuts', 'Dust'],
    medications: ['Antihistamine'],
    conditions: ['Mild Asthma']
  },
  emergencyContacts: [
    {
      id: '1',
      name: 'Jane Doe',
      relation: 'Mother',
      phone: '+1234567890'
    },
    {
      id: '2',
      name: 'John Smith',
      relation: 'Uncle',
      phone: '+1234567891'
    }
  ]
};

export default function ChildProfile() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [child, setChild] = useState<ChildDetails>(childData);
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({});
  const [showNewContact, setShowNewContact] = useState(false);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload
      console.log('Uploading file:', file);
    }
  };

  const handleSave = () => {
    console.log('Saving changes:', child);
    setIsEditing(false);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.relation && newContact.phone) {
      setChild(prev => ({
        ...prev,
        emergencyContacts: [
          ...prev.emergencyContacts,
          { id: Date.now().toString(), ...newContact as EmergencyContact }
        ]
      }));
      setNewContact({});
      setShowNewContact(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Child Profile</h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center px-4 py-2 rounded-md ${
              isEditing 
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isEditing ? (
              <>
                <Save size={16} className="mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Camera size={16} className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={child.profilePicture}
                alt={child.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                  <Camera size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={child.name}
                onChange={(e) => setChild(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <input
                type="text"
                value={child.class}
                onChange={(e) => setChild(prev => ({ ...prev, class: e.target.value }))}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={child.dateOfBirth}
                onChange={(e) => setChild(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <input
                type="text"
                value={child.bloodGroup}
                onChange={(e) => setChild(prev => ({ ...prev, bloodGroup: e.target.value }))}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Information */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Wellness Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
            <textarea
              value={child.wellness.allergies.join('\n')}
              onChange={(e) => setChild(prev => ({
                ...prev,
                wellness: {
                  ...prev.wellness,
                  allergies: e.target.value.split('\n').filter(Boolean)
                }
              }))}
              disabled={!isEditing}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medications</label>
            <textarea
              value={child.wellness.medications.join('\n')}
              onChange={(e) => setChild(prev => ({
                ...prev,
                wellness: {
                  ...prev.wellness,
                  medications: e.target.value.split('\n').filter(Boolean)
                }
              }))}
              disabled={!isEditing}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
            <textarea
              value={child.wellness.conditions.join('\n')}
              onChange={(e) => setChild(prev => ({
                ...prev,
                wellness: {
                  ...prev.wellness,
                  conditions: e.target.value.split('\n').filter(Boolean)
                }
              }))}
              disabled={!isEditing}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Emergency Contacts</h3>
          {isEditing && !showNewContact && (
            <button
              onClick={() => setShowNewContact(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Plus size={16} className="mr-2" />
              Add Contact
            </button>
          )}
        </div>

        <div className="space-y-4">
          {showNewContact && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newContact.name || ''}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Relation"
                  value={newContact.relation || ''}
                  onChange={(e) => setNewContact(prev => ({ ...prev, relation: e.target.value }))}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newContact.phone || ''}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowNewContact(false)}
                  className="flex items-center px-3 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Plus size={16} className="mr-1" />
                  Add
                </button>
              </div>
            </div>
          )}

          {child.emergencyContacts.map((contact) => (
            <div key={contact.id} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => {
                      if (isEditing) {
                        setChild(prev => ({
                          ...prev,
                          emergencyContacts: prev.emergencyContacts.map(c =>
                            c.id === contact.id ? { ...c, name: e.target.value } : c
                          )
                        }));
                      }
                    }}
                    disabled={!isEditing}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                  <input
                    type="text"
                    value={contact.relation}
                    onChange={(e) => {
                      if (isEditing) {
                        setChild(prev => ({
                          ...prev,
                          emergencyContacts: prev.emergencyContacts.map(c =>
                            c.id === contact.id ? { ...c, relation: e.target.value } : c
                          )
                        }));
                      }
                    }}
                    disabled={!isEditing}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => {
                      if (isEditing) {
                        setChild(prev => ({
                          ...prev,
                          emergencyContacts: prev.emergencyContacts.map(c =>
                            c.id === contact.id ? { ...c, phone: e.target.value } : c
                          )
                        }));
                      }
                    }}
                    disabled={!isEditing}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}