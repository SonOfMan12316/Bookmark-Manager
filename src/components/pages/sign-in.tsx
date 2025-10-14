import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import OnboardingLayout from '../layouts/onboarding-layout'
import { Input, Button } from '../ui'

interface SignInForm {
  email: string
  password: string
}

const SignIn = () => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
  } = useForm<SignInForm>()

  return (
    <OnboardingLayout
      title="Log in to your account"
      instruction="Welcome back! Please enter your details."
    >
      <form className="pt-2">
        <div>
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
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password cannot be less than 8 characters',
              },
            })}
          />
          {errors.email && (
            <span role="alert" className="text-xs text-ch-danger">
              {errors.email?.message}
            </span>
          )}
        </div>
        <Button onClick={() => navigate('/home')} className="mt-4.5">
          Log in
        </Button>
        <div className="mt-4.5 sm:mt-6 text-center">
          <p className="font-medium text-sm text-ch-light-mode-neutral-800">
            Forgot password?{' '}
            <span
              onClick={() => navigate('/forgot-password')}
              className="font-semibold text-ch-light-mode-neutral-900 cursor-pointer"
            >
              Reset it
            </span>
          </p>
          <p className="font-medium text-sm text-ch-light-mode-neutral-800 mt-1 sm:mt-3.5">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/sign-up')}
              className="font-semibold text-ch-light-mode-neutral-900 cursor-pointer"
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
