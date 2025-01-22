import React, { useState } from 'react';
import { MapPin, Users, School, Bell, UserCheck, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminHome } from './tabs/AdminHome';
import { AdminCommunication } from './tabs/AdminCommunication';
import { AdminTransport } from './tabs/AdminTransport';
import { AdminStudent } from './tabs/AdminStudent';
import { AdminTeacher } from './tabs/AdminTeacher';
import { AdminAdmission } from './tabs/AdminAdmission';

export const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: School },
    { id: 'communication', label: 'Communication', icon: Bell },
    { id: 'transport', label: 'Transport', icon: MapPin },
    { id: 'student', label: 'Student', icon: Users },
    { id: 'teacher', label: 'Teacher', icon: UserCheck },
    { id: 'admission', label: 'Admission', icon: GraduationCap }
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'home':
        return <AdminHome />;
      case 'communication':
        return <AdminCommunication />;
      case 'transport':
        return <AdminTransport />;
      case 'student':
        return <AdminStudent />;
      case 'teacher':
        return <AdminTeacher />;
      case 'admission':
        return <AdminAdmission />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="flex-1 flex">
      {/* Left Panel */}
      <div className={`${isPanelCollapsed ? 'w-16' : 'w-64'} bg-white border-r flex flex-col transition-all duration-300`}>
        <div className="p-4 space-y-2 flex-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {!isPanelCollapsed && <span>{tab.label}</span>}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
          className="p-4 border-t text-gray-500 hover:bg-gray-50"
        >
          {isPanelCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {renderContent()}
      </div>
    </div>
  );
};