import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, CreditCard, Calendar } from 'lucide-react';
import { useAuth } from '../../store/useAuth'; // Import useAuth

interface SubscriptionPlan {
  duration: string;
  price: number;
  features: string[];
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    duration: '1 Month',
    price: 49,
    features: ['All features included', '24/7 support', 'Regular updates'],
  },
  {
    duration: '6 Months',
    price: 249,
    features: ['All features included', '24/7 support', 'Regular updates', '10% discount'],
  },
  {
    duration: '1 Year',
    price: 449,
    features: ['All features included', '24/7 support', 'Regular updates', '20% discount'],
  },
];

export function MyProfile() {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const [fullName, setFullName] = useState(user?.name);
  const [mobile, setMobile] = useState('+1 234-567-8900');
  const [currentPlan] = useState('Basic');
  const [expiryDate] = useState('2024-12-31');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {user?.avatar && (
                <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full" />
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 flex items-center gap-2 text-gray-600">
                <Mail size={20} />
                <span>{user?.email || 'N/A'}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Current Plan</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600">
              <CreditCard size={20} />
              <span>Plan: {currentPlan}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={20} />
              <span>Expires: {expiryDate}</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Request Trial
            </button>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div key={plan.duration} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium">{plan.duration}</h3>
              <p className="mt-2 text-3xl font-bold">${plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
