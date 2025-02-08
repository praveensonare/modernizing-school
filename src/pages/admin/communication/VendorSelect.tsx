import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  photo: string;
  whatsapp: string;
  email: string;
}

interface Vendor {
  id: string;
  name: string;
  photo: string;
  whatsapp: string;
  email: string;
}

const dummyVendors: Vendor[] = [
  {
    id: '1',
    name: 'ABC Supplies',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    whatsapp: '+1234567890',
    email: 'contact@abcsupplies.com',
  },
  {
    id: '2',
    name: 'XYZ Services',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    whatsapp: '+1234567891',
    email: 'info@xyzservices.com',
  },
  {
    id: '3',
    name: 'PQR Tech',
    photo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    whatsapp: '+1234567892',
    email: 'support@pqrtech.com',
  },
  {
    id: '4',
    name: 'Global Trading',
    photo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
    whatsapp: '+1234567893',
    email: 'sales@globaltrading.com',
  },
  {
    id: '5',
    name: 'Acme Corporation',
    photo: 'https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9',
    whatsapp: '+1234567894',
    email: 'info@acmecorp.com',
  },
  {
    id: '6',
    name: 'Delta Electronics',
    photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    whatsapp: '+1234567895',
    email: 'contact@deltaelectronics.com',
  },
  {
    id: '7',
    name: 'Sunrise Interiors',
    photo: 'https://images.unsplash.com/photo-1505842465776-3d90c2b884ed',
    whatsapp: '+1234567896',
    email: 'hello@sunriseinteriors.com',
  },
  {
    id: '8',
    name: 'Mountain Equipment',
    photo: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde',
    whatsapp: '+1234567897',
    email: 'info@mountainequipment.com',
  },
  {
    id: '9',
    name: 'Oceanic Logistics',
    photo: 'https://images.unsplash.com/photo-1514474959185-80f71a38b89d',
    whatsapp: '+1234567898',
    email: 'support@oceaniclogistics.com',
  },
  {
    id: '10',
    name: 'Zenith Foods',
    photo: 'https://images.unsplash.com/photo-1514516870922-6037c89d4c6d',
    whatsapp: '+1234567899',
    email: 'contact@zenithfoods.com',
  },
];



export function VendorSelect() {
  const navigate = useNavigate();
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());

  const toggleVendor = (vendorId: string) => {
    const newSelected = new Set(selectedVendors);
    if (newSelected.has(vendorId)) {
      newSelected.delete(vendorId);
    } else {
      newSelected.add(vendorId);
    }
    setSelectedVendors(newSelected);
  };

  const selectAll = () => {
    const allIds = dummyVendors.map(v => v.id);
    setSelectedVendors(new Set(allIds));
  };

  const deselectAll = () => {
    setSelectedVendors(new Set());
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Select Vendors</h1>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedVendors.size === dummyVendors.length}
                onChange={(e) => e.target.checked ? selectAll() : deselectAll()}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </label>
          </div>
          <span className="text-gray-500">
            {selectedVendors.size} vendors selected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-96 overflow-y-auto">
        {dummyVendors.map((vendor) => (
          <div
            key={vendor.id}
            className={`relative bg-white rounded-lg shadow-sm p-4 cursor-pointer
              ${selectedVendors.has(vendor.id) ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => toggleVendor(vendor.id)}
          >
            {selectedVendors.has(vendor.id) && (
              <div className="absolute top-2 right-2">
                <Check className="text-blue-500" size={20} />
              </div>
            )}
            <img
              src={vendor.photo}
              alt={vendor.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-medium text-center">{vendor.name}</h3>
            <div className="mt-2 text-sm text-gray-500 text-center">
              <p>{vendor.whatsapp}</p>
              <p>{vendor.email}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/admin/comm/student')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/admin/communication')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/admin/comm/review')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}