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
  const renderFields = (field: InputsInterface): ReactNode => {
    const { name, onHook, label, variant: fieldVariant, ...rest } = field
    const inputRegisterProps = register ? register(name, onHook) : {}

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
            maxLength={280}
          />
        )

      default:
        return (
          <Input
            {...rest}
            {...inputRegisterProps}
            label={inputLabel}
            variant={fieldVariant ?? variant}
          />
        )
    }
  }

  const descriptionLengthAllowed = 280

  return (
    <div className="w-full">
      {fields?.map((field: InputsInterface) => {
        const fieldError = errors?.[field.name as keyof T]

        return (
          <div key={field.name} className="w-full pb-5">
            {renderFields(field)}
            <div className="flex flex-row justify-between items-center">
              {fieldError ? (
                <span
                  role="alert"
                  className="font-medium text-xs text-ch-red-600 dark:text-ch-red-800"
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
