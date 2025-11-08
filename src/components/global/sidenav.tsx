import { useState, type ReactNode } from 'react'
import { Archive, Cancel, Home, Logo } from '../icons'
import { CustomCheckBox } from '../ui'
import { TagOption } from '../../data/bookmark'
import { useClickOutside } from '../../hooks'
import { useBookmarksStore } from '../../store'

type Categorylabel = 'Home' | 'Archive'

interface CategoryOption {
  label: Categorylabel
  icon: ReactNode
  onClick?: (filter: 'archived' | 'all') => void
}

const CategoryOptions: CategoryOption[] = [
  {
    icon: <Home />,
    label: 'Home',
  },
  {
    icon: <Archive />,
    label: 'Archive',
  },
]

interface SidenavProp {
  showSidenav: boolean
  setShowSidenav: (showSidenav: boolean) => void
}

const SideNav = ({ showSidenav, setShowSidenav }: SidenavProp) => {
  const { setFilter, filterByTags, isTagSelected, selectedTags, clearSelectedTags } = useBookmarksStore()
  const [activeCategory, setActveCategory] = useState<Categorylabel>('Home')

  const sideNavRef = useClickOutside(() => {
    setShowSidenav(false)
  })

  return (
    <div
      ref={sideNavRef}
      className={`
        flex flex-col z-50 h-full py-3 w-[296px] 
      bg-white dark:bg-ch-dark-mode-neutral-800  xl:border-none
        transition-transform duration-300 ease-in-out 
        fixed top-0 left-0 xl:static xl:z-auto
        xl:translate-x-0 xl:flex-shrink-0 xl:block
        ${
          showSidenav
            ? 'translate-x-0 border-r-[1.45px] border-r-ch-light-mode-neutral-300 dark:border-r-ch-dark-mode-neutral-500'
            : '-translate-x-full'
        }
      `}
    >
      <div
        onClick={() => setShowSidenav(false)}
        className="absolute right-0 top-1 xl:hidden text-ch-light-mode-neutral-800 dark:text-white"
      >
        <Cancel />
      </div>
      <div className="px-5 mt-2 flex-shrink-0">
        <Logo />
      </div>
      <div className="mt-5 px-4 flex-grow overflow-y-auto">
        {CategoryOptions.map((category, index) => (
          <div
            className={`flex items-center gap-1.5 h-10 rounded-lg px-3.5 cursor-pointer my-1 hover:bg-ch-light-mode-neutral-100 hover:text-black dark:hover:bg-ch-dark-mode-neutral-600 dark:hover:text-white ${
              category.label === activeCategory
                ? 'bg-ch-light-mode-neutral-100 dark:bg-ch-dark-mode-neutral-600 text-black dark:text-white'
                : 'text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100'
            }`}
            onClick={() => {
              setFilter(category.label === 'Archive' ? 'archived' : 'all')
              setActveCategory(category.label)
            }}
            key={index}
          >
            {category.icon}
            <span className="font-semibold text-base">{category.label}</span>
          </div>
        ))}
        <div className="pt-4 mb-14">
          <div className='flex justify-between items-center'>
            <h1 className="uppercase font-bold text-xs text-ch-grey dark:text-ch-dark-mode-neutral-100 pl-4 pr-3">
              Tags
            </h1>
            {selectedTags.length > 0 && (
              <h1 onClick={() => clearSelectedTags()} className='font-medium text-right text-xs text-ch-lighter-grey dark:text-ch-dark-mode-neutral-100 border-b-[1.45px] border-ch-lightest-grey dark:border-ch-dark-mode-neutral-500 cursor-pointer'>Reset</h1>
            )}
          </div>
          {TagOption.map((tag, index) => (
          <div
            key={index}
            className="pl-4 pr-3 group flex justify-between items-center h-10 hover:bg-ch-light-mode-neutral-100 hover:text-black dark:hover:bg-ch-dark-mode-neutral-600 dark:hover:text-white text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 rounded-lg cursor-pointer"
          >
              <div className="flex justify-center items-center gap-1.5">
                <CustomCheckBox
                  onChange={() => filterByTags(tag.name)}
                  checked={isTagSelected(tag.name)}
                />
                <h1 className="font-semibold text-base">{tag.name}</h1>
              </div>
              <div className="h-6 w-6 bg-ch-light-mode-neutral-100 dark:bg-ch-dark-mode-neutral-600 border-[1.45px] border-ch-light-mode-neutral-300 group-hover:border-ch-light-mode-neutral-400 dark:border-ch-dark-mode-neutral-500 rounded-xl flex items-center justify-center">
                <span className="font-medium text-xs dark:text-white">
                  {tag.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideNav
