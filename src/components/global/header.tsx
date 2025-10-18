import { Avatar, Hamburger, Plus, Search } from '../icons'
import { Button, Input } from '../ui'

const Header = () => {
  return (
    <div className="bg-white h-16 px-4 sm:px-8 py-3 sm:py-6 lg:py-9 flex items-center gap-2 flex-grow">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <Hamburger className="lg:hidden" />
        <div className="flex-1 min-w-0 sm:max-w-[320px]">
          <Input
            placeholder="Search by title..."
            placement="start"
            icon={<Search />}
            variant="search"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <Button className="flex items-center justify-center" variant="primary">
          <Plus />
          <span className="hidden sm:block text-base pl-1.5">Add Bookmark</span>
        </Button>
        <div>
          <Avatar />
        </div>
      </div>
    </div>
  )
}

export default Header
