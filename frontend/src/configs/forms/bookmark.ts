import type { InputsInterface } from '../../types/global'

export const BookmarkFields = (): InputsInterface[] => [
  {
    label: 'Title*',
    placeholder: '',
    type: 'text',
    name: 'title',
    onHook: {
      required: 'Title is required',
      minLength: {
        value: 2,
        message: 'Title cannot be less than 2 characters',
      },
    },
  },
  {
    label: 'Description*',
    placeholder: '',
    type: 'textarea',
    name: 'description',
    onHook: {
      required: 'Description is required',
      minLength: {
        value: 2,
        message: 'Description cannot be less than 2 characters',
      }
    },
  },
  {
    label: 'Website URL*',
    placeholder: '',
    type: 'text',
    name: 'url',
    onHook: {
      required: 'Website URL is required',
      minLength: {
        value: 2,
        message: 'Website URL cannot be less than 2 characters',
      },
    },
  },
  {
    label: 'Tags',
    placeholder: 'e.g. Design, Learning, Tools',
    type: 'text',
    name: 'tags',
    onHook: {
      validate: (value: unknown) => {
        const raw = String(value ?? '').trim()
        if (!raw) return true

        const tags = raw
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)

        if (!tags.length) return true
        if (tags.some((t) => t.length < 2)) return 'Each tag must be at least 2 characters'

        return true
      },
    },
  },
]
