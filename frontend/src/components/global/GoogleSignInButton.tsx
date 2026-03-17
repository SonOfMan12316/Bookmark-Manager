import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useGoogleAuth } from '../../hooks/api'
import { useNotification } from '../../hooks'
import { getErrorMessage } from '../../services/error.service'
import { LoadingDots } from '../ui'
import Google from '../icons/google'

interface GoogleSignInButtonProps {
  label?: string
}

const GoogleSignInButton = ({ label = 'Sign in with Google' }: GoogleSignInButtonProps) => {
  const navigate = useNavigate()
  const googleAuth = useGoogleAuth()
  const { addNotification } = useNotification()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => {
      googleAuth.mutate({ code: codeResponse.code }, {
        onSuccess: () => {
          addNotification({ id: 'google-auth-success', message: 'Signed in with Google successfully.', duration: 2000 })
          navigate('/home')
        },
        onError: (error) => {
          addNotification({ id: 'google-auth-error', message: getErrorMessage(error), duration: 3000 })
        },
      })
    },
    onError: (error) => {
      addNotification({
        id: 'google-auth-error',
        message: error.error_description || 'Google Sign-In failed. Please try again.',
        duration: 3000,
      })
    },
  })

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={googleAuth.isPending}
      className="w-full flex items-center justify-center gap-3 py-2.5 px-3 rounded-lg border-[1.45px] border-ch-light-mode-neutral-400 dark:border-ch-dark-mode-neutral-500 bg-white dark:bg-ch-dark-mode-neutral-800 hover:bg-ch-light-mode-neutral-100 dark:hover:bg-ch-dark-mode-neutral-600 text-ch-dark-mode-neutral-900 dark:text-white font-semibold text-sm transition-all ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {googleAuth.isPending ? (
        <LoadingDots />
      ) : (
        <>
          <Google />
          {label}
        </>
      )}
    </button>
  )
}

export default GoogleSignInButton
