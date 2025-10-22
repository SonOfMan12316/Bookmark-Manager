import { useState, type ReactNode } from 'react'
import { Header, Sidenav } from '../global'

interface LayoutProp {
  children: ReactNode
}

const Layout = ({ children }: LayoutProp) => {
  const [showSidenav, setShowSidenav] = useState<boolean>(false)

  return (
    <div className="h-full bg-ch-light-mode-neutral-100 dark:bg-ch-dark-mode-neutral-800">
      {showSidenav && <div className="fixed inset-0 z-20 bg-ch-blur"></div>}
      <div className="lg:flex">
        <Sidenav showSidenav={showSidenav} setShowSidenav={setShowSidenav} />
        <main className="w-full flex flex-col">
          <Header setShowSidenav={setShowSidenav} />
          <div className="h-full px-4 sm:px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
