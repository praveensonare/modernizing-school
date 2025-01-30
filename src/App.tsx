import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/auth";
import AppRoutes from "./routes/index";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
