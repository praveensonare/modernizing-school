import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Teacher/Layout';
import TeacherDashboard from './../pages/teacher/index';
import TeacherInbox from '../pages/teacher/inbox';
import TeacherMeeting from '../pages/teacher/meeting';
import TeacherMyClass from '../pages/teacher/myclass';
import TeacherProfile from '../pages/teacher/myprofile';
import ProtectedRoute from '../components/ProtectedRoute';

function TeacherRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/inbox" element={<ProtectedRoute><TeacherInbox /></ProtectedRoute>} />
        <Route path="/meeting" element={<ProtectedRoute><TeacherMeeting /></ProtectedRoute>} />
        <Route path="/myclass" element={<ProtectedRoute><TeacherMyClass /></ProtectedRoute>} />
        <Route path="/myprofile" element={<ProtectedRoute><TeacherProfile /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}

export default TeacherRoutes;
