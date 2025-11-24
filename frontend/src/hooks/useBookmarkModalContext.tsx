import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Bookmark } from '../types/global'

interface BookmarkModalContextType {
  isOpen: boolean
  mode: 'add' | 'edit' | null
  bookmark: Bookmark | null
  openModal?: () => void
  closeModal: () => void
  openAdd: () => void
  openEdit: (boomark: Bookmark) => void
}

const BookmarkModalContext = createContext<
  BookmarkModalContextType | undefined
>(undefined)

export const BookmarkModalProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<'add' | 'edit' | null>(null)
  const [bookmark, setBookmark] = useState<Bookmark | null>(null)

  const openAdd = () => {
    setMode('add')
    setBookmark(null)
    setIsOpen(true)
  }

  const openEdit = (bookmark: Bookmark) => {
    setMode('edit')
    setBookmark(bookmark)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setMode(null)
    setBookmark(null)
  }

  const contextValue: BookmarkModalContextType = {
    isOpen,
    mode,
    bookmark,
    openAdd,
    openEdit,
    closeModal,
  }

  return (
    <BookmarkModalContext.Provider value={contextValue}>
      {children}
    </BookmarkModalContext.Provider>
  )
}

export const useBookmarkModal = () => {
  const context = useContext(BookmarkModalContext)
  if (!context) {
    throw new Error(
      'useBookmarkModal must be used within BookmarkModalProvider'
    )
  }
  return context
}
