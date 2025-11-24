import { useState, type ReactNode } from 'react'
import { Header, Sidenav } from '../global'

interface LayoutProp {
  children: ReactNode
}

const Layout = ({ children }: LayoutProp) => {
  const [showSidenav, setShowSidenav] = useState<boolean>(false)

  return (
    <div className="h-screen bg-ch-light-mode-neutral-100 dark:bg-ch-dark-mode-neutral-900">
      {showSidenav && (
        <div className="fixed inset-0 z-20 bg-ch-blur xl:hidden"></div>
      )}
      <div className="xl:flex h-screen">
        <div
          className={`
            fixed inset-y-0 left-0 z-30
            xl:static xl:flex-shrink-0 xl:h-full xl:overflow-y-auto scrollbar-hide
          bg-white dark:bg-ch-dark-mode-neutral-800 border-r-[1.45px] border-r-ch-light-mode-neutral-300 dark:border-r-ch-dark-mode-neutral-500 
          `}
        >
          <Sidenav showSidenav={showSidenav} setShowSidenav={setShowSidenav} />
        </div>
        <main className="flex flex-col w-full h-full">
          <div className="sticky top-0 z-10">
            <Header setShowSidenav={setShowSidenav} />
          </div>
          <div className="flex-grow overflow-y-auto px-4 sm:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
