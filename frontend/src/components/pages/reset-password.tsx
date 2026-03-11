import OnboardingLayout from '../layouts/onboarding-layout'
import { useForm } from 'react-hook-form'
import { Button, Input, LoadingDots } from '../ui'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { passwordPattern } from '../../utils/validators'
import { useRef } from 'react'
import { useResetPassword } from '../../hooks/api'
import { useNotification } from '../../hooks/useNotificationContext'
import type { ResetPasswordDto } from '../../types/api'

interface ResetPasswordForm {
  password: string
  confirmPassword: string
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>()
  const password = useRef<unknown>({})
  password.current = watch('password', '')

	const resetPassword = useResetPassword()
	const { addNotification } = useNotification()

  const onSubmit = (data: ResetPasswordForm) => {
    const token = searchParams.get('token')
    
    if (!token) {
      addNotification({
        id: 'reset-password-error-id',
        message: 'Reset token is missing. Please use the link from your email.',
        duration: 3000,
      })
      return
    }

    const resetPasswordData: ResetPasswordDto = {
      token,
      newPassword: data.password,
    }

    resetPassword.mutate(resetPasswordData, {
      onSuccess: () => {
				addNotification({	
					id: 'reset-password-success-id',
					message: 'Password reset successful.',
					duration: 2000,
				})
				navigate('/sign-in')
      },
      onError: (error) => {
        addNotification({
          id: 'reset-password-error-id',
          message: error.message,
          duration: 2000,
				})
			}
		})
  }

  return (
    <OnboardingLayout
      title="Reset Your Password"
      instruction="Enter your new password below. Make sure it’s strong and secure."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
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
            type="password"
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
        <Button type="submit" className="mt-4.5">
          {resetPassword.isPending ? <LoadingDots /> : 'Reset Password'}
        </Button>
        <div className="mt-6 text-center">
          <p className="font-medium text-sm">
            <span
              onClick={() => navigate('/sign-in')}
              className="font-semibold text-ch-light-mode-neutral-900 dark:text-white cursor-pointer"
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
