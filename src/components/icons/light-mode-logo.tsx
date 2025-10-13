import { Bookmark } from '../icons'

const Logo = () => {
  return (
    <div className="flex items-center space-x-1.5">
      <Bookmark />
      <h1 className="font-sans font-bold text-xl text-black dark:text-white">
        Bookmark Manager
      </h1>
    </div>
  )
}

export default Logo
