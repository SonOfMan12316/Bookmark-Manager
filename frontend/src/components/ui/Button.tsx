import {
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
  forwardRef,
} from 'react'
import classnames from 'classnames'

import { LoadingDots } from './index'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'remove'
  | 'tertiary'
  | 'naked'
  | 'neutral'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
  type?: 'submit' | 'button'
  loading?: boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      type = 'button',
      loading,
      disabled,
      size,
      ...rest
    }: ButtonProps,
    ref?: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={classnames(
          className,
          'w-full p-2 font-semibold rounded-lg transition-all ease-in-out cursor-pointer border-[1.45px]',
          {
            'py-2.5 px-3 bg-ch-teal-700 font-semibold shadow-2xl  border-ch-dark-mode-neutral-300/30 border-b-0 hover:bg-ch-teal-800 text-white focus-within:outline-3 focus-within:outline-white focus-within:ring-5 focus-within:ring-ch-teal-700':
              variant === 'primary',
          },
          {
            'py-2.5 px-2 bg-ch-light-mode-neutral-400 text-ch-dark-mode-neutral-900':
              variant === 'secondary',
          },
          {
            'py-2.5 px-2 bg-ch-red-800 shadow-2xl text-white focus-within:outline-3 border-none focus-within:outline-white focus-within:ring-5 focus-within:ring-ch-red-800':
              variant === 'remove',
          },
          {
            'text-ch-grey hover:text-black !w-auto h-14 bg-transparent border-none shadow-none outline-none py-0 px-0':
              variant === 'tertiary',
          },
          {
            '!w-auto h-auto bg-transparent border-none shadow-none outline-none py-0 px-0':
              variant === 'naked',
          },
          {
            'px-3 bg-white dark:bg-ch-dark-mode-neutral-800 text-ch-dark-mode-neutral-900 dark:text-white border-ch-light-mode-neutral-400 dark:border-ch-dark-mode-neutral-500 hover:bg-ch-light-mode-neutral-100 dark:hover:bg-ch-dark-mode-neutral-600': variant === 'neutral'
          },
          { 'text-lg md:text-xl': size === 'lg' },
          { 'text-base md:text-lg': size === 'md' },
          { 'text-sm md:text-base': size === 'sm' },
          { 'text-xs': size === 'xs' }
        )}
        type={type}
        disabled={loading || disabled}
        ref={ref}
        {...rest}
      >
        {loading ? <LoadingDots /> : children}
      </button>
    )
  }
)

export default Button
