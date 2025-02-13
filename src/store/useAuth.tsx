
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export type UserType =
  | "admin"
  | "teacher"
  | "attendance-officer"
  | "parent"
  | "school-bus";

export interface User {
  uid: string;
  email: string;
  avatar?: string;
  
  displayName?: string;
  type: UserType;
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  isauthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (status: boolean) => void; // Corrected this
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  
  const [isauthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    
  }, [isauthenticated]);

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isauthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};