import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Hamburger,
  Moon,
  Palette,
  Plus,
  Search,
  SignOut,
  Sun,
} from '../icons'
import { Button, Input, PopOver } from '../ui'
import useUIStore from '../../store/ui'

interface HeaderProps {
  setShowSidenav: (showSidenav: boolean) => void
}

const Header = ({ setShowSidenav }: HeaderProps) => {
  const [popOpen, setPopOpen] = useState<boolean>(false)

  const { theme, setTheme } = useUIStore()
  const navigate = useNavigate()

  return (
    <div className="bg-white dark:bg-ch-dark-mode-neutral-800 dark:border-b-[1.45px] dark:border-b-ch-dark-mode-neutral-500 border-b-ch-light-mode-neutral-100 h-16 px-4 sm:px-8 py-3 sm:py-6 lg:py-9 flex items-center gap-2 flex-grow">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <Hamburger
          onClick={() => setShowSidenav(true)}
          className="lg:hidden text-ch-light-mode-neutral-900 dark:text-white"
        />
        <div className="flex-1 min-w-0 sm:max-w-[320px]">
          <Input
            placeholder="Search by title..."
            placement="start"
            icon={<Search />}
            variant="search"
            className="w-full dark:text-ch-dark-mode-neutral-100 text-ch-light-mode-neutral-800"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <Button className="flex items-center justify-center" variant="primary">
          <Plus />
          <span className="hidden sm:block text-base pl-1.5">Add Bookmark</span>
        </Button>
        <div>
          <div className="mt-2">
            <PopOver
              trigger={<Avatar />}
              isOpen={popOpen}
              setIsOpen={setPopOpen}
              triggerVariant="naked"
            >
              <div className="px-2">
                <div className="flex gap-2 py-3 px-2">
                  <Avatar />
                  <div>
                    <h1 className="font-semibold text-sm dark:text-white text-ch-light-mode-neutral-900">
                      Etidoh Beth
                    </h1>
                    <span className="font-medium text-sm text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
                      inokon@gmail.com
                    </span>
                  </div>
                </div>
                <div className="border-b-[1.45px] border-ch-light-grey dark:border-ch-dark-mode-neutral-500 -mx-2"></div>
                <div className="py-1.5">
                  <div className="flex items-center justify-between rounded-md p-2 dark:hover:bg-ch-dark-mode-neutral-500 hover:bg-ch-light-mode-neutral-100 dark:hover:text-white hover:text-black text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 transition-colors">
                    <div className="flex items-center gap-2 ">
                      <Palette />
                      <span className="font-semibold text-sm">Theme</span>
                    </div>
                    <div className="p-0.5 rounded-lg flex bg-ch-light-mode-neutral-300 dark:bg-ch-dark-mode-neutral-500">
                      <div
                        className={`rounded-lg w-7 h-7 flex justify-center items-center cursor-pointer transition-colors text-ch-light-mode-neutral-900 dark:text-white ${
                          theme === 'light'
                            ? 'bg-white dark:bg-ch-dark-mode-neutral-600'
                            : 'bg-transparent'
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <Sun />
                      </div>
                      <div
                        className={`rounded-lg w-7 h-7 flex justify-center items-center cursor-pointer transition-colors text-ch-light-mode-neutral-900 dark:text-white ${
                          theme === 'dark'
                            ? 'bg-white dark:bg-ch-dark-mode-neutral-600'
                            : 'bg-transparent'
                        }`}
                        onClick={() => setTheme('dark')}
                      >
                        <Moon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b-[1.45px] border-ch-light-grey dark:border-ch-dark-mode-neutral-500 -mx-2"></div>
                <div className="py-1">
                  <div
                    onClick={() => navigate('/sign-in')}
                    className="flex items-center gap-2 p-2 cursor-pointer rounded-md dark:hover:bg-ch-dark-mode-neutral-500 hover:bg-ch-light-mode-neutral-100 text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 dark:hover:text-white hover:text-black transition-colors"
                  >
                    <SignOut />
                    <span className="font-semibold text-sm">Logout</span>
                  </div>
                </div>
              </div>
            </PopOver>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
