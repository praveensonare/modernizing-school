import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Parent/Layout";
import Dashboard from "../pages/parents/Dashboard";
import Profile from "../pages/parents/Profile";
import Transport from "../pages/parents/Transport";
import History from "../pages/parents/History";
import Inbox from "../pages/parents/Inbox";
import LinkChild from "../pages/parents/LinkChild";
import ChildProfile from "../pages/parents/ChildProfile";

const ParentRoutes: React.FC = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="transport" element={<Transport />} />
          <Route path="history" element={<History />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="link-child" element={<LinkChild />} />
          <Route path="child/:id" element={<ChildProfile />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default ParentRoutes;
