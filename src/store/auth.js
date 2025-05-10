import { create } from 'zustand';

const useAuthStore = create((set) => ({
  authorized: false,
  setAuthorized: (value) => set({ authorized: value }),
}));

export default useAuthStore;
