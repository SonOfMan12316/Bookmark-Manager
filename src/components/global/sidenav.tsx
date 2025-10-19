import { useState, type ReactNode } from 'react'
import { Archive, Home, Logo } from '../icons'
import { CustomCheckBox } from '../ui'
import type { Tag } from '../../types/global'

type Categorylabel = 'Home' | 'Archive'

interface CategoryOption {
  label: Categorylabel
  icon: ReactNode
}

const TagOption: Tag[] = [
  { name: 'AI', count: 1 },
  { name: 'Community', count: 5 },
  { name: 'Compatibility', count: 1 },
  { name: 'CSS', count: 6 },
  { name: 'Design', count: 1 },
  { name: 'Framework', count: 2 },
  { name: 'Git', count: 1 },
  { name: 'HTML', count: 2 },
  { name: 'JavaScript', count: 3 },
  { name: 'Layout', count: 3 },
  { name: 'Learning', count: 6 },
  { name: 'Performance', count: 2 },
  { name: 'Practice', count: 5 },
  { name: 'Reference', count: 4 },
  { name: 'Tips', count: 4 },
  { name: 'Tools', count: 4 },
  { name: 'Tutorial', count: 3 },
]

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

const SideNav = () => {
  const [activeCategory, setActveCategory] = useState<Categorylabel>('Home')

  return (
    <div className="hidden lg:block bg-white py-5 w-[296px]">
      <div className="px-5">
        <Logo />
      </div>
      <div className="mt-5 px-4">
        {CategoryOptions.map((category, index) => (
          <div
            className={`flex items-center gap-1.5 h-10 rounded-lg px-3.5 cursor-pointer ${
              category.label === activeCategory
                ? 'bg-ch-light-mode-neutral-100 text-black'
                : 'text-ch-light-mode-neutral-800'
            }`}
            onClick={() => setActveCategory(category.label)}
            key={index}
          >
            {category.icon}
            <span className="font-semibold text-base">{category.label}</span>
          </div>
        ))}
        <div className="pt-4 pl-4 pr-3">
          <h1 className="uppercase font-bold text-xs text-ch-grey">Tags</h1>
          {TagOption.map((tag) => (
            <div className="flex justify-between items-center h-10">
              <div className="flex justify-center items-center gap-1.5">
                <CustomCheckBox />
                <h1 className="text-ch-light-mode-neutral-800 font-semibold text-base">
                  {tag.name}
                </h1>
              </div>
              <div className="h-6 w-6 bg-ch-light-mode-neutral-100 border-[1.45px] border-ch-light-mode-neutral-300 rounded-xl flex items-center justify-center">
                <span className="font-medium text-xs">{tag.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideNav
