import { createPortal } from 'react-dom'
import classnames from 'classnames'
import { useEffect, useRef, type ReactNode } from 'react'
import { Cancel } from '../icons'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
  className?: string
  title?: string
  description?: string
  onClose?: () => void
  defaultClose?: boolean
  zIndex?: number
  isDialog?: boolean
}

const Modal = ({
  isOpen = false,
  children,
  className,
  title,
  description,
  onClose,
  defaultClose,
  zIndex = 40,
  isDialog,
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      {isOpen &&
        createPortal(
          <dialog
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed w-full h-full top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black/50"
            style={{ zIndex }}
          >
            <section
              className={classnames(
                className,
                `relative bg-white dark:bg-ch-dark-mode-neutral-800 dark:border-[1.45px] dark:border-ch-dark-mode-neutral-500 ${
                  isDialog
                    ? 'p-4 sm:p-6 sm:max-w-[450px]'
                    : 'px-4 py-6 sm:py-8 sm:max-w-[570px] max-h-[85vh]'
                } w-full  max-w-[90%] rounded-xl`
              )}
            >
              {defaultClose ? (
                <button
                  type="button"
                  aria-label={title ? `Close ${title}` : 'Close dialog'}
                  onClick={onClose}
                  className="p-1 absolute top-5 right-5 z-20 cursor-pointer flex items-center justify-center border-[1.45px] border-ch-light-mode-neutral-100 dark:border-ch-dark-mode-neutral-500 dark:text-white hover:bg-ch-light-mode-neutral-400 dark:hover:bg-ch-dark-mode-neutral-600 rounded-lg"
                >
                  <div>
                    <Cancel />
                  </div>
                </button>
              ) : (
                <Cancel
                  onClick={onClose}
                  className="absolute top-2 right-2 sm:top-4.5 sm:right-4.5 z-20 cursor-pointer"
                />
              )}
              <div className="w-full lg:px-2 max-h-[75vh] flex flex-col">
                <div
                  className={`sticky top-0 z-10 ${
                    isDialog ? 'pb-1' : 'pb-8 px-2'
                  }`}
                >
                  {title && (
                    <h2
                      className={`font-bold text-2xl text-black dark:text-white ${
                        isDialog ? 'sm:pb-1' : ''
                      }`}
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <span className="font-medium text-sm text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
                      {description}
                    </span>
                  )}
                </div>
                <div
                  className={`w-full pb-1.5 ${
                    isDialog ? '' : 'px-2'
                  } overflow-y-auto custom-scrollbar`}
                >
                  {children}
                </div>
              </div>
            </section>
          </dialog>,
          document.body
        )}
    </>
  )
}

export default Modal
