import { useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { Button, FormSection } from '../ui'
import { BookmarkFields } from '../../configs/forms/bookmark'
import { type AddBookmarkForm } from '../../types/global'
import useUIStore from '../../store/ui'
import { useNotification } from '../../hooks'
import { Checkmark } from '../icons'
import { useCreateBookmark, useUpdateBookmark } from '../../hooks/api'
import { suggestTags } from '../../utils/tagSuggestions'

type Mode = 'add' | 'edit'

interface BookmarkFormProps {
  mode: Mode
  onClose: () => void
}

type BookmarkFormValues = Omit<AddBookmarkForm, 'tags'> & {
  tags?: string
}

const BookmarkForm = ({ mode, onClose }: BookmarkFormProps) => {
  const { selectedBookmark, selectedBookmarkId } = useUIStore()
  const { addNotification } = useNotification()
  const createBookmark = useCreateBookmark()
  const updateBookmark = useUpdateBookmark()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BookmarkFormValues>()

  const title = watch('title')
  const description = watch('description')
  const url = watch('url')
  const tagsInput = watch('tags')

  const suggestedTags = useMemo(() => {
    return suggestTags({
      title: String(title ?? ''),
      description: String(description ?? ''),
      url: String(url ?? ''),
    })
  }, [title, description, url])

  const parseTagsInput = (value: unknown): string[] => {
    const raw = Array.isArray(value) ? value.join(',') : value
    return String(raw ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }

  const handleAddSuggestedTag = (tag: string) => {
    const current = parseTagsInput(tagsInput)
    const normalized = (t: string) => t.toLowerCase()

    if (current.some((t) => normalized(t) === normalized(tag))) return

    const next = [...current, tag]
    setValue('tags', next.join(', '), { shouldDirty: true, shouldValidate: true })
  }

  const handleAddAllSuggestedTags = () => {
    const current = parseTagsInput(tagsInput)
    const normalized = (t: string) => t.toLowerCase()

    const next = [
      ...current,
      ...suggestedTags.filter((t) => !current.some((c) => normalized(c) === normalized(t))),
    ]

    setValue('tags', next.join(', '), { shouldDirty: true, shouldValidate: true })
  }

  useEffect(() => {
    if (selectedBookmark && mode === 'edit') {
      setValue('title', selectedBookmark.title)
      setValue('description', selectedBookmark.description)
      setValue('url', selectedBookmark.url)

      const tagsString = Array.isArray(selectedBookmark.tags)
        ? selectedBookmark.tags.join(', ')
        : String(selectedBookmark.tags || '')
      setValue('tags', tagsString)
    }
  }, [selectedBookmark, mode, setValue])

  const onSubmit = (data: BookmarkFormValues) => {
    const tagsValue = data.tags || ''
    const tagsArray = Array.isArray(tagsValue)
      ? tagsValue
      : String(tagsValue).split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0)

    if (mode === 'add') {
      createBookmark.mutate(
        {
          title: data.title,
          url: data.url,
          description: data.description,
          tags: tagsArray,
        },
        {
          onSuccess: () => {
            addNotification({
              id: 'add-bookmark-id',
              message: 'Bookmark added successfully.',
              icon: <Checkmark />,
              duration: 5000,
            })
            onClose()
          },
        }
      )
    } else if (mode === 'edit' && selectedBookmarkId) {
      updateBookmark.mutate(
        {
          id: selectedBookmarkId,
          data: {
            title: data.title,
            url: data.url,
            description: data.description,
            tags: tagsArray,
          },
        },
        {
          onSuccess: () => {
            addNotification({
              id: 'edit-bookmark-id',
              message: 'Changes saved.',
              icon: <Checkmark />,
              duration: 5000,
            })
            onClose()
          },
        }
      )
    }
  }

  const isPending = createBookmark.isPending || updateBookmark.isPending

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

      {suggestedTags.length > 0 && (String(url ?? '').trim().length > 0 || String(title ?? '').trim().length > 0) && (
        <div className="pb-6">
          <div className="text-sm font-semibold mb-2 text-ch-light-mode-neutral-900 dark:text-white">
            Suggested tags
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddSuggestedTag(tag)}
                className="h-5.5 px-2 flex items-center justify-center bg-ch-light-mode-neutral-100 dark:bg-ch-dark-mode-neutral-600 rounded-md text-xs font-medium text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 hover:bg-ch-light-mode-neutral-200 dark:hover:bg-ch-dark-mode-neutral-500 transition-colors"
              >
                {tag}
              </button>
            ))}

            <button
              type="button"
              onClick={handleAddAllSuggestedTags}
              className="h-5.5 px-2 flex items-center justify-center rounded-md text-xs font-semibold text-ch-light-mode-neutral-800 dark:text-ch-light-mode-neutral-100 hover:bg-ch-light-mode-neutral-100 dark:hover:bg-ch-dark-mode-neutral-500 transition-colors"
            >
              Add all
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4 lg:justify-end">
        <Button variant="neutral" onClick={onClose} type="button" disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? 'Saving...' : mode === 'add' ? 'Add Bookmark' : 'Save Bookmark'}
        </Button>
      </div>
    </form>
  )
}

export default BookmarkForm
