import cx from 'classnames'
import { HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from 'react'

export function FieldContainer({
  children,
  className,
  ...props
}: LabelHTMLAttributes<HTMLElement>) {
  const classes = cx('mt-4 mb-6', className)
  return (
    <div className={classes}>
      <label {...props}>{children}</label>
    </div>
  )
}

export function FieldLabel({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLLabelElement>) {
  const classes = cx(className)
  return (
    <div>
      <span className={classes} {...props}>
        {children}
      </span>
    </div>
  )
}

export function TextInput({
  size = 'default',
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'default' | 'large'
}) {
  const sizeClasses = {
    default: 'p-1',
    large: 'p-2',
  }
  const classes = cx(
    sizeClasses[size],
    'mt-1 w-56 focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm border-gray-300 rounded-md border',
    className
  )
  return (
    <div>
      <input type="text" className={classes} {...props} />
    </div>
  )
}
