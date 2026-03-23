import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import {
  SignIn,
  SignUp,
  Home,
} from './components/pages'
import { useThemeInitializer } from './hooks'
import { ToastContainer, ToastNotificationProvider } from './components/Toast'
import type { ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) return <Navigate to="/sign-in" replace />
  return <>{children}</>
}

const App = () => {
  useThemeInitializer()
  return (
    <ToastNotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="sign-in" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </ToastNotificationProvider>
  )
}

export default App
