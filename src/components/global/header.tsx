import { useState } from 'react'
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

const Header = () => {
  const [popOpen, setPopOpen] = useState<boolean>(false)

  const { theme, setTheme } = useUIStore()

  return (
    <div className="bg-white dark:bg-ch-dark-mode-neutral-800 dark:border-b dark:border-b-ch-dark-mode-neutral-400 h-16 px-4 sm:px-8 py-3 sm:py-6 lg:py-9 flex items-center gap-2 flex-grow">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <Hamburger className="lg:hidden text-ch-light-mode-neutral-900 dark:text-white" />
        <div className="flex-1 min-w-0 sm:max-w-[320px]">
          <Input
            placeholder="Search by title..."
            placement="start"
            icon={<Search />}
            variant="search"
            className="w-full dark:text-ch-dark-mode-neutral-100"
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
              <div className="whitespace-nowrap py-3">
                <div className="mb-4">
                  <div className="flex gap-2 px-4">
                    <Avatar />
                    <div>
                      <h1 className="font-semibold text-sm dark:text-white text-ch-light-mode-neutral-900">
                        Etidoh
                      </h1>
                      <span className="font-medium text-sm text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
                        emilia101@gmail.com
                      </span>
                    </div>
                  </div>
                  <div className="py-1 border-b-[1.45px] transition-none border-b-ch-light-grey dark:border-b-ch-dark-mode-neutral-500"></div>
                  <div className="flex justify-between px-4 pt-3.5 pb-1.5">
                    <div className="flex items-center gap-2 text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
                      <Palette />
                      <span className="font-semibold text-sm ">Theme</span>
                    </div>
                    <div className="p-0.5 rounded-lg flex bg-ch-light-mode-neutral-300 dark:bg-ch-dark-mode-neutral-500">
                      <div
                        className={`rounded-md w-7.5 h-7.5 flex justify-center items-center cursor-pointer transition-colors text-ch-light-mode-neutral-900 dark:text-white ${
                          theme === 'light'
                            ? 'bg-white dark:bg-ch-dark-mode-neutral-600'
                            : 'bg-transparent'
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <Sun />
                      </div>
                      <div
                        className={`rounded-md w-7.5 h-7.5 flex justify-center items-center cursor-pointer transition-colors text-ch-light-mode-neutral-900 dark:text-white ${
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
                  <div className="pt-1 border-b-[1.45px] border-b-ch-light-grey dark:border-b-ch-dark-mode-neutral-500"></div>
                </div>
                <div className="px-4">
                  <Button
                    variant="naked"
                    className="flex items-center gap-2 text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100"
                  >
                    <SignOut />
                    <div>
                      <span className="font-semibold text-sm">Logout</span>
                    </div>
                  </Button>
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
