import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AddBookmarkForm } from '../types/global'

type Theme = 'light' | 'dark'
type ModalType = 'add' | 'edit' | null

type UI = {
  popoverState: boolean
  theme: Theme
  modalType: ModalType
  selectedBookmark?: AddBookmarkForm | null
  selectedBookmarkId?: string | null
}

type Actions = {
  setPopOverState: (state: UI['popoverState']) => void
  setModalType: (state: UI['modalType']) => void
  setTheme: (newTheme: UI['theme']) => void
  setSelectedBookmark: (bookmark: AddBookmarkForm) => void
  setSelectedBookmarkId: (id: string | null) => void
}

type UIActions = UI & Actions

const useUIStore = create<UIActions>()(
  persist(
    (set) => ({
      popoverState: false,
      theme: 'light',
      isModalOpen: false,
      modalType: null,
      selectedBookmark: null,
      selectedBookmarkId: null,
      setPopOverState: (popoverState) => set({ popoverState }),
      setTheme: (theme) => set({ theme }),
      setModalType: (modalType) => set({ modalType }),
      setSelectedBookmark: (selectedBookmark) => set({ selectedBookmark }),
      setSelectedBookmarkId: (selectedBookmarkId) => set({ selectedBookmarkId }),
    }),
    {
      name: 'global-ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)

export default useUIStore
