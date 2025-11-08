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
}

const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: MockBookmarks,
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
  clearSelectedTags: () => set({ selectedTags: [] })
}))

export default useBookmarksStore