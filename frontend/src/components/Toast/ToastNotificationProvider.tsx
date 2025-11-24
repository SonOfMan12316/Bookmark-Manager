import { useState, type ReactNode, useRef } from 'react'
import type { ToastNotification } from '../../types/global'
import { NotificationContext } from '../../hooks/useNotificationContext'

interface ToastNotificationProviderProp {
  children: ReactNode
}

interface NotificationTimer {
  timeoutId: number | null
  remainingTime: number
  startTime: number
}

const ToastNotificationProvider = ({
  children,
}: ToastNotificationProviderProp) => {
  const [notificationsList, setNotificationsList] = useState<
    ToastNotification[]
  >([])
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())
  const timersRef = useRef<Map<string, NotificationTimer>>(new Map())

  const addNotification = (notification: ToastNotification) => {
    if (timersRef.current.has(notification.id)) {
      return
    }

    setNotificationsList((prevNotifications) => {
      const notificationExists = prevNotifications.some(
        (n) => n.id === notification.id
      )
      if (notificationExists) {
        return prevNotifications
      }
      return [...prevNotifications, notification]
    })

    if (notification.duration) {
      const timeoutId = setTimeout(() => {
        removeNotification(notification.id)
      }, notification.duration)

      timersRef.current.set(notification.id, {
        timeoutId,
        remainingTime: notification.duration,
        startTime: Date.now(),
      })
    }
  }

  const removeNotification = (id: string) => {
    const timer = timersRef.current.get(id)
    if (timer?.timeoutId) {
      clearTimeout(timer.timeoutId)
    }
    timersRef.current.delete(id)

    setRemovingIds((prev) => new Set(prev).add(id))

    setTimeout(() => {
      setNotificationsList((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      )
      setRemovingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 300)
  }

  const pauseNotification = (id: string) => {
    const timer = timersRef.current.get(id)
    if (timer?.timeoutId) {
      clearTimeout(timer.timeoutId)
      const elapsed = Date.now() - timer.startTime
      const remaining = timer.remainingTime - elapsed

      timersRef.current.set(id, {
        timeoutId: null,
        remainingTime: remaining > 0 ? remaining : 0,
        startTime: timer.startTime,
      })
    }
  }

  const resumeNotification = (id: string) => {
    const timer = timersRef.current.get(id)
    if (timer && timer.timeoutId === null && timer.remainingTime > 0) {
      const timeoutId = setTimeout(() => {
        removeNotification(id)
      }, timer.remainingTime)

      timersRef.current.set(id, {
        timeoutId,
        remainingTime: timer.remainingTime,
        startTime: Date.now(),
      })
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notificationsList,
        addNotification,
        removeNotification,
        pauseNotification,
        resumeNotification,
        removingIds,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default ToastNotificationProvider
