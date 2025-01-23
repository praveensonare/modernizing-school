export type UserType = 'admin' | 'teacher' | 'attendance-officer' | 'parent' | 'school-bus';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  type: UserType;
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}
