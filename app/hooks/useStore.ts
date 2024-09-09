import { create } from 'zustand'

interface State {
  ready: boolean;
  isReady: () => void;
}

export const useReadyStore = create<State>()((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
}))