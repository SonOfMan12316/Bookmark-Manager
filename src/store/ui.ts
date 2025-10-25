import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Theme = 'light' | 'dark'

type UI = {
  popoverState: boolean
  isModalOpen: boolean
  theme: Theme
}

type Actions = {
  setPopOverState: (state: UI['popoverState']) => void
  setTheme: (newTheme: UI['theme']) => void
  setIsModalOpen: (state: UI['isModalOpen']) => void
}

type UIActions = UI & Actions

const useUIStore = create<UIActions>()(
  persist(
    (set) => ({
      popoverState: false,
      theme: 'light',
      isModalOpen: false,
      setPopOverState: (popoverState) => set({ popoverState }),
      setTheme: (theme) => set({ theme }),
      setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
    }),
    {
      name: 'global-ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)

export default useUIStore
