import Modal from './Modal'
import { Button } from '.'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  zIndex?: 30 | 40
  message?: string
  confirmText?: string
  confirmVariant?: 'primary' | 'remove' | 'secondary' | 'neutral'
  cancelText?: string
  onCancel: () => void
  handleConfirm?: () => void
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    isOpen,
    zIndex,
    title,
    message,
    confirmText,
    onCancel,
    handleConfirm,
    confirmVariant = 'primary',
  } = props
  return (
    <Modal
      zIndex={zIndex ? zIndex : 30}
      isOpen={isOpen}
      title={title}
      onClose={() => onCancel()}
      isDialog={true}
      defaultClose={false}
    >
      <div className="">
        <div className="">
          <h1 className="text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 text-sm font-medium">
            {message}
          </h1>
        </div>
        <div className="flex mt-4 sm:mt-6 ju justify-center sm:justify-end pr-2">
          <div className="flex w-full gap-3 sm:gap-4 sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              variant="neutral"
              onClick={onCancel}
              aria-label="cancel dialog"
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto"
              onClick={handleConfirm}
              variant={confirmVariant}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
