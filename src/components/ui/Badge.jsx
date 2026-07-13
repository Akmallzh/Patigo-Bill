import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-slate-100 text-slate-800',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-red-700',
    info: 'bg-blue-50 text-blue-700'
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", 
        variant === 'success' ? 'bg-green-500' :
        variant === 'warning' ? 'bg-amber-500' :
        variant === 'danger' ? 'bg-red-500' :
        variant === 'info' ? 'bg-blue-500' : 'bg-slate-500'
      )}></span>
      {children}
    </span>
  );
}
