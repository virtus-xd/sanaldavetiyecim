/**
 * Sipariş formu adım göstergesi.
 */
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label:  string;
}

const STEPS: Step[] = [
  { number: 1, label: 'Organizasyon' },
  { number: 2, label: 'Tasarım'     },
  { number: 3, label: 'İletişim'    },
  { number: 4, label: 'Özet'        },
];

interface OrderStepperProps {
  currentStep: number;
}

export function OrderStepper({ currentStep }: OrderStepperProps) {
  return (
    <nav aria-label="Sipariş adımları" className="w-full">
      <ol className="flex items-center justify-between relative">
        {/* Bağlantı çizgisi */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200 -z-10" aria-hidden="true">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {STEPS.map((step) => {
          const isDone    = step.number < currentStep;
          const isActive  = step.number === currentStep;

          return (
            <li key={step.number} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 border-2',
                  isDone  && 'bg-primary border-primary text-white',
                  isActive && 'bg-white border-primary text-primary shadow-md shadow-primary/20',
                  !isDone && !isActive && 'bg-white border-neutral-200 text-neutral-400'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {isDone ? <Check size={16} aria-hidden="true" /> : step.number}
              </div>
              <span
                className={cn(
                  'text-xs font-medium hidden sm:block',
                  isActive ? 'text-primary' : isDone ? 'text-neutral-600' : 'text-neutral-400'
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
