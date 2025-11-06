import { create } from "zustand";
import type { Bookmark } from "../types/global";
import { Bookmark as MockBookmarks } from "../data/bookmark";

type BookmarkFilter = 'all' | 'archived'

interface BookmarksState {
  bookmarks: Bookmark[]
  filter: BookmarkFilter
  searchQuery: string
  setBookmarks: (bookmarks: Bookmark[]) => void
  setFilter: (filter: BookmarkFilter) => void
  setSearchQuery: (query: string) => void
  getFilteredBookmarks: () => Bookmark[]
}

const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: MockBookmarks,
  filter: 'all',
  searchQuery: '',
  setBookmarks: (bookmarks) => set({ bookmarks }),
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  getFilteredBookmarks: () => {
    const { bookmarks, filter, searchQuery } = get()

    let filtered = bookmarks
    if(filter === 'archived') {
     filtered = filtered.filter(bookmark => bookmark.isArchived === true)
    }

    if(searchQuery) {
      filtered = filtered.filter(bookmark => 
         bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
         bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )}

    return filtered
  }
}))

export default useBookmarksStore