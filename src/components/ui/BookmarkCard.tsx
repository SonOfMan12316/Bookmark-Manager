import { useState, type ReactNode } from 'react'
import {
  type ActionItem,
  type Bookmark,
  type AddBookmarkForm,
} from '../../types/global'
import {
  Calendar,
  Clock,
  Eye,
  Pin,
  VerticalDots,
  Copy,
  Edit,
  External,
  Archive,
} from '../icons'
import { formatUTC } from '../../utils/date'
import Popover from './PopOver'
import { ensureUrl } from '../../utils/validators'
import { useNotification } from '../../hooks'
import useUIStore from '../../store/ui'

interface BookmarkProp {
  bookmark: Bookmark
}

interface MetaProp {
  icon: ReactNode
  label: string | number
}

const Meta = ({ icon, label }: MetaProp) => {
  return (
    <div className="flex items-center gap-1.5">
      {icon} {label}
    </div>
  )
}

const BookmarkCard = ({ bookmark }: BookmarkProp) => {
  const [popOpen, setPopOpen] = useState(false)
  const { addNotification } = useNotification()

  const { setModalType, setSelectedBookmark } = useUIStore()

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url)
      addNotification({
        id: 'copy-url-id',
        message: 'Link copied to clipboard.',
        icon: <Copy />,
        duration: 5000,
      })
    } catch (error) {
      addNotification({
        id: 'copy-url-id',
        icon: <Copy />,
        message: 'Failed to copy link.',
        duration: 5000,
      })
    }
  }

  const handleEdit = () => {
    setSelectedBookmark(bookmark)
    setModalType('edit')
  }

  const actions: ActionItem[] = [
    { icon: <External />, label: 'Visit', href: ensureUrl(bookmark.url) },
    { icon: <Copy />, label: 'Copy URL', onClick: handleCopyUrl },
    { icon: <Pin />, label: 'Pin' },
    {
      icon: <Edit />,
      label: 'Edit',
      onClick: handleEdit,
    },
    { icon: <Archive />, label: 'Archive' },
  ]

  return (
    <div
      key={bookmark.id}
      className="p-4 bg-white dark:bg-ch-dark-mode-neutral-800 rounded-xl"
    >
      <div className="h-[13.5rem] flex flex-col justify-between">
        <div className="flex justify-between pb-4 border-b-[1.45px] border-b-ch-light-mode-neutral-100 dark:border-b-ch-dark-mode-neutral-500">
          <div className="flex items-center gap-2.5">
            <img
              className="h-10 w-10 border-[1.45px] border-ch-light-mode-neutral-100 dark:border-ch-dark-mode-neutral-500 rounded-lg"
              src={bookmark.favicon}
              alt={`${bookmark.title}`}
            />
            <div className="flex flex-col">
              <h1 className="text-ch-light-mode-neutral-900 dark:text-white font-bold text-xl">
                {bookmark.title}
              </h1>
              <span className="text-xs font-medium text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 text-wrap">
                {bookmark.url.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
            </div>
          </div>

          <Popover
            isOpen={popOpen}
            setIsOpen={setPopOpen}
            trigger={
              <div className="cursor-pointer h-8 w-8 flex items-center justify-center border-[1.45px] hover:bg-ch-light-mode-neutral-100 dark:hover:bg-ch-dark-mode-neutral-400/30 border-ch-light-mode-neutral-400 dark:border-ch-dark-mode-neutral-500 bg-white dark:bg-ch-dark-mode-neutral-800 rounded-lg">
                <VerticalDots className="text-ch-light-mode-neutral-900 dark:text-white" />
              </div>
            }
            triggerVariant="naked"
          >
            <div className="p-2 w-[200px]">
              {actions.map(({ icon, onClick, label, href }) => (
                <div
                  key={label}
                  onClick={onClick ? () => onClick(bookmark) : undefined}
                >
                  <div className="flex items-center justify-start p-2 font-semibold text-sm cursor-pointer rounded-md dark:hover:bg-ch-dark-mode-neutral-500 hover:bg-ch-light-mode-neutral-100 text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 dark:hover:text-white transition-colors w-full">
                    {href ? (
                      <a
                        target="_blank"
                        href={ensureUrl(bookmark.url)}
                        rel="noopener noreferrer"
                        className="flex items-center w-full"
                      >
                        <>
                          <span className="w-6 flex-shrink-0 flex items-center hover:text-black">
                            {icon}
                          </span>
                          <span className="truncate">{label}</span>
                        </>
                      </a>
                    ) : (
                      <>
                        <span className="w-6 flex-shrink-0 flex items-center hover:text-black">
                          {icon}
                        </span>
                        <span className="truncate">{label}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Popover>
        </div>

        <p className="my-4 font-medium text-sm text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 leading-[150%] tracking-[1%]">
          {bookmark.description}
        </p>

        <div className="flex gap-2 flex-wrap content-end">
          {bookmark.tags.map((tag) => (
            <div
              key={tag}
              className="h-5.5 px-2 flex items-center justify-center bg-ch-light-mode-neutral-100 dark:bg-ch-dark-mode-neutral-600 rounded-md"
            >
              <span className="text-xs font-medium text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 -mx-4 border-b-[1.45px] border-b-ch-light-mode-neutral-100 dark:border-b-ch-dark-mode-neutral-500"></div>
      <div className="pt-3 flex justify-between items-center font-medium text-xs text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Meta icon={<Eye />} label={bookmark.visitCount} />
            <Meta
              icon={<Clock />}
              label={formatUTC(bookmark.lastVisited || '')}
            />
            <Meta icon={<Calendar />} label={formatUTC(bookmark.createdAt)} />
          </div>
        </div>
        <div>
          <Pin />
        </div>
      </div>
    </div>
  )
}

export default BookmarkCard
