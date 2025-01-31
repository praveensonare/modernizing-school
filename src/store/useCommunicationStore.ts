import { create } from 'zustand';

interface CommunicationState {
  method: 'whatsapp' | 'email' | 'both' | null;
  selectedTeachers: string[];
  selectedStudents: string[];
  selectedVendors: string[];
  message: string;
  setMethod: (method: CommunicationState['method']) => void;
  setSelectedTeachers: (teachers: string[]) => void;
  setSelectedStudents: (students: string[]) => void;
  setSelectedVendors: (vendors: string[]) => void;
  setMessage: (message: string) => void;
  reset: () => void;
}

export const useCommunicationStore = create<CommunicationState>((set) => ({
  method: null,
  selectedTeachers: [],
  selectedStudents: [],
  selectedVendors: [],
  message: '',
  setMethod: (method) => set({ method }),
  setSelectedTeachers: (teachers) => set({ selectedTeachers: teachers }),
  setSelectedStudents: (students) => set({ selectedStudents: students }),
  setSelectedVendors: (vendors) => set({ selectedVendors: vendors }),
  setMessage: (message) => set({ message }),
  reset: () => set({
    method: null,
    selectedTeachers: [],
    selectedStudents: [],
    selectedVendors: [],
    message: '',
  }),
}));