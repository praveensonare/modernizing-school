import AppRoutes from "./routes/index";
import  {AuthProvider}  from "./store/useAuth";

function App() {
  return (
    <AuthProvider>
      
        <AppRoutes />
     
    </AuthProvider>
  );
}

export default App;
