import React, { useState } from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
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
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      time: '09:00 AM - 10:30 AM',
      topic: 'Mathematics - Algebra',
      totalStudents: 25,
      students: [
        { id: '1', name: 'John Doe', present: true },
        { id: '2', name: 'Jane Smith', present: false },
        // Add more students as needed
      ]
    },
    // Add more schedules as needed
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
      
      // Update the schedules array
      const updatedSchedules = schedules.map(schedule =>
        schedule.id === selectedSchedule.id ? updatedSchedule : schedule
      );
      setSchedules(updatedSchedules);
    }
  };

  const handleEnrollStudent = (studentId: string) => {
    if (selectedSchedule) {
      const newStudent = {
        id: studentId,
        name: `Student ${studentId}`, // In real app, fetch student name from API
        present: false
      };
      
      const updatedSchedule = {
        ...selectedSchedule,
        students: [...selectedSchedule.students, newStudent],
        totalStudents: selectedSchedule.totalStudents + 1
      };
      
      setSelectedSchedule(updatedSchedule);
      
      // Update the schedules array
      const updatedSchedules = schedules.map(schedule =>
        schedule.id === selectedSchedule.id ? updatedSchedule : schedule
      );
      setSchedules(updatedSchedules);
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
              Back to Dashboard
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEnrollModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                + Enroll
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
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedSchedule.topic}</h2>
              <div className="flex items-center mt-2 text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{selectedSchedule.time}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
          <h1 className="text-3xl font-bold text-gray-900">Today's Schedule</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                onClick={() => setSelectedSchedule(schedule)}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition-transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{schedule.time}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {schedule.totalStudents} Students
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {schedule.topic}
                </h3>
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