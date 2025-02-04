import React, { useState } from 'react';
import { Clock, ArrowLeft, BookOpen, Users } from 'lucide-react';
import EnrollStudentModal from './../../components/Teacher/EnrollStudentModal';

interface Student {
  id: string;
  name: string;
  present: boolean;
  selected?: boolean;
}

interface Schedule {
  id: string;
  time: string;
  topic: string;
  totalStudents: number;
  students: Student[];
}

const TeacherDashboard = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [schedules] = useState<Schedule[]>([
    {
      id: '1',
      time: '09:00 AM - 10:00 AM',
      topic: 'Mathematics - Algebra',
      totalStudents: 25,
      students: [
        { id: '1', name: 'John Doe', present: true },
        { id: '2', name: 'Jane Smith', present: false },
      ]
    },
    {
      id: '2',
      time: '10:00 AM - 11:00 AM',
      topic: 'English Literature',
      totalStudents: 22,
      students: [
        { id: '3', name: 'Alice Johnson', present: true },
        { id: '4', name: 'Bob Wilson', present: true },
      ]
    },
    {
      id: '3',
      time: '11:00 AM - 12:00 PM',
      topic: 'Physics - Mechanics',
      totalStudents: 20,
      students: [
        { id: '5', name: 'Charlie Brown', present: false },
        { id: '6', name: 'Diana Prince', present: true },
      ]
    },
    {
      id: '4',
      time: '01:00 PM - 02:00 PM',
      topic: 'Chemistry Lab',
      totalStudents: 18,
      students: [
        { id: '7', name: 'Eve Anderson', present: true },
        { id: '8', name: 'Frank Miller', present: true },
      ]
    },
    {
      id: '5',
      time: '02:00 PM - 03:00 PM',
      topic: 'Computer Science',
      totalStudents: 24,
      students: [
        { id: '9', name: 'Grace Lee', present: true },
        { id: '10', name: 'Henry Ford', present: false },
      ]
    },
    {
      id: '6',
      time: '03:00 PM - 04:00 PM',
      topic: 'History - World Wars',
      totalStudents: 23,
      students: [
        { id: '11', name: 'Iris West', present: true },
        { id: '12', name: 'Jack Ryan', present: true },
      ]
    }
  ]);

  const handleStudentSelection = (studentId: string) => {
    if (selectedSchedule) {
      const updatedStudents = selectedSchedule.students.map(student => 
        student.id === studentId ? { ...student, selected: !student.selected } : student
      );
      setSelectedSchedule({ ...selectedSchedule, students: updatedStudents });
    }
  };

  const handleRemoveSelected = () => {
    if (selectedSchedule) {
      const remainingStudents = selectedSchedule.students.filter(student => !student.selected);
      const updatedSchedule = {
        ...selectedSchedule,
        students: remainingStudents,
        totalStudents: remainingStudents.length
      };
      setSelectedSchedule(updatedSchedule);
    }
  };

  const handleEnrollStudent = (studentId: string) => {
    if (selectedSchedule) {
      const newStudent = {
        id: studentId,
        name: `Student ${studentId}`,
        present: false
      };
      
      const updatedSchedule = {
        ...selectedSchedule,
        students: [...selectedSchedule.students, newStudent],
        totalStudents: selectedSchedule.totalStudents + 1
      };
      
      setSelectedSchedule(updatedSchedule);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {selectedSchedule ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedSchedule(null)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Schedule
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEnrollModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Enroll Student
              </button>
              <button
                onClick={handleRemoveSelected}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Remove Selected
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold">{selectedSchedule.topic}</h2>
              <div className="flex items-center mt-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>{selectedSchedule.time}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Students ({selectedSchedule.totalStudents})
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {selectedSchedule.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={student.selected || false}
                        onChange={() => handleStudentSelection(student.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-900">{student.name}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.present
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.present ? 'Present' : 'Absent'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Today's Schedule</h1>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                onClick={() => setSelectedSchedule(schedule)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                  <div className="flex items-center text-sm mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{schedule.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    {schedule.topic}
                  </h3>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">Total Students</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {schedule.totalStudents}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <EnrollStudentModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        onEnroll={handleEnrollStudent}
      />
    </div>
  );
};

export default TeacherDashboard;