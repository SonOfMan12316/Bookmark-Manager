import { create } from "zustand";
import type { Bookmark, BookmarkFilter, SortBy } from "../types/global";

interface BookmarksState {
  filter: BookmarkFilter
  searchQuery: string
  selectedTags: string[]
  sortBy: SortBy
  setFilter: (filter: BookmarkFilter) => void
  setSearchQuery: (query: string) => void
  getFilteredBookmarks: (bookmarks: Bookmark[]) => Bookmark[]
  filterByTags: (tag: string) => void
  isTagSelected: (tag: string) => boolean
  setSortBy: (sortBy: SortBy) => void
  clearSelectedTags: () => void
}

const useBookmarksStore = create<BookmarksState>((set, get) => ({
  filter: 'all' as BookmarkFilter,
  searchQuery: '',
  selectedTags: [],
  sortBy: 'recently-added' as SortBy,
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  getFilteredBookmarks: (bookmarks) => {
    const { filter, searchQuery, selectedTags, sortBy } = get()

    let filtered = bookmarks

    if (filter === 'archived') {
      filtered = filtered.filter((b) => b.isArchived === true)
    } else {
      filtered = filtered.filter((b) => b.isArchived === false)
    }

    if (searchQuery) {
      filtered = filtered.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedTags.length) {
      filtered = filtered.filter((b) =>
        b.tags.some((tag) => selectedTags.includes(tag.toLowerCase()))
      )
    }

    filtered = [...filtered].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1

      if (sortBy === 'recently-added') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      if (sortBy === 'recently-visited') {
        const aTime = a.lastVisited ? new Date(a.lastVisited).getTime() : 0
        const bTime = b.lastVisited ? new Date(b.lastVisited).getTime() : 0
        if (aTime === bTime) return 0
        if (!aTime) return 1
        if (!bTime) return -1
        return bTime - aTime
      }

      if (sortBy === 'most-visited') return b.visitCount - a.visitCount

      return 0
    })

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
}))

export default useBookmarksStore
