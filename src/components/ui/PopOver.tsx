import { type ReactNode } from 'react'
import Button from './Button'
import { type ButtonVariant } from './Button'
import classnames from 'classnames'
import { useClickOutside } from '../../hooks'
import useUIStore from '../../store/ui'

interface PopoverProps {
  isOpen?: boolean
  setIsOpen: (newState: boolean) => void
  trigger: ReactNode
  triggerVariant?: ButtonVariant
  children: ReactNode
  className?: string
  contentPositionY?: 'top' | 'bottom'
  contentPositionX?: 'left' | 'right'
  hover?: boolean
}

const Popover = ({
  isOpen,
  setIsOpen,
  trigger,
  triggerVariant = 'naked',
  children,
  className,
  contentPositionY = 'bottom',
  contentPositionX = 'left',
  hover,
}: PopoverProps) => {
  const { popoverState } = useUIStore()
  const popoverRef = useClickOutside(() => {
    if (!popoverState) {
      setIsOpen(false)
    }
  })

  return (
    <div className={`w-fit relative ${className}`} ref={popoverRef}>
      <Button
        variant={triggerVariant}
        className="inline-block"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </Button>
      {isOpen && (
        <div
          className={classnames(
            'absolute z-20 bg-white dark:bg-ch-dark-mode-neutral-600 rounded-lg transition-all duration-300 ease-in-out mt-3.5 xl:mt-4',
            {
              'right-0': contentPositionX === 'left',
              'left-0': contentPositionX === 'right',
              'top-8': contentPositionY === 'bottom',
              'h-fit pt-0 border-[1.45px] dark:border-ch-dark-mode-neutral-400 border-ch-light-mode-neutral-100':
                isOpen,
              'h-0 w-0 overflow-hidden': !isOpen,
              'shadow-budget-popover': !hover,
            }
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Popover
