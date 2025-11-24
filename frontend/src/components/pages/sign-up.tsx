import OnboardingLayout from '../layouts/onboarding-layout'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../ui'
import { useNavigate } from 'react-router-dom'
import { passwordPattern } from '../../utils/validators'

interface SignUpForm {
  fullName: string
  email: string
  password: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
  } = useForm<SignUpForm>()

  return (
    <OnboardingLayout
      title="Create your acccount"
      instruction="Join us and start saving your favorite links — organized, searchable, and always within reach."
    >
      {' '}
      <form className="sm:pt-2">
        <div>
          <Input
            label="Full Name"
            placeholder=""
            type="text"
            {...register('fullName', {
              required: 'Full Name is required',
            })}
            required
          />
          {errors.email && (
            <span role="alert" className="text-xs text-ch-danger">
              {errors.fullName?.message}
            </span>
          )}
        </div>
        <div className="mt-4">
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
              pattern: passwordPattern(),
            })}
            required
          />
          {errors.email && (
            <span role="alert" className="text-xs text-ch-danger">
              {errors.email?.message}
            </span>
          )}
        </div>
        <Button className="mt-4.5">Create Account</Button>
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
