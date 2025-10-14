import OnboardingLayout from '../layouts/onboarding-layout'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../ui'
import { useNavigate } from 'react-router-dom'

interface ForgotPasswordForm {
  email: string
}

const ForgotPassword = () => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
  } = useForm<ForgotPasswordForm>()

  return (
    <OnboardingLayout
      title="Forgot your password?"
      instruction="Enter your email address below and we’ll send you a link to reset your password."
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
            required
          />
          {errors.email && (
            <span role="alert" className="text-xs text-ch-danger">
              {errors.email?.message}
            </span>
          )}
        </div>
        <Button onClick={() => navigate('/reset-password')} className="mt-4.5">
          Send reset link
        </Button>
        <div className="mt-6 text-center">
          <p className="font-medium text-sm">
            <span
              onClick={() => navigate('/sign-in')}
              className="font-semibold text-ch-light-mode-neutral-900 cursor-pointer"
            >
              Back to login
            </span>
          </p>
        </div>
      </form>
    </OnboardingLayout>
  )
}

export default ForgotPassword
