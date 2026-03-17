import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import OnboardingLayout from '../layouts/onboarding-layout'
import { Button, Input, LoadingDots } from '../ui'
import { GoogleSignInButton } from '../global'
import { passwordPattern } from '../../utils/validators'
import { useSignup } from '../../hooks/api'
import { useNotification } from '../../hooks'
import { useAuthStore } from '../../store/auth.store'
import type { SignupDto } from '../../types/api'

interface SignUpForm {
  fullName: string
  email: string
  password: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>()

  const signup = useSignup()
  const { addNotification } = useNotification()
  const { setAuth } = useAuthStore()

  const onSubmit = (data: SignupDto) => {
    signup.mutate(data, {
      onSuccess: (response) => {
        if (response?.user && response?.tokens) {
          setAuth(response.user, response.tokens)
          addNotification({ id: 'signup-success-id', message: 'Signup successful.', duration: 2000 })
          navigate('/home')
        } else {
          addNotification({ id: 'signup-error-id', message: 'Signup failed: Invalid response from server', duration: 3000 })
        }
      },
      onError: (error: any) => {
        const errorMessage = error?.message || error?.response?.data?.message || 'Signup failed. Please try again.'
        addNotification({ id: 'signup-error-id', message: errorMessage, duration: 3000 })
      },
    })
  }

  return (
    <OnboardingLayout
      title="Create your acccount"
      instruction="Join us and start saving your favorite links — organized, searchable, and always within reach."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="sm:pt-2">
        <div>
          <Input
            label="Full Name"
            placeholder=""
            type="text"
            {...register('fullName', { required: 'Full Name is required' })}
            required
          />
          {errors.fullName && (
            <span role="alert" className="text-xs text-ch-danger">
              {errors.fullName?.message}
            </span>
          )}
        </div>

        <div className="flex gap-4 mt-1 lg:mt-4 w-full">
          <div className="">
            <Input
              label="Email"
              placeholder=""
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address format',
                },
              })}
              required
            />
            {errors.email && (
              <span role="alert" className="font-medium text-xs text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
                {errors.email?.message}
              </span>
            )}
          </div>

          <div className="">
            <Input
              label="Password"
              placeholder=""
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password cannot be less than 8 characters' },
                pattern: passwordPattern(),
              })}
              required
            />
            {errors.password && (
              <span role="alert" className="text-xs text-ch-danger">
                {errors.password?.message}
              </span>
            )}
          </div>
        </div>

        <Button type="submit" className="mt-4.5">
          {signup.isPending ? <LoadingDots /> : 'Create Account'}
        </Button>

        <div className="mt-4.5 flex items-center gap-2">
          <div className="flex-1 h-px bg-ch-light-mode-neutral-300 dark:bg-ch-dark-mode-neutral-500" />
          <span className="text-xs font-medium text-ch-light-mode-neutral-600 dark:text-ch-dark-mode-neutral-400">OR</span>
          <div className="flex-1 h-px bg-ch-light-mode-neutral-300 dark:bg-ch-dark-mode-neutral-500" />
        </div>

        <div className="mt-4.5">
          <GoogleSignInButton label="Sign up with Google" />
        </div>

        <div className="mt-4.5 sm:mt-6 text-center">
          <p className="font-medium text-sm text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/sign-in')}
              className="font-semibold text-ch-light-mode-neutral-900 dark:text-white cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </form>
    </OnboardingLayout>
  )
}

export default SignUp
