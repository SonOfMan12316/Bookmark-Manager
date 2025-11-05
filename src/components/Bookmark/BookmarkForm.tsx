import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Button, FormSection } from '../ui'
import { BookmarkFields } from '../../configs/forms/bookmark'
import { type AddBookmarkForm } from '../../types/global'
import useUIStore from '../../store/ui'
import { useNotification } from '../../hooks'
import { Checkmark } from '../icons'

type Mode = 'add' | 'edit'

interface BookmarkFormProps {
  mode: Mode
  onClose: () => void
}

const BookmarkForm = ({ mode, onClose }: BookmarkFormProps) => {
  const { selectedBookmark } = useUIStore()
  const { addNotification } = useNotification()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddBookmarkForm>()

  useEffect(() => {
    if (selectedBookmark && mode === 'edit') {
      setValue('title', selectedBookmark.title)
      setValue('description', selectedBookmark.description)
      setValue('url', selectedBookmark.url)
      setValue('tags', selectedBookmark.tags)
    }
  }, [selectedBookmark])

  const onSubmit = () => {
    if (mode === 'add') {
    } else if (mode === 'edit') {
    }

    onClose()
  }

  const showToast = (mode: Mode) => {
    if (mode === 'add') {
      addNotification({
        id: 'add-bookmark-id',
        message: 'Bookmark added successfully.',
        icon: <Checkmark />,
        duration: 5000,
      })
    } else {
      addNotification({
        id: 'add-bookmark-id',
        message: 'Changes saved.',
        icon: <Checkmark />,
        duration: 5000,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button variant="neutral" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit" onClick={() => showToast(mode)} variant="primary">
          {mode === 'add' ? 'Add Bookmark' : 'Save Bookmark'}
        </Button>
      </div>
    </form>
  )
}

export default BookmarkForm
