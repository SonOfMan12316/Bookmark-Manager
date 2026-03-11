import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import OnboardingLayout from '../layouts/onboarding-layout'
import { Input, Button, LoadingDots } from '../ui'
import { useLogin } from '../../hooks/api'
import type { LoginDto } from '../../types/api'
import { useNotification } from '../../hooks'
import { Eye } from '../icons'
import { getErrorMessage } from '../../services/error.service'

interface SignInForm {
  email: string
  password: string
}

const SignIn = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>()

	const login = useLogin()
	const { addNotification } = useNotification()

  const onSubmit = (data: LoginDto) => {
		login.mutate(data, {
			onSuccess: () => {
				addNotification({
					id: 'login-success-id',
					message: 'Login successful.',
					duration: 2000,
				})
				navigate('/home')
			},
			onError: (error) => {
				const errorMessage = getErrorMessage(error)
				addNotification({
					id: 'login-error-id',
					message: errorMessage,
					duration: 3000,
				})
			}
		})
  }

  return (
    <OnboardingLayout
      title="Log in to your account"
      instruction="Welcome back! Please enter your details."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
        <div>
          <Input
            label="Email"
            variant="light"
            placeholder=""
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address format',
              },
            })}
          />
          {errors.email && (
            <span role="alert" className="text-xs text-ch-danger">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="mt-4">
          <Input
            label="Password"
            placeholder=""
            type="password"
            variant="light"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password cannot be less than 8 characters',
              },
            })}
						icon={<Eye/>}
						placement="end"
          />
          {errors.email && (
            <span role="alert" className="text-xs text-ch-danger">
              {errors.email?.message}
            </span>
          )}
        </div>
        <Button type="submit" className="mt-4.5">
					{ login.isPending ? <LoadingDots /> : 'Log in' }
        </Button>
        <div className="mt-4.5 sm:mt-6 text-center">
          <p className="font-medium text-sm text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
            Forgot password?{' '}
            <span
              onClick={() => navigate('/forgot-password')}
              className="font-semibold text-ch-light-mode-neutral-900 dark:text-white cursor-pointer"
            >
              Reset it
            </span>
          </p>
          <p className="font-medium text-sm text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100 mt-1 sm:mt-3.5">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/sign-up')}
              className="font-semibold text-ch-light-mode-neutral-900 dark:text-white cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </OnboardingLayout>
  )
}

export default SignIn
