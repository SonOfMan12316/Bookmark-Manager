import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Button, FormSection } from '.'
import { BookmarkFields } from '../../configs/forms/bookmark'
import { type AddBookmarkForm } from '../../types/global'
import useUIStore from '../../store/ui'

interface BookmarkFormProps {
  mode: 'add' | 'edit'
  onClose: () => void
}

const BookmarkForm = ({ mode, onClose }: BookmarkFormProps) => {
  const { selectedBookmark } = useUIStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<AddBookmarkForm>()

  useEffect(() => {
    if(selectedBookmark && mode === 'edit') {
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
        <Button type="submit" variant="primary">
          {mode === 'add' ? 'Add Bookmark' : 'Save Bookmark'}
        </Button>
      </div>
    </form>
  )
}

export default BookmarkForm
