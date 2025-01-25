// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
// import { useAuth } from "../store/auth";

// export const SignInConfirm: React.FC = () => {
//   const auth = getAuth();
//   const navigate = useNavigate();
//   const { setUser } = useAuth();

//   useEffect(() => {
//     const email = localStorage.getItem("emailForSignIn");
//     const userType = localStorage.getItem("loginType");

//     if (isSignInWithEmailLink(auth, window.location.href) && email) {
//       signInWithEmailLink(auth, email, window.location.href)
//         .then((result) => {
//           const user = result.user;
//           console.log("Login Successful:", user);
//           setUser({
//             uid: user.uid,
//             email: user.email!,
//             type: userType as any,
//           });
//           localStorage.removeItem("emailForSignIn");
//           localStorage.removeItem("loginType");
//           navigate(`/${userType}`);
//         })
//         .catch((error) => {
//           console.error("Login Error:", error);
//         });
//     }
//   }, [auth, navigate, setUser]);

//   return (
//     <div className="h-screen flex items-center justify-center">
//       <p className="text-lg">Verifying your email, please wait...</p>
//     </div>
//   );
// };
