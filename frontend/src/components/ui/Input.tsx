import {
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  forwardRef,
  useRef,
} from 'react'
import classnames from 'classnames'
import { type InputVariant } from '../../types/ui'
import { useMergeRefs } from '../../hooks'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  innerClassName?: string
  label?: string | ReactNode
  icon?: string | ReactNode
  placement?: 'start' | 'end'
  variant?: InputVariant
  hasError?: boolean
  extraRef?: Ref<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    innerClassName,
    label,
    placeholder,
    icon,
    placement = 'start',
    type = 'text',
    variant = 'light',
    required,
    extraRef,
    autoComplete = 'on',
    ...rest
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const mergeRefs = useMergeRefs([ref, inputRef, extraRef ?? null])

  const inputWrapperClass = classnames(
    'w-full h-fit relative rounded-lg border-[1.45px] shadow-[0_2px_4px_0_rgba(21, 21, 21, 0.06)] px-3',
    {
      'bg-white hover:bg-ch-light-mode-neutral-100 border-ch-light-mode-neutral-500':
        variant !== 'search',
      'dark:bg-ch-dark-mode-neutral-600 dark:border-ch-dark-mode-neutral-300 hover:dark:bg-ch-dark-mode-neutral-400':
        variant !== 'search',
      'focus-within:outline focus-within:outline-3 focus-within:outline-white dark:focus-within:outline dark:focus-within:outline-ch-light-mode-neutral-500 focus-within:ring-5 focus-within:ring-ch-teal-700':
        variant !== 'search',
    },
    {
      'bg-white dark:bg-ch-dark-mode-neutral-600 dark:border-ch-dark-mode-neutral-500 dark:hover:bg-ch-dark-mode-neutral-400 hover:bg-ch-light-mode-neutral-100 border border-ch-light-mode-neutral-300':
        variant === 'search',
    },
    {
      '!border-ch-red-800 dark:!border-ch-red-600': (props as InputProps)
        .hasError,
    }
  )

  const inputClass = classnames(
    innerClassName ?? 'w-full cursor-pointer',
    {
      'text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 text-sm font-medium placeholder:text-ch-light-mode-neutral-800 dark:placeholder:text-ch-dark-mode-neutral-100 placeholder:text-sm placeholder:font-medium w-full h-12 focus:outline-none outline-none rounded-lg bg-transparent':
        variant === 'light',
    },
    {
      'h-10 placeholder:text-ch-light-mode-neutral-800 dark:placeholder:text-ch-dark-mode-neutral-100 text-black dark:text-white text-sm dark:text-ch-dark-mode-neutral-100 placeholder:font-medium placeholder:text-sm focus:outline-none outline-none':
        variant === 'search',
    },
    {
      '!pl-8': icon && placement === 'start',
      '!pr-12': icon && placement === 'end',
    }
  )

  const iconClass = classnames('absolute -translate-y-1/2 top-1/2 mt-[0.5px]', {
    'font-medium': typeof icon === 'string',
    'ml-3 left-0': placement === 'start',
    'mr-3 right-0': placement === 'end',
  })

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
      <div className={inputWrapperClass}>
        {icon && <span className={iconClass}>{icon}</span>}
        <input
          {...rest}
          className={inputClass}
          placeholder={placeholder}
          type={type}
          autoComplete={autoComplete}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          ref={mergeRefs}
        />
      </div>
    </label>
  )
})

export default Input
