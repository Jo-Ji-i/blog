// components/buttons/Button.tsx
import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline';
}

export function Button({
    className,
    variant = 'default',
    ...props
}: ButtonProps) {
    const baseStyle =
        'rounded-lg px-5 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        outline:
            'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
    };

    return (
        <button
            className={cn(baseStyle, variants[variant], className)}
            {...props}
        />
    );
}
