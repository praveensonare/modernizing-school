import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  Bus,
  Users,
  UserCog,
  GraduationCap,
  UserPlus,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface AdminSidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: Home, label: 'Home', path: '/admin' },
  {
    icon: MessageSquare,
    label: 'Communication',
    path: '/admin/communication',
  },
  { icon: Bus, label: 'Transport', path: '/admin/transport' },
  { icon: Users, label: 'Student', path: '/admin/student' },
  { icon: UserCog, label: 'Teacher', path: '/admin/teacher' },
  {
    icon: GraduationCap,
    label: 'Admission',
    path: '/admin/admission',
  },
  {
    icon: UserPlus,
    label: 'Add Student',
    path: '/admin/add-student',
  },
];

export function AdminSidebar({ expanded, onToggle }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300',
        expanded ? 'w-64' : 'w-20'
      )}
    >
      <div className="p-4 flex justify-end">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          {expanded ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      </div>

      <nav className="space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                'hover:bg-gray-100',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700',
                !expanded && 'justify-center'
              )
            }
          >
            <item.icon size={20} />
            {expanded && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}