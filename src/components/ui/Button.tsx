import {
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
  forwardRef,
} from 'react'
import classnames from 'classnames'

import { LoadingDots } from './index'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'remove'
  type?: 'submit' | 'button'
  loading?: boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md'
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
      size = 'sm',
      ...rest
    }: ButtonProps,
    ref?: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={classnames(
          className,
          'w-full p-2 font-semibold rounded-lg transition-all ease-in-out cursor-pointer',
          {
            'py-2.5 px-2 bg-ch-teal-700 hover:bg-ch-teal-800 text-white focus-within:outline-3 focus-within:outline-white focus-within:ring-5 focus-within:ring-ch-teal-700':
              variant === 'primary',
          },
          {
            'py-2.5 px-2bg-ch-light-mode-neutral-400 text-ch-dark-mode-neutral-900':
              variant === 'secondary',
          },
          {
            'py-2.5 px-2bg-ch-red-800 text-white focus-within:outline-3 focus-within:outline-white focus-within:ring-5 focus-within:ring-ch-red-800':
              variant === 'remove',
          },
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
