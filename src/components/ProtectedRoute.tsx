import React from "react";
import { Navigate , useLocation} from "react-router-dom";
import { useAuth } from "../store/useAuth";


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user} = useAuth();
  const location = useLocation();

  console.log(user)
   
  if (!user && !location.pathname.includes("/login")){
    return <Navigate to="/login" replace />;
  } 
  
  if ( user?.type === "admin" && !location.pathname.includes("/admin")){
    return <Navigate to="/admin" replace />;
  }
  if ( user?.type === "attendance-officer" && !location.pathname.includes("/attendance-officer")){
    return <Navigate to="/attendance-officer" replace />;
  }
  
  if ( user?.type === "parent" && !location.pathname.includes("/parent")){
    return <Navigate to="/parent" replace />;
  }
  
  if ( user?.type === "school-bus" && !location.pathname.includes("/school-bus")){
    return <Navigate to="/school-bus" replace />;
  }
  
  if ( user?.type === "teacher" && !location.pathname.includes("/teacher")){
    return <Navigate to="/teacher" replace />;
  }
  
  

  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
};

export default ProtectedRoute;
