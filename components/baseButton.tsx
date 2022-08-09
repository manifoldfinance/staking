import { ButtonHTMLAttributes, FC } from 'react'

import classNames  from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

type ButtonVariant = 'outline'

export const Button: FC<ButtonProps> = ({ className, variant, ...props }) => (
  <button
    {...props}
    className={classNames(
      variant === 'outline' ? '' : '',
      'border-font-light dark:border-font-dark border-x border-y px-5 py-1 rounded transition-colors',
      className
    )}
  />
)