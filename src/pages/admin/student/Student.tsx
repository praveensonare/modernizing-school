import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, X } from 'lucide-react';

interface Class {
  id: string;
  name: string;
  photo: string;
  classTeacher: string;
  assistantTeacher: string;
  totalStudents: number;
}

const dummyClasses: Class[] = [
  {
    id: '1',
    name: '10A',
    photo: 'https://images.unsplash.com/photo-1577896851231-70ef18881754',
    classTeacher: 'Sarah Johnson',
    assistantTeacher: 'Michael Chen',
    totalStudents: 30,
  },
  {
    id: '2',
    name: '9B',
    photo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
    classTeacher: 'Robert Wilson',
    assistantTeacher: 'Emily Davis',
    totalStudents: 28,
  },
];

interface NewClassForm {
  name: string;
  photo: string;
  classTeacher: string;
  assistantTeacher: string;
  totalStudents: number;
  timeTable: {
    day: string;
    subjects: {
      time: string;
      subject: string;
      teacher: string;
    }[];
  }[];
}

const initialFormState: NewClassForm = {
  name: '',
  photo: '',
  classTeacher: '',
  assistantTeacher: '',
  totalStudents: 0,
  timeTable: [
    {
      day: 'Monday',
      subjects: [],
    },
    {
      day: 'Tuesday',
      subjects: [],
    },
    {
      day: 'Wednesday',
      subjects: [],
    },
    {
      day: 'Thursday',
      subjects: [],
    },
    {
      day: 'Friday',
      subjects: [],
    },
  ],
};

export function Student() {
  const navigate = useNavigate();
  const [showNewClassForm, setShowNewClassForm] = useState(false);
  const [formData, setFormData] = useState<NewClassForm>(initialFormState);

  const handleAddSubject = (dayIndex: number) => {
    const newTimeTable = [...formData.timeTable];
    newTimeTable[dayIndex].subjects.push({
      time: '',
      subject: '',
      teacher: '',
    });
    setFormData({ ...formData, timeTable: newTimeTable });
  };

  const handleRemoveSubject = (dayIndex: number, subjectIndex: number) => {
    const newTimeTable = [...formData.timeTable];
    newTimeTable[dayIndex].subjects.splice(subjectIndex, 1);
    setFormData({ ...formData, timeTable: newTimeTable });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the new class
    setShowNewClassForm(false);
    setFormData(initialFormState);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Classes</h1>
        <button
          onClick={() => setShowNewClassForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          New Class
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {dummyClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/admin/student/class')}
          >
            <img
              src={classItem.photo}
              alt={`Class ${classItem.name}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">Class {classItem.name}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>Class Teacher: {classItem.classTeacher}</p>
                <p>Assistant: {classItem.assistantTeacher}</p>
                <p>Total Students: {classItem.totalStudents}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewClassForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Create New Class</h2>
              <button
                onClick={() => setShowNewClassForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Class Name
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
                    Class Teacher
                  </label>
                  <input
                    type="text"
                    value={formData.classTeacher}
                    onChange={(e) =>
                      setFormData({ ...formData, classTeacher: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assistant Teacher
                  </label>
                  <input
                    type="text"
                    value={formData.assistantTeacher}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assistantTeacher: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Students
                  </label>
                  <input
                    type="number"
                    value={formData.totalStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalStudents: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Time Table</h3>
                {formData.timeTable.map((day, dayIndex) => (
                  <div key={day.day} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{day.day}</h4>
                      <button
                        type="button"
                        onClick={() => handleAddSubject(dayIndex)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Add Subject
                      </button>
                    </div>
                    {day.subjects.map((subject, subjectIndex) => (
                      <div
                        key={subjectIndex}
                        className="grid grid-cols-4 gap-4 mb-2"
                      >
                        <div>
                          <input
                            type="time"
                            value={subject.time}
                            onChange={(e) => {
                              const newTimeTable = [...formData.timeTable];
                              newTimeTable[dayIndex].subjects[
                                subjectIndex
                              ].time = e.target.value;
                              setFormData({
                                ...formData,
                                timeTable: newTimeTable,
                              });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Subject"
                            value={subject.subject}
                            onChange={(e) => {
                              const newTimeTable = [...formData.timeTable];
                              newTimeTable[dayIndex].subjects[
                                subjectIndex
                              ].subject = e.target.value;
                              setFormData({
                                ...formData,
                                timeTable: newTimeTable,
                              });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Teacher"
                            value={subject.teacher}
                            onChange={(e) => {
                              const newTimeTable = [...formData.timeTable];
                              newTimeTable[dayIndex].subjects[
                                subjectIndex
                              ].teacher = e.target.value;
                              setFormData({
                                ...formData,
                                timeTable: newTimeTable,
                              });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSubject(dayIndex, subjectIndex)
                            }
                            className="mt-1 p-2 text-red-600 hover:text-red-700"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewClassForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}