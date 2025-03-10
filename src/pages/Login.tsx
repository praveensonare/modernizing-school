
// main code 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, School, Bus, UserCheck, User, Mail, LogIn } from 'lucide-react';
import { auth, signInWithGooglePopup } from "../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useAuth } from '../store/useAuth';
import {jwtDecode} from "jwt-decode";

const userTypeData = {
  admin: { title: 'Administrator', description: 'School administration and management', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', icon: Users },
  teacher: { title: 'Teacher', description: 'Classroom management and student progress', image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800', icon: School },
  'attendance-officer': { title: 'Attendance Officer', description: 'Student attendance tracking and management', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800', icon: UserCheck },
  parent: { title: 'Parent', description: "Track your child's progress and activities", image: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=800', icon: User },
  'school-bus': { title: 'School Bus', description: 'Transportation tracking and management', image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=800', icon: Bus }
};

export const Login: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'parent' | 'admin' | 'teacher' | 'attendance-officer' | 'school-bus'>('parent');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');  
  const navigate = useNavigate();
  const { setUser , setIsAuthenticated } = useAuth();

  const handleSubmit = async (event: React.FormEvent, type: string): Promise<void> => {
    event.preventDefault();
  
    if (!email.trim()) {
      setEmailError('Please enter your email');  
      return;
    }
  
   const actionCodeSettings = {
      url: `https://school.tap2share.co/{type}`, 
      handleCodeInApp: true,
    };
  
    try {
      setLoading(true);
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert("Verification link sent to your email!");
      window.localStorage.setItem("emailForSignIn", email);
      window.localStorage.setItem("login type", type);
      setEmailSent(true);
      setEmailError('');
    } catch (error) {
      console.error("Error sending email:", error);
      setLoading(false);
      setEmailError('Error sending the email. Please try again.');
    }
  };
  
  
  const handleLoginGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await signInWithGooglePopup();
      const user = result.user;
      
      if (user) {
        const token = await user.getIdToken(true);
        console.log("Google Sign-In User:", token);
        checkTokenIssuer(token);

        
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify({
          uid: user.uid,
          email: user.email!,
          avatar: user.photoURL || "",
          type: selectedType,
          name: user.displayName || "Unknown User"
        }));
        localStorage.setItem("authToken", token);
  
        setUser({
          uid: user.uid,
          email: user.email!,
          avatar: user.photoURL || "",
          type: selectedType,
          name: user.displayName || "Unknown User"
        });
  
        setIsAuthenticated(true);
        navigate(`/${selectedType}`);
      } else {
        console.log("User object is undefined!");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Login Failed! Check console for details.");
      setLoading(false);
    }
  };
  
  async function checkTokenIssuer(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      console.log("Decoded Token:", decoded);
  
      // Check Token Issuer
      if (decoded.iss !== `https://securetoken.google.com/instashare-b328c`) {
        console.error("Invalid Issuer:", decoded.iss);
        return; // Invalid token, no need to check expiry
      } else {
        console.log("Issuer is correct");
      }
  
      // Check Token Expiry
      const expiryTime = new Date(decoded.exp * 1000);
      console.log("Token Expiry Time:", expiryTime);
  
      if (expiryTime < new Date()) {
        console.warn("Token has expired! Logging out...");
        const auth = useAuth();
        auth.logout(); // Logout user if token expired
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  


  
  const isDesktop = window.innerWidth >= 768;
  const userTypes = isDesktop ? ['parent', 'admin', 'teacher'] : ['parent', 'teacher', 'attendance-officer', 'school-bus'];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row border-2 border-gray-200">
        <div className="w-full md:w-1/2 relative">
          <img src={userTypeData[selectedType].image} alt={userTypeData[selectedType].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center p-6">
              <h2 className="text-2xl font-bold mb-2">{userTypeData[selectedType].title}</h2>
              <p>{userTypeData[selectedType].description}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          <div className="space-y-4">
            {userTypes.map((type) => {
              const TypeIcon = userTypeData[type as keyof typeof userTypeData].icon;
              return (
                <button 
                  key={type} 
                  onClick={() => setSelectedType(type as keyof typeof userTypeData)} 
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${selectedType === type ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  disabled={loading}
                >
                  <TypeIcon size={20} />
                  <span className="capitalize">{userTypeData[type as keyof typeof userTypeData].title}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-gray-500" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>

              {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Display error message */}

              <button 
                onClick={(e) => handleSubmit(e, selectedType)} 
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin w-5 h-5 border-4 border-t-4 border-white rounded-full"></div>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Get Login Link</span>
                  </>
                )}
              </button>
            </div>

            {emailSent && <p className="text-green-500 text-center">Email sent successfully!</p>}

            {/* Google Sign-in */}
            <button 
              onClick={handleLoginGoogle} 
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              disabled={loading}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};




