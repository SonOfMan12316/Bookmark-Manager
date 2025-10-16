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
  Home,
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
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
