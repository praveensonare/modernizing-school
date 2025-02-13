import React from "react";
import { Navigate , useLocation} from "react-router-dom";
import { useAuth } from "../store/useAuth";


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user} = useAuth();
  const location = useLocation();

  console.log(user?.type)
   
  if (!user && !location.pathname.includes("/login")){
    return <Navigate to="/login" replace />;
  } 
  
if ( user?.type === "admin" && !location.pathname.includes("/admin")){
  return <Navigate to="/admin" replace />;
}

  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
};

export default ProtectedRoute;
