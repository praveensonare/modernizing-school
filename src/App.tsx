


// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Login } from './pages/Login';
// import { Header } from './components/Header';
// import { Footer } from './components/Footer';

// // Attendance Officer Pages
// import { AttendanceOfficerDashboard } from './pages/attendance-officer/AttendanceOfficerDashboard';
// import { GPSAttendance } from './pages/attendance-officer/GPSAttendance';
// import { StudentSearch } from './pages/attendance-officer/StudentSearch';
// import { Contacts } from './pages/attendance-officer/Contacts';
// import { StudentTap } from './pages/attendance-officer/StudentTap';

// // School Bus Pages
// import { SchoolBusDashboard } from './pages/school-bus/SchoolBusDashboard';
// import { TripPage } from './pages/school-bus/TripPage';
// import { StudentList } from './pages/school-bus/StudentList';
// import { TripHistory } from './pages/school-bus/TripHistory';
// import { MyAccount } from './pages/school-bus/MyAccount';

// // Admin Pages
// import { AdminDashboard } from './pages/admin/AdminDashboard';

// import { useAuth } from './store/auth'; // Import the useAuth hook
// import { AuthProvider } from './store/auth';

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user } = useAuth();
//   console.log(user);
  
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

  
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       {children}
//       <Footer />
//     </div>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
        
//         {/* Attendance Officer Routes */}
//         <Route path="/attendance-officer" element={
//           <ProtectedRoute>
//             <AttendanceOfficerDashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="/attendance-officer/gps-attnd" element={
//           <ProtectedRoute>
//             <GPSAttendance />
//           </ProtectedRoute>
//         } />
        
//         <Route path="/attendance-officer/search" element={
//           <ProtectedRoute>
//             <StudentSearch />
//           </ProtectedRoute>
//         } />
//         <Route path="/attendance-officer/contacts" element={
//           <ProtectedRoute>
//             <Contacts />
//           </ProtectedRoute>
//         } />
//         <Route path="/attendance-officer/tap" element={
//           <ProtectedRoute>
//             <StudentTap />
//           </ProtectedRoute>
//         } />

//         {/* School Bus Routes */}
//         <Route path="/school-bus" element={
//           <ProtectedRoute>
//             <SchoolBusDashboard />
//           </ProtectedRoute>
//         } />
//         <Route path="/school-bus/trip" element={
//           <ProtectedRoute>
//             <TripPage />
//           </ProtectedRoute>
//         } />
//         <Route path="/school-bus/student" element={
//           <ProtectedRoute>
//             <StudentList />
//           </ProtectedRoute>
//         } />
//         <Route path="/school-bus/history" element={
//           <ProtectedRoute>
//             <TripHistory />
//           </ProtectedRoute>
//         } />
//         <Route path="/school-bus/my-account" element={
//           <ProtectedRoute>
//             <MyAccount />
//           </ProtectedRoute>
//         } />

//         {/* Admin Routes */}
//         <Route path="/admin/*" element={
//            <ProtectedRoute>
//             <AdminDashboard />
//           </ProtectedRoute>
//         } />

//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Attendance Officer Pages
import { AttendanceOfficerDashboard } from './pages/attendance-officer/AttendanceOfficerDashboard';
import { GPSAttendance } from './pages/attendance-officer/GPSAttendance';
import { StudentSearch } from './pages/attendance-officer/StudentSearch';
import { Contacts } from './pages/attendance-officer/Contacts';
import { StudentTap } from './pages/attendance-officer/StudentTap';

// School Bus Pages
import { SchoolBusDashboard } from './pages/school-bus/SchoolBusDashboard';
import { TripPage } from './pages/school-bus/TripPage';
import { StudentList } from './pages/school-bus/StudentList';
import { TripHistory } from './pages/school-bus/TripHistory';
import { MyAccount } from './pages/school-bus/MyAccount';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

import { useAuth } from './store/auth'; // Import the useAuth hook
import { AuthProvider } from './store/auth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  // Ensure user data is loaded before rendering anything
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Attendance Officer Routes */}
          <Route path="/attendance-officer" element={
            <ProtectedRoute>
              <AttendanceOfficerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/attendance-officer/gps-attnd" element={
            <ProtectedRoute>
              <GPSAttendance />
            </ProtectedRoute>
          } />
          
          <Route path="/attendance-officer/search" element={
            <ProtectedRoute>
              <StudentSearch />
            </ProtectedRoute>
          } />
          <Route path="/attendance-officer/contacts" element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          } />
          <Route path="/attendance-officer/tap" element={
            <ProtectedRoute>
              <StudentTap />
            </ProtectedRoute>
          } />

          {/* School Bus Routes */}
          <Route path="/school-bus" element={
            <ProtectedRoute>
              <SchoolBusDashboard />
            </ProtectedRoute>
          } />
          <Route path="/school-bus/trip" element={
            <ProtectedRoute>
              <TripPage />
            </ProtectedRoute>
          } />
          <Route path="/school-bus/student" element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          } />
          <Route path="/school-bus/history" element={
            <ProtectedRoute>
              <TripHistory />
            </ProtectedRoute>
          } />
          <Route path="/school-bus/my-account" element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
