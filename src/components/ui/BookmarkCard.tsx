import type { ReactNode } from 'react'
import type { Bookmark } from '../../types/global'
import { Calendar, Clock, Eye, Pin, VerticalDots } from '../icons'
import { formatUTC } from '../../utils/date'

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
  return (
    <div
      key={bookmark.id}
      className="p-4 bg-white dark:bg-ch-dark-mode-neutral-800 rounded-xl"
    >
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

        <div className="cursor-pointer h-8 w-8 flex items-center justify-center border-[1.45px] hover:bg-ch-light-mode-neutral-100 dark:hover:bg-ch-dark-mode-neutral-400/30 border-ch-light-mode-neutral-400 dark:border-ch-dark-mode-neutral-500 bg-white dark:bg-ch-dark-mode-neutral-800 rounded-lg">
          <VerticalDots className="text-ch-light-mode-neutral-900 dark:text-white" />
        </div>
      </div>

      <p className="my-4 font-medium text-sm text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 leading-[150%] tracking-[1%]">
        {bookmark.description}
      </p>

      <div className="flex gap-2 flex-wrap">
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
