/**
 * Dropdown seçim bileşeni.
 */
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:       string;
  error?:       string;
  hint?:        string;
  options:      SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className, id, ...props }, ref) => {
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

        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            className={cn(
              'w-full h-10 rounded-lg border bg-white text-sm text-neutral-800',
              'pl-3 pr-9 appearance-none cursor-pointer',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              error
                ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                : 'border-neutral-300 hover:border-neutral-400',
              props.disabled && 'opacity-50 cursor-not-allowed bg-neutral-50',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            size={16}
            aria-hidden="true"
          />
        </div>

        {error && (
          <p className="text-xs text-red-500" role="alert">{error}</p>
        )}
        {!error && hint && (
          <p className="text-xs text-neutral-500">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
