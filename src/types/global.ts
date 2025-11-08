import { type ReactNode } from 'react'
import { type FieldError } from 'react-hook-form'
import type { InputVariant } from './ui'
export interface Tag {
  name: string
  count?: number
}

export interface Bookmark {
  id: string
  title: string
  url: string
  favicon: string
  description: string
  tags: string[]
  pinned: boolean
  isArchived: boolean
  visitCount: number
  createdAt: string
  lastVisited: string | null
}

export type InputTypes =
  | 'text'
  | 'number'
  | 'select'
  | 'textarea'
  | 'dropdown'
  | 'email'

export interface InputsInterface {
  label: string | ReactNode
  placeholder: string
  name: any
  type?: InputTypes
  onHook?: Record<string, any>
  onChange?: () => void
  error?: FieldError
  icon?: ReactNode
  maxLength?: number
  minLength?: number
  max?: string | number
  min?: string | number
  disabled?: boolean
  required?: boolean
  className?: string
  variant?: InputVariant
  readOnly?: boolean
}

export interface ToastNotification {
  id: string
  message: string
  icon: ReactNode
  duration?: number
}

export interface ActionItem {
  icon: ReactNode
  label: string
  onClick?: (bookmark?: Bookmark) => void
  href?: string
}

export interface AddBookmarkForm {
  title: string
  description: string
  url: string
  tags: string[]
}

export type BookmarkFilter = 'all' | 'archived'

export type SortBy = 'recently-added' | 'recently-visited' | 'most-visited'