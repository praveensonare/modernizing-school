import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { AdminLayout } from "../components/Admin/layout/AdminLayout";
import { AdminHome } from "../pages/admin/AdminHome";

// Communication
import { CommunicationHome } from "../pages/admin/communication/CommunicationHome";
import { TeacherSelect } from "../pages/admin/communication/TeacherSelect";
import { StudentSelect } from "../pages/admin/communication/StudentSelect";
import { VendorSelect } from "../pages/admin/communication/VendorSelect";
import { ReviewReceivers } from "../pages/admin/communication/ReviewReceivers";
import { MessageCompose } from "../pages/admin/communication/MessageCompose";

// Transport
import { Transport } from "../pages/admin/transport/Transport";
import { TransportRoute } from "../pages/admin/transport/TransportRoute";
import { TransportHistory } from "../pages/admin/transport/TransportHistory";

// Student
import { Student } from "../pages/admin/student/Student";
import { StudentClass } from "../pages/admin/student/StudentClass";
import { StudentDetail } from "../pages/admin/student/StudentDetail";
import { AddStudent } from "../pages/admin/student/AddStudent";



// Teacher & Admission
import { Teacher } from "../pages/admin/teacher/Teacher";
import { Admission } from "../pages/admin/admission/Admission";
import  Inbox  from "../pages/admin/inbox/Inbox";
import  {MyProfile}  from "../pages/admin/MyProfile";


const AdminRoutes: React.FC = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          
          {/* Communication Routes */}
          <Route path="communication" element={<CommunicationHome />} />
          <Route path="comm/teacher" element={<TeacherSelect />} />
          <Route path="comm/student" element={<StudentSelect />} />
          <Route path="comm/vendor" element={<VendorSelect />} />
          <Route path="comm/review" element={<ReviewReceivers />} />
          <Route path="comm/message" element={<MessageCompose />} />
          
          {/* Transport Routes */}
          <Route path="transport" element={<Transport />} />
          <Route path="transport/route" element={<TransportRoute />} />
          <Route path="transport/history" element={<TransportHistory />} />
          
          {/* Student Routes */}
          <Route path="student" element={<Student />} />
          <Route path="student/class" element={<StudentClass />} />
          <Route path="student/:studentId" element={<StudentDetail />} />
          <Route path="add-student" element={<AddStudent />} />
          
          {/* Teacher & Admission */}
          <Route path="teacher" element={<Teacher />} />
          <Route path="admission" element={<Admission />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="myProfile" element={<MyProfile />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
