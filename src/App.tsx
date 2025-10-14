import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import {
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
} from './components/pages'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="sign-in" />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App
