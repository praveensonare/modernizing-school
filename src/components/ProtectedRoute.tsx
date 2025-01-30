import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Header } from "./Admin/Header";
import { Footer } from "./Admin/Footer";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
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

export default ProtectedRoute;
