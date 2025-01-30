import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentList from "../pages/school-bus/StudentList";
import TripHistory from "../pages/school-bus/TripHistory";
import MyAccount from "../pages/school-bus/MyAccount";
import Home from "../pages/school-bus/BusHome";
import Trip from "../pages/school-bus/Trip";
import TripStart from "../pages/school-bus/TripStart";

const SchoolBusRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/trip" element={<ProtectedRoute><Trip /></ProtectedRoute>} />
      <Route path="/trip-start" element={<ProtectedRoute><TripStart /></ProtectedRoute>} />
      <Route path="/student" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><TripHistory /></ProtectedRoute>} />
      <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
    </Routes>
  );
};

export default SchoolBusRoutes;
