import cx from 'classnames'
import { useField } from 'formik'
import { HTMLAttributes } from 'react'

export function FieldContainer({
  children,
  className,
}: HTMLAttributes<HTMLElement>) {
  const classes = cx('mt-4 mb-6', className)
  return <div className={classes}>{children}</div>
}

export interface ITextInputProps {
  size: 'default' | 'large'
  className?: string | undefined
  label: string
  name: string
  id?: string
  type: 'text' | 'password' | 'email'
}

export const TextInput = ({
  size = 'default',
  className,
  label,
  ...props
}: ITextInputProps) => {
  const [field, meta] = useField(props)

  {
    const sizeClasses = {
      default: 'p-1',
      large: 'p-2',
    }
    const classes = cx(
      sizeClasses[size],
      'mt-1 w-96 focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 border-b bg-gray-100 rounded-t',
      className
    )

    return (
      <>
        <div>
          <label htmlFor={props.id || props.name} className="text-gray-900 ">
            {label}
          </label>
        </div>
        <div>
          <input className={classes} {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="text-red-300 ">{meta.error}</div>
          ) : null}
        </div>
      </>
    )
  }
}
