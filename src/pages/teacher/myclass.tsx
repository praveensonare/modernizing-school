import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, Plus, Trash2, Edit2, Save, Phone, MessageCircle, X } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  image: string;
  present: boolean;
  schoolId: string;
  medicalCondition: string;
  allergy: string;
  emergencyContacts: {
    name: string;
    relation: string;
    phone: string;
    whatsapp: string;
  }[];
}

interface ClassDetails {
  image: string;
  name: string;
  teacherName: string;
  assistantTeacher: string;
  students: Student[];
  weeklySchedule: {
    day: string;
    slots: {
      time: string;
      subject: string;
    }[];
  }[];
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const MyClass = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Omit<Schedule, 'id'>>({
    day: DAYS_OF_WEEK[0],
    fromTime: '',
    toTime: '',
    title: ''
  });
  const [classDetails, setClassDetails] = useState<ClassDetails>({
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500',
    name: 'Class 8-A',
    teacherName: 'Sarah Johnson',
    assistantTeacher: 'Michael Brown',
    students: [
      {
        id: '1',
        name: 'John Smith',
        image: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=150',
        present: true, schoolId: 'STU2024001', 
	medicalCondition: 'None',
        allergy: 'Peanuts',
        emergencyContacts: [
          { name: 'Mr. Smith', relation: 'Father', phone: '+1 (555) 123-4567', whatsapp: '+1 (555) 123-4567' },
          { name: 'Mrs. Smith', relation: 'Mother', phone: '+1 (555) 765-4321', whatsapp: '+1 (555) 765-4321' }
        ]
      },
      // Add more students
      {
        id: '5',
        name: 'Charlotte King',
        image: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=150',
        present: true, schoolId: 'STU2024001', 
	medicalCondition: 'None',
        allergy: 'Peanuts',
        emergencyContacts: [
          { name: 'Mr. Smith', relation: 'Father', phone: '+1 (555) 123-4567', whatsapp: '+1 (555) 123-4567' },
          { name: 'Mrs. Smith', relation: 'Mother', phone: '+1 (555) 765-4321', whatsapp: '+1 (555) 765-4321' }
        ]
      },
      {
        id: '2',
        name: 'William Taylor',
        image: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=150',
        present: true, schoolId: 'STU2024001', 
	medicalCondition: 'None',
        allergy: 'Peanuts',
        emergencyContacts: [
          { name: 'Mr. Smith', relation: 'Father', phone: '+1 (555) 123-4567', whatsapp: '+1 (555) 123-4567' },
          { name: 'Mrs. Smith', relation: 'Mother', phone: '+1 (555) 765-4321', whatsapp: '+1 (555) 765-4321' }
        ]
      },
      {
        id: '3',
        name: 'Michael Brown',
        image: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=150',
        present: true, schoolId: 'STU2024001', 
	medicalCondition: 'None',
        allergy: 'Peanuts',
        emergencyContacts: [
          { name: 'Mr. Smith', relation: 'Father', phone: '+1 (555) 123-4567', whatsapp: '+1 (555) 123-4567' },
          { name: 'Mrs. Smith', relation: 'Mother', phone: '+1 (555) 765-4321', whatsapp: '+1 (555) 765-4321' }
        ]
      },
      {
        id: '4',
        name: 'Emma Wilson',
        image: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=150',
        present: true, schoolId: 'STU2024001', 
	medicalCondition: 'None',
        allergy: 'Peanuts',
        emergencyContacts: [
          { name: 'Mr. Smith', relation: 'Father', phone: '+1 (555) 123-4567', whatsapp: '+1 (555) 123-4567' },
          { name: 'Mrs. Smith', relation: 'Mother', phone: '+1 (555) 765-4321', whatsapp: '+1 (555) 765-4321' }
        ]
      },
    ],
    weeklySchedule: [
      {
        day: 'Monday',
        slots: [
          { time: '9:00 AM - 10:30 AM', subject: 'Mathematics' },
          { time: '11:00 AM - 12:30 PM', subject: 'Science' }
        ]
      },
      // Add more days
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add API call to save class details
  };

  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: '1', day: 'Monday', fromTime: '09:00', toTime: '10:30', title: 'Mathematics' },
    { id: '2', day: 'Monday', fromTime: '11:00', toTime: '12:30', title: 'Science' },
    { id: '3', day: 'Tuesday', fromTime: '09:00', toTime: '10:30', title: 'English' },
    { id: '4', day: 'Tuesday', fromTime: '11:00', toTime: '12:30', title: 'History' }
  ]);
    const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = String(schedules.length + 1);
    setSchedules([...schedules, { ...newSchedule, id: newId }]);
    setShowAddScheduleModal(false);
    setNewSchedule({
      day: DAYS_OF_WEEK[0],
      fromTime: '',
      toTime: '',
      title: ''
    });
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/teacher')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="space-y-6">
          {/* Class Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="relative h-48">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500"
              alt="Class"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-75"></div>
            <div className="absolute inset-0 p-6 flex items-center text-white">
                <h1 className="text-3xl font-bold">{classDetails.name}</h1>
              </div>
              <div className="absolute top-4 right-4">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={classDetails.teacherName}
                      onChange={(e) =>
                        setClassDetails({
                          ...classDetails,
                          teacherName: e.target.value
                        })
                      }
                      className="w-full p-2 border rounded-md mt-1"
                    />
                  ) : (
                    <h2 className="text-sm font-medium text-gray-500">
                      {classDetails.teacherName}
                    </h2>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={classDetails.assistantTeacher}
                      onChange={(e) =>
                        setClassDetails({
                          ...classDetails,
                          assistantTeacher: e.target.value
                        })
                      }
                      className="w-full p-2 border rounded-md mt-1"
                    />
                  ) : (
                    <h3 className="text-sm font-medium text-gray-500">
                      {classDetails.assistantTeacher}
                    </h3>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
              Students ({classDetails.students.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {classDetails.students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <img
                    src={student.image}
                    alt={student.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{student.name}</h3>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        student.present
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.present ? 'Present' : 'Absent'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        {/* Weekly Schedule */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Weekly Schedule
            </h2>
            <button
              onClick={() => setShowAddScheduleModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </button>
          </div>
          <div className="space-y-4">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="border-b last:border-0 pb-4">
                <h3 className="font-medium text-gray-900 mb-2">{day}</h3>
                <div className="space-y-2">
                  {schedules
                    .filter(schedule => schedule.day === day)
                    .map(schedule => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">
                            {schedule.fromTime} - {schedule.toTime}
                          </span>
                          <span className="font-medium text-gray-900">
                            {schedule.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Add Schedule Modal */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Add New Schedule
              </h3>
              <button
                onClick={() => setShowAddScheduleModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Day
                </label>
                <select
                  value={newSchedule.day}
                  onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  {DAYS_OF_WEEK.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From Time
                </label>
                <input
                  type="time"
                  value={newSchedule.fromTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, fromTime: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To Time
                </label>
                <input
                  type="time"
                  value={newSchedule.toTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, toTime: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddScheduleModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Student Details Sidebar */}
      {selectedStudent && (
        <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Student Details
                </h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedStudent.image}
                    alt={selectedStudent.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedStudent.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ID: {selectedStudent.schoolId}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Medical Condition
                    </h4>
                    <p className="mt-1 text-gray-900">
                      {selectedStudent.medicalCondition}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Allergies
                    </h4>
                    <p className="mt-1 text-gray-900">{selectedStudent.allergy}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Emergency Contacts
                  </h4>
                  <div className="space-y-4">
                    {selectedStudent.emergencyContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">
                              {contact.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {contact.relation}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <a
                              href={`tel:${contact.phone}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            >
                              <Phone className="h-5 w-5" />
                            </a>
                            <a
                              href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                            >
                              <MessageCircle className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClass;