import OnboardingLayout from '../layouts/onboarding-layout'
import { useForm } from 'react-hook-form'
import { Button, Input, LoadingDots } from '../ui'
import { useNavigate } from 'react-router-dom'
import { useForgotPassword } from '../../hooks/api'
import { useNotification } from '../../hooks'
import type { ForgotPasswordDto } from '../../types/api'

interface ForgotPasswordForm {
  email: string
}

const ForgotPassword = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>()

const forgotPassword = useForgotPassword()
	const { addNotification } = useNotification()

  const onSubmit = (data: ForgotPasswordDto) => {
		forgotPassword.mutate(data, {
			onSuccess: (data) => {
				addNotification({
					id: 'forgot-password-success-id',
					message: data.message,
					duration: 2000,
				})
				navigate('/reset-password')
			},
			onError: (error) => {
				addNotification({
					id: 'forgot-password-error-id',
					message: error.message,
					duration: 2000,
				})
			}
		})
  }

  return (
    <OnboardingLayout
      title="Forgot your password?"
      instruction="Enter your email address below and we’ll send you a link to reset your password."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
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
        <Button type="submit" className="mt-4.5">
					{ forgotPassword.isPending ? <LoadingDots /> : 'Send reset link' }
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

export default ForgotPassword
