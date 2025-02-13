// import React, { useEffect } from "react";
// import { auth } from "../firebase";
// import { signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const Verify: React.FC = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyUser = async () => {
//       if (isSignInWithEmailLink(auth, window.location.href)) {
//         let email: string | null = window.localStorage.getItem("emailForSignIn");

//         if (!email) {
//           email = window.prompt("Please enter your email:") || "";
//         }

//         if (!email) {
//           console.error("Email is required to sign in.");
//           return;
//         }

//         try {
//           await signInWithEmailLink(auth, email, window.location.href);
//           window.localStorage.removeItem("emailForSignIn");

//           // Role extract karo URL se
//           const urlParams = new URLSearchParams(window.location.search);
//           const type = urlParams.get("type");

//           // Redirect according to role
//           switch (type) {
//             case "parent":
//               navigate("/parent");
//               break;
//             case "teacher":
//               navigate("/teacher");
//               break;
//             case "admin":
//               navigate("/admin");
//               break;
//             default:
//               navigate("/");
//           }
//         } catch (error) {
//           console.error("Error signing in:", (error as Error).message);
//         }
//       }
//     };

//     verifyUser();
//   }, [navigate]);

//   return <div>Verifying...</div>;
// };

// export default Verify;
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Verify: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email: string | null = window.localStorage.getItem("emailForSignIn");

        if (!email) {
          email = window.prompt("Please enter your email:") || "";
        }

        if (!email) {
          console.error("Email is required to sign in.");
          return;
        }

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem("emailForSignIn");

          // ✅ Get Role from URL
          const urlParams = new URLSearchParams(window.location.search);
          const role = urlParams.get("role");

          // ✅ Force Redirect using `window.location.replace()`
          switch (role) {
            case "parent":
              window.location.replace("https://school.tap2share.co/parent");
              break;
            case "teacher":
              window.location.replace("https://school.tap2share.co/teacher");
              break;
            case "admin":
              window.location.replace("https://school.tap2share.co/admin");
              break;
            default:
              window.location.replace("https://school.tap2share.co/");
          }
        } catch (error) {
          console.error("Error signing in:", (error as Error).message);
        }
      }
    };

    verifyUser();
  }, []);

  return <div>Verifying...</div>;
};

export default Verify;
