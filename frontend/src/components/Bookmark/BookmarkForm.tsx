import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Button, FormSection } from '../ui'
import { BookmarkFields } from '../../configs/forms/bookmark'
import { type AddBookmarkForm } from '../../types/global'
import useUIStore from '../../store/ui'
import { useBookmarksStore } from '../../store'
import { useNotification } from '../../hooks'
import { Checkmark } from '../icons'

type Mode = 'add' | 'edit'

interface BookmarkFormProps {
  mode: Mode
  onClose: () => void
}

const BookmarkForm = ({ mode, onClose }: BookmarkFormProps) => {
  const { selectedBookmark, selectedBookmarkId } = useUIStore()
  const { addBookmark, updateBookmark } = useBookmarksStore()
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

      const tagsString = Array.isArray(selectedBookmark.tags) 
        ? selectedBookmark.tags.join(', ')
        : String(selectedBookmark.tags || '')
      setValue('tags', tagsString as any)
    }
  }, [selectedBookmark, mode, setValue])

  const onSubmit = (data: any) => {
    const tagsValue = data.tags || ''
    const tagsArray = Array.isArray(tagsValue) 
      ? tagsValue 
      : String(tagsValue).split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0)

    if (mode === 'add') {
      addBookmark({
        title: data.title,
        url: data.url,
        description: data.description,
        tags: tagsArray,
        favicon: '',
      })
      addNotification({
        id: 'add-bookmark-id',
        message: 'Bookmark added successfully.',
        icon: <Checkmark />,
        duration: 5000,
      })
    } else if (mode === 'edit' && selectedBookmarkId) {
      updateBookmark(selectedBookmarkId, {
        title: data.title,
        url: data.url,
        description: data.description,
        tags: tagsArray,
      })
      addNotification({
        id: 'edit-bookmark-id',
        message: 'Changes saved.',
        icon: <Checkmark />,
        duration: 5000,
      })
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
        <Button  type="submit" variant="primary">
          {mode === 'add' ? 'Add Bookmark' : 'Save Bookmark'}
        </Button>
      </div>
    </form>
  )
}

export default BookmarkForm
