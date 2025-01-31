import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AttendanceOfficerHome from "../pages/attendance-officer/index";
import GPSAttendance from "../pages/attendance-officer/gps-attend";
import StudentSearch from "../pages/attendance-officer/student-search";
import Contacts from "./../pages/attendance-officer/Contacts";
import TapAttendance from "../pages/attendance-officer/TapAttendance";
import StudentProfile from "../pages/attendance-officer/student-account";


const AttendanceOfficerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><AttendanceOfficerHome /></ProtectedRoute>} />
      <Route path="/gps-attnd" element={<ProtectedRoute><GPSAttendance /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><StudentSearch /></ProtectedRoute>} />
      <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
      <Route path="/tap" element={<ProtectedRoute><TapAttendance /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
    </Routes>
  );
};

export default AttendanceOfficerRoutes;
