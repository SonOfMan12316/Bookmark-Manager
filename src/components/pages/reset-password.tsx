import OnboardingLayout from '../layouts/onboarding-layout'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../ui'
import { useNavigate } from 'react-router-dom'
import { passwordPattern } from '../../utils/validators'
import { useRef } from 'react'

interface ResetPasswordForm {
  password: string
  confirmPassword: string
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>()
  const password = useRef<unknown>({})
  password.current = watch('password', '')

  return (
    <OnboardingLayout
      title="Reset Your Password"
      instruction="Enter your new password below. Make sure it’s strong and secure."
    >
      <form className="pt-2">
        <div>
          <Input
            label="New Password"
            placeholder=""
            type="password"
            {...register('password', {
              required: 'New Password is required',
              minLength: {
                value: 8,
                message: 'Password cannot be less than 8 characters',
              },
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
        <div className="mt-4">
          <Input
            label="Confirm Password"
            placeholder=""
            type="email"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value: unknown) =>
                value === password.current || 'Passwords do not match',
            })}
            required
          />
          {errors.confirmPassword && (
            <span role="alert" className="text-xs text-ch-danger">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
        <Button onClick={() => navigate('/home')} className="mt-4.5">
          Reset Password
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

export default ResetPassword
