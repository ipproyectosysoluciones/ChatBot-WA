import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    description?: string
    footer?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, title, description, footer, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-surface border border-border rounded-xl p-6 shadow-md transition-shadow duration-300 hover:shadow-lg hover:-translate-y-1',
                    className
                )}
                {...props}
            >
                {title && <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>}
                {description && <p className="text-base text-muted-foreground mb-4 leading-relaxed">{description}</p>}
                {children}
                {footer && <div className="border-t border-border pt-4 mt-4">{footer}</div>}
            </div>
        )
    }
)

Card.displayName = 'Card'

export { Card }
export type { CardProps }
