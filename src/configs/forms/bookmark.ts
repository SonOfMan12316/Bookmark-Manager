import type { InputsInterface } from '../../types/global'
import { fullNamePattern } from '../../utils/validators'

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
    label: 'Tags*',
    placeholder: 'e.g. Design, Learning, Tools',
    type: 'text',
    name: 'tags',
    onHook: {
      required: 'Tag is required',
      minLength: {
        value: 2,
        message: 'Tags cannot be less than 2 characters',
      },
    },
  },
]
