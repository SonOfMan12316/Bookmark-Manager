import { create } from "zustand";
import type { Bookmark, BookmarkFilter, SortBy } from "../types/global";
import { Bookmark as MockBookmarks } from "../data/bookmark";

interface BookmarksState {
  bookmarks: Bookmark[]
  filter: BookmarkFilter
  searchQuery: string
  selectedTags: string[]
  sortBy: SortBy
  setBookmarks: (bookmarks: Bookmark[]) => void
  setFilter: (filter: BookmarkFilter) => void
  setSearchQuery: (query: string) => void
  getFilteredBookmarks: () => Bookmark[]
  filterByTags: (tag: string) => void
  isTagSelected: (tag: string) => boolean
  setSortBy: (sortBy: SortBy) => void
  clearSelectedTags: () => void
  archiveBookmark: (id: string) => void
  unarchiveBookmark: (id: string) => void
  deleteBookmark: (id: string) => void
  pinBookmark: (id: string) => void
  unpinBookmark: (id: string) => void
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'pinned' | 'isArchived' | 'visitCount' | 'createdAt' | 'lastVisited'>) => void
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void
  trackVisit: (id: string) => void
}

const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: [...MockBookmarks],
  filter: 'all' as BookmarkFilter,
  searchQuery: '',
  selectedTags: [],
  sortBy: 'recently-added' as SortBy,
  setBookmarks: (bookmarks) => set({ bookmarks }),
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  getFilteredBookmarks: () => {
    const { bookmarks, filter, searchQuery, selectedTags, sortBy } = get()

    let filtered = bookmarks
    if(filter === 'archived') {
     filtered = filtered.filter(bookmark => bookmark.isArchived === true)
    } else {
      filtered = filtered.filter(bookmark => bookmark.isArchived === false)
    }

    if(searchQuery) {
      filtered = filtered.filter(bookmark => 
         bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
    )}

    if(selectedTags.length) {
      filtered = filtered.filter(bookmark => 
        bookmark.tags.some(tag => selectedTags.includes(tag.toLowerCase()))
      )
    }

    if(sortBy === 'recently-added') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if(sortBy === 'recently-visited') {
      filtered = [...filtered].sort((a, b) => {
        const aTime = a.lastVisited ? new Date(a.lastVisited).getTime() : 0
        const bTime = b.lastVisited ? new Date(b.lastVisited).getTime() : 0

        if (aTime === bTime) return 0
        if (!aTime) return 1
        if (!bTime) return -1
        return bTime - aTime
      })
    } else if(sortBy === 'most-visited') {
      filtered = filtered.sort((a, b) => b.visitCount - a.visitCount)
    }

    return filtered
  },
  filterByTags: (tag) => {
    set((state) => {
      const normalized = tag.toLowerCase()
      const isSelected = state.selectedTags.includes(normalized)
      const selectedTags = isSelected
        ? state.selectedTags.filter((t) => t !== normalized)
        : [...state.selectedTags, normalized]
      return { selectedTags }
    })
  },
  isTagSelected: (tag) => {
    const { selectedTags } = get()
    return selectedTags.includes(tag.toLowerCase())
  },
  setSortBy: (sortBy) => set({ sortBy }),
  clearSelectedTags: () => set({ selectedTags: [] }),
  archiveBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, isArchived: true } : bookmark
      ),
    }))
  },
  unarchiveBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, isArchived: false } : bookmark
      ),
    }))
  },
  deleteBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
    }))
  },
  pinBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, pinned: true } : bookmark
      ),
    }))
  },
  unpinBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, pinned: false } : bookmark
      ),
    }))
  },
  addBookmark: (bookmarkData) => {
    set((state) => {
      // Generate a new ID
      const maxId = state.bookmarks.reduce((max, b) => {
        const num = parseInt(b.id.replace('bm-', '')) || 0
        return Math.max(max, num)
      }, 0)
      const newId = `bm-${String(maxId + 1).padStart(3, '0')}`

      const getFavicon = (url: string) => {
        try {
          const domain = new URL(url).hostname
          return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
        } catch {
          return '/images/favicon-default.png'
        }
      }

      const newBookmark: Bookmark = {
        id: newId,
        title: bookmarkData.title,
        url: bookmarkData.url,
        favicon: bookmarkData.favicon || getFavicon(bookmarkData.url),
        description: bookmarkData.description,
        tags: Array.isArray(bookmarkData.tags) 
          ? bookmarkData.tags 
          : String(bookmarkData.tags || '').split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0),
        pinned: false,
        isArchived: false,
        visitCount: 0,
        createdAt: new Date().toISOString(),
        lastVisited: null,
      }

      return {
        bookmarks: [...state.bookmarks, newBookmark],
      }
    })
  },
  updateBookmark: (id, updates) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates } : bookmark
      ),
    }))
  },
  trackVisit: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id
          ? {
              ...bookmark,
              visitCount: bookmark.visitCount + 1,
              lastVisited: new Date().toISOString(),
            }
          : bookmark
      ),
    }))
  },
}))

export default useBookmarksStore