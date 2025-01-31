import React, { useState } from 'react';
import { Plus, X, Mail, Phone } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  photo: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  qualification: string;
  joinDate: string;
}

const dummyTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    email: 'sarah.johnson@school.com',
    phone: '+1234567890',
    subjects: ['Mathematics', 'Physics'],
    classes: ['10A', '11B'],
    qualification: 'M.Sc. Mathematics',
    joinDate: '2020-08-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    email: 'michael.chen@school.com',
    phone: '+1234567891',
    subjects: ['English', 'Literature'],
    classes: ['9A', '10B'],
    qualification: 'M.A. English Literature',
    joinDate: '2019-06-20',
  },
];

interface NewTeacherForm {
  name: string;
  photo: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  qualification: string;
}

const initialFormState: NewTeacherForm = {
  name: '',
  photo: '',
  email: '',
  phone: '',
  subjects: [],
  classes: [],
  qualification: '',
};

export function Teacher() {
  const [showNewTeacherForm, setShowNewTeacherForm] = useState(false);
  const [formData, setFormData] = useState<NewTeacherForm>(initialFormState);
  const [newSubject, setNewSubject] = useState('');
  const [newClass, setNewClass] = useState('');

  const handleAddSubject = () => {
    if (newSubject && !formData.subjects.includes(newSubject)) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, newSubject],
      });
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subject),
    });
  };

  const handleAddClass = () => {
    if (newClass && !formData.classes.includes(newClass)) {
      setFormData({
        ...formData,
        classes: [...formData.classes, newClass],
      });
      setNewClass('');
    }
  };

  const handleRemoveClass = (className: string) => {
    setFormData({
      ...formData,
      classes: formData.classes.filter((c) => c !== className),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the new teacher
    setShowNewTeacherForm(false);
    setFormData(initialFormState);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Teachers</h1>
        <button
          onClick={() => setShowNewTeacherForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {dummyTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-lg">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.qualification}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span>{teacher.phone}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Classes</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.classes.map((className) => (
                    <span
                      key={className}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewTeacherForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Teacher</h2>
              <button
                onClick={() => setShowNewTeacherForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) =>
                      setFormData({ ...formData, photo: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({ ...formData, qualification: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Add subject"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubject}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {subject}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(subject)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classes
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    placeholder="Add class"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddClass}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.classes.map((className) => (
                    <span
                      key={className}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {className}
                      <button
                        type="button"
                        onClick={() => handleRemoveClass(className)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewTeacherForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}