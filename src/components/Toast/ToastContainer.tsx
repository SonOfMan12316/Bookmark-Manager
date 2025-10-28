import { useNotification } from '../../hooks'
import { Cancel } from '../icons'

export const ToastContainer = () => {
  const {
    notificationsList,
    removeNotification,
    pauseNotification,
    resumeNotification,
    removingIds,
  } = useNotification()

  return (
    <div className="fixed right-0 top-18 lg:top-20 z-10 flex flex-col gap-2">
      {notificationsList.map((notification) => {
        return (
          <div
            key={notification.id}
            className={`toast-item w-[340px] h-10.5 cursor-pointer flex items-center justify-between bg-white dark:bg-ch-dark-mode-neutral-500 border-[1.45px] border-ch-light-mode-neutral-300 dark:border-ch-dark-mode-neutral-400 rounded-lg px-3
                      ${
                        removingIds.has(notification.id)
                          ? 'toast-exit'
                          : 'toast-enter'
                      }`}
            onMouseEnter={() => pauseNotification(notification.id)}
            onMouseLeave={() => resumeNotification(notification.id)}
          >
            <div className="flex items-center gap-2 text-ch-light-mode-neutral-900 dark:text-white">
              <span className="w-5 h-5 mt-0.5 text-ch-teal-700 dark:text-white">
                {notification.icon}
              </span>
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <div onClick={() => removeNotification(notification.id)}>
              <Cancel className="w-4 h-4 text-ch-light-mode-neutral-900 dark:text-white/60 cursor-pointer" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ToastContainer
