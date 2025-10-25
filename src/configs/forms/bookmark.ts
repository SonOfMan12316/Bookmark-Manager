import type { InputsInterface } from '../../types/global'
import { fullNamePattern } from '../../utils/validators'

export const BookmarkFields = (): InputsInterface[] => [
  {
    label: 'Title*',
    placeholder: '',
    type: 'text',
    name: 'Title',
    onHook: {
      required: 'Title is required',
      minLength: {
        value: 2,
        message: 'Title cannot be less than 2 characters',
      },
      pattern: fullNamePattern('Title'),
    },
  },
  {
    label: 'Description*',
    placeholder: '',
    type: 'textarea',
    name: 'Description',
    onHook: {
      required: 'Description is required',
      minLength: {
        value: 2,
        message: 'Description cannot be less than 2 characters',
      },
      pattern: fullNamePattern('Description'),
    },
  },
  {
    label: 'Website URL*',
    placeholder: '',
    type: 'text',
    name: 'WebsiteURL',
    onHook: {
      required: 'Website URL is required',
      minLength: {
        value: 2,
        message: 'Website URL cannot be less than 2 characters',
      },
      pattern: fullNamePattern('WebsiteURL'),
    },
  },
  {
    label: 'Tags*',
    placeholder: 'e.g. Design, Learning, Tools',
    type: 'text',
    name: 'Tags',
    onHook: {
      required: 'Tag is required',
      minLength: {
        value: 2,
        message: 'Tags cannot be less than 2 characters',
      },
      pattern: fullNamePattern('WebsiteURL'),
    },
  },
]
