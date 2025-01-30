import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import ParentRoutes from "./ParentRoutes";
import AttendanceOfficerRoutes from "./AttendanceOfficerRoutes";
import SchoolBusRoutes from "./SchoolBusRoutes";
import { AdminDashboard } from "../pages/admin/AdminDashboard";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Parent Routes */}
      <Route path="/parent/*" element={<ParentRoutes />} />

      {/* Attendance Officer Routes */}
      <Route path="/attendance-officer/*" element={<AttendanceOfficerRoutes />} />

      {/* School Bus Routes */}
      <Route path="/school-bus/*" element={<SchoolBusRoutes />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
