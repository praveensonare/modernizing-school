export type UserType = 'admin' | 'teacher' | 'attendance-officer' | 'parent' | 'school-bus';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar: string;
}

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}