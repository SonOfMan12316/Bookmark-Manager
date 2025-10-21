import { useEffect } from 'react'
import useUIStore from '../store/ui'

const useThemeInitializer = () => {
  const { theme } = useUIStore()

  useEffect(() => {
    const htmlElement = document.documentElement

    if (theme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [theme])
}

export default useThemeInitializer
