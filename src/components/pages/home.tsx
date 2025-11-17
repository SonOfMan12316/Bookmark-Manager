import { useState, useCallback, useMemo } from 'react'
import { sortOptions } from '../../data/bookmark'
import { Checkmark, Switch } from '../icons'
import Layout from '../layouts/layout'
import { PopOver, Modal } from '../ui'
import { BookmarkCard, BookmarkForm } from '../bookmark'
import useUIStore from '../../store/ui'
import { useBookmarksStore } from '../../store'
import type { BookmarkFilter, SortBy } from '../../types/global'

interface HeaderSectionProp {
  popOpen: boolean
  setPopOpen: (popOpen: boolean) => void
  filter: BookmarkFilter
  searchQuery: string
  sortBy: SortBy
  setSortBy: (sortBy: SortBy) => void
  selectedTags: string[]
}

interface SortOptionsProp {
  sortBy: SortBy
  setSortBy: (sortBy: SortBy) => void
}

const HeaderSection = ({popOpen, setPopOpen, filter, searchQuery, sortBy, setSortBy, selectedTags}: HeaderSectionProp) => {
  const HeaderTitle = useMemo(() => {
    if (filter === 'archived' && !searchQuery && selectedTags.length === 0)
      return 'Archived Bookmarks'
    if(searchQuery) {
      return (
        <>
          Results for: 
          <span className="text-ch-teal-700 dark:text-ch-dark-mode-neutral-100">
            "{searchQuery}"
          </span> 
        </>
      )
    }
    if(selectedTags.length) {
      const tags = selectedTags.length <= 3
        ? selectedTags.join(', ')
        : `${selectedTags.slice(0, 3).join(', ')}...`;
      return (
        <>
          Bookmarks tagged: 
          <span className="text-ch-teal-700 dark:text-ch-dark-mode-neutral-100 capitalize">
            {tags}
            </span>
        </>
      );
    }
    return 'All Bookmarks'
  }, [filter, searchQuery, selectedTags])

  return (
    <div className="pb-5 flex justify-between items-center">
      <div>
        <span className="font-bold text-xl sm:text-2xl text-ch-light-mode-neutral-900 dark:text-white flex-wrap">
          { HeaderTitle } 
        </span>
      </div>
      <div>
        <PopOver
          trigger={
            <div className="px-3 h-10.5 bg-white rounded-lg dark:bg-ch-dark-mode-neutral-800 text-ch-dark-mode-neutral-900 dark:text-white border border-ch-light-mode-neutral-400 dark:border-ch-dark-mode-neutral-500 hover:bg-ch-light-mode-neutral-100 dark:hover:bg-ch-dark-mode-neutral-600 flex items-center gap-2">
              <Switch />
              <span className='text-nowrap'>Sort By</span>
            </div>
          }
          isOpen={popOpen}
          setIsOpen={setPopOpen}
          triggerVariant="naked"
        >
          <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
        </PopOver>
      </div>
    </div>
  )
}

const SortOptions = ({ sortBy, setSortBy }: SortOptionsProp) => {
  return (
    <div className="p-2 w-[200px]">
      {sortOptions.map((option) => (
        <div key={option.value} className="">
          <div onClick={() => setSortBy(option.value as SortBy)} className="flex items-center justify-between gap-2 p-2 cursor-pointer rounded-md dark:hover:bg-ch-dark-mode-neutral-500 hover:bg-ch-light-mode-neutral-100 text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 dark:hover:text-white hover:text-black transition-colors">
            <span className="font-semibold text-sm">{option.label}</span>
            <span>{sortBy === option.value && <Checkmark />}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const Home = () => {
  const [popOpen, setPopOpen] = useState<boolean>(false)

  const { modalType, setModalType } = useUIStore()
  const {
    bookmarks,
    filter,
    searchQuery,
    selectedTags,
    getFilteredBookmarks,
    sortBy,
    setSortBy,
  } = useBookmarksStore()

  const filteredBookmarks = useMemo(
    () => getFilteredBookmarks(),
    [bookmarks, filter, searchQuery, selectedTags, getFilteredBookmarks, sortBy]
  )
  const handleModalClose = useCallback(() => setModalType(null), [])
  const addModal = modalType === 'add'

  return (
    <Layout>
      <HeaderSection
        popOpen={popOpen}
        setPopOpen={setPopOpen}
        filter={filter}
        searchQuery={searchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedTags={selectedTags}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-16">
            <div className="text-center space-y-1">
              <span className="block text-lg font-semibold text-ch-light-mode-neutral-900 dark:text-white">
                No bookmarks found
              </span>
              {(searchQuery || selectedTags.length > 0) && (
                <span className="text-sm font-medium text-ch-light-mode-neutral-600 dark:text-white">
                  Try adjusting your search or tag filters.
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        title={addModal ? 'Add a Bookmark' : 'Edit Bookmark'}
        description={
          addModal
            ? 'Save a link with details to keep your collection organized.'
            : 'Update your saved link details — change the title, description, URL, or tags anytime.'
        }
        isOpen={!!modalType}
        onClose={handleModalClose}
        defaultClose={true}
      >
        {modalType && (
          <BookmarkForm
            mode={modalType}
            onClose={handleModalClose}
          ></BookmarkForm>
        )}
      </Modal>
    </Layout>
  )
}

export default Home
