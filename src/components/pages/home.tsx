import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Bookmark, sortOptions } from '../../data/bookmark'
import { Checkmark, Switch } from '../icons'
import Layout from '../layouts/layout'
import { BookmarkCard, Button, FormSection, Modal, PopOver } from '../ui'
import useUIStore from '../../store/ui'
import { BookmarkFields } from '../../configs/forms/bookmark'

interface HeaderSectionProp {
  popOpen: boolean
  setPopOpen: (popOpen: boolean) => void
}

interface AddBookmarkForm {
  title: string
  description: string
  websiteUrl: string
  tags: string
}

const HeaderSection = ({ popOpen, setPopOpen }: HeaderSectionProp) => {
  return (
    <div className="pb-5 flex justify-between items-center">
      <div>
        <span className="font-bold text-xl text-ch-light-mode-neutral-900 dark:text-white">
          All Bookmarks
        </span>
      </div>
      <div>
        <PopOver
          trigger={
            <div className="px-3 h-10.5 bg-white rounded-lg dark:bg-ch-dark-mode-neutral-800 text-ch-dark-mode-neutral-900 dark:text-white border-[1.45px] border-ch-light-mode-neutral-400 dark:border-ch-dark-mode-neutral-500 hover:bg-ch-light-mode-neutral-100 dark:hover:bg-ch-dark-mode-neutral-600 flex items-center gap-2">
              <Switch />
              <span>Sort By</span>
            </div>
          }
          isOpen={popOpen}
          setIsOpen={setPopOpen}
          triggerVariant="naked"
        >
          <SortOptions />
        </PopOver>
      </div>
    </div>
  )
}

const SortOptions = () => {
  return (
    <div className="px-2 w-[200px]">
      {sortOptions.map((option) => (
        <div key={option.value} className="py-1">
          <div className="flex items-center justify-between gap-2 p-2 cursor-pointer rounded-md dark:hover:bg-ch-dark-mode-neutral-500 hover:bg-ch-light-mode-neutral-100 text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 dark:hover:text-white hover:text-black transition-colors">
            <span className="font-semibold text-sm">{option.label}</span>
            <span>{option.selected && <Checkmark />}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const Home = () => {
  const [popOpen, setPopOpen] = useState<boolean>(false)
  const { isModalOpen, setIsModalOpen } = useUIStore()

  const handleModalClose = useCallback(() => setIsModalOpen(false), [])

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBookmarkForm>({
    mode: 'onChange',
  })

  const handleAddOrEditBookmark = () => {}

  return (
    <Layout>
      <HeaderSection popOpen={popOpen} setPopOpen={setPopOpen} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Bookmark.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
      <Modal
        title="Add a Bookmark"
        description="Save a link with details to keep your collection organized."
        isOpen={isModalOpen}
        defaultClose={true}
        onClose={handleModalClose}
      >
        <form onSubmit={handleSubmit(handleAddOrEditBookmark)}>
          <div className="pb-5">
            <FormSection
              fields={BookmarkFields()}
              register={register}
              errors={errors}
              watch={watch}
              variant="light"
            />
          </div>
          <div className="flex gap-4 lg:justify-end">
            <div>
              <Button variant="neutral" onClick={handleModalClose}>
                Cancel
              </Button>
            </div>
            <div>
              <Button type="submit" variant="primary">
                Add Bookmark
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </Layout>
  )
}

export default Home
