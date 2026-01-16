import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    title: string;
    description: string;
    action?: React.ReactNode;
    imageSrc?: string;
    className?: string;
}

export default function EmptyState({
    title,
    description,
    action,
    imageSrc = '/empty.png',
    className
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl border border-dashed border-gray-200 min-h-100", className)}>
            
            <div className="mb-6 relative w-48 h-48 flex items-center justify-center">
                <img 
                    src={imageSrc} 
                    alt="Empty State" 
                    className="object-contain w-full h-full"
                />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
                {title}
            </h3>

            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                {description}
            </p>

            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
}