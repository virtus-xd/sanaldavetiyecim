/**
 * Çok satırlı metin girişi bileşeni.
 */
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?:  string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
            {label}
            {props.required && (
              <span className="text-accent ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          rows={props.rows ?? 4}
          className={cn(
            'w-full rounded-lg border bg-white text-sm text-neutral-800',
            'placeholder:text-neutral-400 resize-y px-3 py-2.5',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            error
              ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
              : 'border-neutral-300 hover:border-neutral-400',
            props.disabled && 'opacity-50 cursor-not-allowed bg-neutral-50',
            className
          )}
          {...props}
        />

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

Textarea.displayName = 'Textarea';
