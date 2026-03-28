/**
 * Form input bileşeni — label, hata mesajı ve ikon desteği ile.
 */
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:      string;
  error?:      string;
  hint?:       string;
  leftIcon?:   React.ReactNode;
  rightIcon?:  React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
            {props.required && (
              <span className="text-accent ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute inset-y-0 left-3 flex items-center text-neutral-400 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'w-full h-10 rounded-lg border bg-white text-sm text-neutral-800',
              'placeholder:text-neutral-400',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              error
                ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                : 'border-neutral-300 hover:border-neutral-400',
              leftIcon  ? 'pl-9' : 'pl-3',
              rightIcon ? 'pr-9' : 'pr-3',
              props.disabled && 'opacity-50 cursor-not-allowed bg-neutral-50',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute inset-y-0 right-3 flex items-center text-neutral-400 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
