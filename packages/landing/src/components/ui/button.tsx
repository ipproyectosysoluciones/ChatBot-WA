import * as React from 'react'

import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'default' | 'lg'

interface ButtonBaseProps {
    variant?: ButtonVariant
    size?: ButtonSize
    className?: string
}

type ButtonAsButton = ButtonBaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
        as?: 'button'
        href?: never
    }

type ButtonAsAnchor = ButtonBaseProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
        as: 'a'
        href: string
    }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variantStyles: Record<ButtonVariant, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
    secondary: 'bg-surface text-foreground hover:bg-surface-muted border border-border shadow-sm',
    outline: 'border border-border bg-transparent hover:bg-surface text-foreground',
    ghost: 'bg-transparent hover:bg-surface text-foreground',
    destructive: 'bg-danger text-white hover:bg-danger/90 shadow-sm',
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm rounded-md',
    default: 'h-10 px-4 text-base rounded-md',
    lg: 'h-12 px-6 text-lg rounded-md',
}

const baseClass =
    'inline-flex items-center justify-center font-medium transition-colors duration-150 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
    'disabled:pointer-events-none disabled:opacity-50'

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
    const { className, variant = 'default', size = 'default', ...rest } = props

    const classes = cn(baseClass, variantStyles[variant], sizeStyles[size], className)

    if ('href' in props && props.as === 'a') {
        const { as: _as, href, ...anchorRest } = rest as ButtonAsAnchor
        return (
            <a
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                className={classes}
                target={anchorRest.target}
                rel={anchorRest.rel}
                {...anchorRest}
            />
        )
    }

    const { disabled, ...btnRest } = rest as ButtonAsButton
    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            disabled={disabled}
            aria-disabled={disabled ? 'true' : undefined}
            className={classes}
            {...btnRest}
        />
    )
})

Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
