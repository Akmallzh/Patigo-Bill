import React from 'react';
import { cn } from '../../utils/cn';

export function ProgressBar({ value, max = 100, className, colorClass = 'bg-blue-600', showValue = false }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {showValue && (
        <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
          <span>Progress</span>
          <span className={colorClass.replace('bg-', 'text-')}>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClass)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
