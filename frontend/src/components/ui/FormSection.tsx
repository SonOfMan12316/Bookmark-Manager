import type { ReactNode } from 'react'
import classnames from 'classnames'
import {
  type FieldErrors,
  type FieldValues,
  type UseFormRegister,
  type UseFormWatch,
  type Path,
} from 'react-hook-form'
import type { InputsInterface } from '../../types/global'
import type { InputVariant } from '../../types/ui'
import Textarea from './TextArea'
import Input from './Input'

interface FormSectionProps<T extends FieldValues> {
  fields: InputsInterface[]
  register?: UseFormRegister<T>
  watch?: UseFormWatch<T>
  errors?: FieldErrors<T>
  variant?: InputVariant
}

interface CharacterCountProp<T extends FieldValues> {
  name: Path<T>
  limit: number
  watch?: UseFormWatch<T>
  className?: string
}

const CharacterCount = <T extends FieldValues>({
  name,
  limit,
  watch,
  className,
}: CharacterCountProp<T>) => {
  const value = watch ? watch(name) || '' : ''
  const isLimitExceeded = value.length > limit

  return (
    <span
      className={classnames(
        className,
        'text-xs font-medium',
        isLimitExceeded
          ? 'text-ch-red-600 dark:text-ch-red-800'
          : 'text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100'
      )}
    >
      {value.length} / {limit}
    </span>
  )
}

const FormSection = <T extends FieldValues>({
  fields,
  register,
  watch,
  errors,
  variant,
}: FormSectionProps<T>) => {
  const renderFields = (
    field: InputsInterface,
    hasError?: boolean,
    fieldError?: unknown
  ): ReactNode => {
    const { name, onHook, label, variant: fieldVariant, ...rest } = field
    const inputRegisterProps = register ? register(name, onHook) : {}
    const errorId = `${String(name)}-error`

    const inputLabel = (
      <span className="text-black dark:text-white text-sm font-semibold flex items-center">
        {label}
      </span>
    )

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...rest}
            {...inputRegisterProps}
            label={inputLabel}
            variant={fieldVariant ?? variant}
            maxLength={170}
            hasError={hasError}
            aria-invalid={Boolean(fieldError)}
            aria-describedby={fieldError ? errorId : undefined}
          />
        )

      default:
        return (
          <Input
            {...rest}
            {...inputRegisterProps}
            label={inputLabel}
            variant={fieldVariant ?? variant}
            hasError={hasError}
            aria-invalid={Boolean(fieldError)}
            aria-describedby={fieldError ? errorId : undefined}
          />
        )
    }
  }

  const descriptionLengthAllowed = 170

  return (
    <div className="w-full">
      {fields?.map((field: InputsInterface) => {
        const fieldError = errors?.[field.name as keyof T]
        const errorId = `${String(field.name)}-error`

        return (
          <div key={field.name} className="w-full pb-5">
            {renderFields(field, Boolean(fieldError), fieldError)}
            <div className="flex flex-row justify-between items-center">
              {fieldError ? (
                <span
                  id={errorId}
                  role="alert"
                  className="font-medium text-xs text-ch-light-mode-neutral-800 dark:text-ch-dark-mode-neutral-100"
                >
                  {typeof fieldError?.message === 'string'
                    ? fieldError.message
                    : ''}
                </span>
              ) : (
                <span className="" />
              )}
              {field.type === 'textarea' && (
                <CharacterCount
                  name={field.name}
                  limit={descriptionLengthAllowed}
                  watch={watch}
                  className="text-right"
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FormSection
