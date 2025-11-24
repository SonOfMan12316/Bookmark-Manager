import { type ReactNode } from 'react'
import { Logo } from '../icons'

interface OnboardingLayoutProp {
  children: ReactNode
  title: string
  instruction: string
}

const OnboardingLayout = ({
  title,
  instruction,
  children,
}: OnboardingLayoutProp) => {
  return (
    <div className="h-screen bg-ch-light-mode-neutral-100 dark:bg-ch-dark-mode-neutral-900 px-4">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white dark:border dark:bg-ch-dark-mode-neutral-800 dark:border-ch-dark-mode-neutral-500 px-4 sm:px-7 py-6 w-[430px] rounded-xl shadow-[0_2px_4px_0_rgba(21, 21, 21, 0.06)]">
          <Logo />
          <div className="mt-1 sm:mt-3 mb-1 sm:mb-3">
            <h1 className="font-bold text-2xl pb-0.5 dark:text-white">
              {title}
            </h1>
            <span className="text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 text-sm font-medium ">
              {instruction}
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default OnboardingLayout
