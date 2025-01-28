// import { Header } from '../components/Admin/Header';
// import { Footer } from '../components/Admin/Footer';
// import { useAuth } from '../store/auth';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const { user } = useAuth();
    
//     if (user === null) {
//       return <Navigate to="/login" replace />;
//     }
  
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         {children}
//         <Footer />
//       </div>
//     );
//   };
  
//   export default ProtectedRoute;