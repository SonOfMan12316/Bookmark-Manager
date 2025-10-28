import { createContext, useContext } from 'react'
import type { ToastNotification } from '../types/global'

interface NotificationContextProps {
  notificationsList: ToastNotification[]
  addNotification: (notification: ToastNotification) => void
  removeNotification: (id: string) => void
  pauseNotification: (id: string) => void
  resumeNotification: (id: string) => void
  removingIds: Set<string>
}

export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined)

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}

export default useNotification
