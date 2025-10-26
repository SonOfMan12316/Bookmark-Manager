import {
  type TextareaHTMLAttributes,
  type ReactNode,
  forwardRef,
  useRef,
} from 'react'
import classnames from 'classnames'

import { useMergeRefs } from '../../hooks'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  label?: string | ReactNode
  variant?: 'light' | 'search' | 'dark'
  required?: boolean
  disabled?: boolean
  hasError?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      className,
      label,
      placeholder,
      onChange,
      variant = 'light',
      rows = 3,
      disabled,
      required,
      ...rest
    } = props
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const mergeRefs = useMergeRefs([ref, inputRef])

    const textareaClass = classnames(
      'w-full h-fit relative rounded-lg border-[1.45px] shadow-[0_2px_4px_0_rgba(21, 21, 21, 0.06)] px-3 text-sm font-medium cursor-pointer',
      {
        'bg-white hover:bg-ch-light-mode-neutral-100 border-ch-light-mode-neutral-500':
          variant === 'light',
        'dark:bg-ch-dark-mode-neutral-600 dark:border-ch-dark-mode-neutral-300 hover:dark:bg-ch-dark-mode-neutral-400':
          variant === 'light',
        'focus-within:outline focus-within:outline-3 focus-within:outline-white dark:focus-within:outline dark:focus-within:outline-ch-light-mode-neutral-500 focus-within:ring-5 focus-within:ring-ch-teal-700':
          variant === 'light',
        'text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 placeholder:text-ch-light-mode-neutral-800 dark:placeholder:text-ch-dark-mode-neutral-100 placeholder:text-base placeholder:font-medium bg-transparent':
          variant === 'light',
      },
      {
        '!border-ch-red-800 dark:!border-ch-red-600': (props as TextareaProps)
          .hasError,
      }
    )

    return (
      <label className={classnames(className, 'flex flex-col items-start')}>
        {label && (
          <span className="text-black dark:text-white text-sm font-semibold mb-2 flex items-center">
            {label}
            {required && (
              <span className="text-ch-teal-700 dark:text-ch-dark-mode-neutral-100 pl-1">
                *
              </span>
            )}
          </span>
        )}

        <textarea
          className={textareaClass}
          placeholder={placeholder}
          onChange={onChange}
          ref={mergeRefs}
          rows={rows}
          {...rest}
        />
      </label>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
