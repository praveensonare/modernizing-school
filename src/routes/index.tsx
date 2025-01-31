import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";

import ParentRoutes from "./ParentRoutes";
import AttendanceOfficerRoutes from "./AttendanceOfficerRoutes";
import SchoolBusRoutes from "./SchoolBusRoutes";
import AdminRoutes from "./AdminRoutes";
import TeacherRoutes from "./TeacherRoutes";

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
      <Route path="/admin/*" element={<AdminRoutes />} />

       {/* Teacher Routes */}
        <Route path="/teacher/*" element={<TeacherRoutes />} />


      


      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
