import { create } from 'zustand'

type UI = {
  popoverState: boolean
}

type Actions = {
  setPopOverState: (state: UI['popoverState']) => void
}

type UIActions = UI & Actions

const useUIStore = create<UIActions>((set) => ({
  popoverState: false,
  setPopOverState: (popoverState) => set({ popoverState }),
}))

export default useUIStore