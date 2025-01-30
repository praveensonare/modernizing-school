import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Header } from "./components/Admin/Header";
import { Footer } from "./components/Admin/Footer";

// Parent Pages
import Layout from "./components/Parent/Layout";
import Dashboard from "./pages/parents/Dashboard";
import Profile from "./pages/parents/Profile";
import Transport from "./pages/parents/Transport";
import History from "./pages/parents/History";
import Inbox from "./pages/parents/Inbox";
import LinkChild from "./pages/parents/LinkChild";
import ChildProfile from "./pages/parents/ChildProfile";

// Attendance Officer Pages
import { AttendanceOfficerDashboard } from "./pages/attendance-officer/AttendanceOfficerDashboard";
import { GPSAttendance } from "./pages/attendance-officer/GPSAttendance";
import { StudentSearch } from "./pages/attendance-officer/StudentSearch";
import { Contacts } from "./pages/attendance-officer/Contacts";
import { StudentTap } from "./pages/attendance-officer/StudentTap";

// School Bus Pages


import StudentList from "./pages/school-bus/StudentList";
import TripHistory from "./pages/school-bus/TripHistory";
import MyAccount from "./pages/school-bus/MyAccount";
import Home from "./pages/school-bus/BusHome";
import Trip from "./pages/school-bus/Trip";
import TripStart from "./pages/school-bus/TripStart";


// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";

import { useAuth } from "./store/auth";
import { AuthProvider } from "./store/auth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const location = useLocation();
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  const hideHeaderFooter = location.pathname.startsWith("/parent");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

function SchoolBusRoutes() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="trip" element={<Trip />} />
      <Route path="trip-start" element={<TripStart />} />
      <Route path="student" element={<StudentList />} />
      <Route path="history" element={<TripHistory />} />
      <Route path="my-account" element={<MyAccount />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Parent Routes */}
          <Route
            path="/parent"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="transport" element={<Transport />} />
            <Route path="history" element={<History />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="link-child" element={<LinkChild />} />
            <Route path="child/:id" element={<ChildProfile />} />
          </Route>

          {/* Attendance Officer Routes */}
          <Route
            path="/attendance-officer"
            element={
              <ProtectedRoute>
                <AttendanceOfficerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance-officer/gps-attnd"
            element={
              <ProtectedRoute>
                <GPSAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance-officer/search"
            element={
              <ProtectedRoute>
                <StudentSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance-officer/contacts"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance-officer/tap"
            element={
              <ProtectedRoute>
                <StudentTap />
              </ProtectedRoute>
            }
          />

          {/* School Bus Routes */}
          <Route
            path="/school-bus/*"
            element={
              <ProtectedRoute>
                <SchoolBusRoutes />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
