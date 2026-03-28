'use client';

/**
 * Admin giriş sayfası — Supabase Auth e-posta + şifre.
 */
import { useState }       from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense }       from 'react';
import { useForm }        from 'react-hook-form';
import { zodResolver }    from '@hookform/resolvers/zod';
import { z }              from 'zod';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { createClient }  from '@/lib/supabase/client';
import { Input }         from '@/components/ui/Input';
import { Button }        from '@/components/ui/Button';

const loginSchema = z.object({
  email:    z.string().email('Geçerli e-posta giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});
type LoginValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [showPw,  setShowPw]  = useState(false);
  const [authErr, setAuthErr] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginValues) => {
    setAuthErr('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email:    data.email,
      password: data.password,
    });

    if (error) {
      setAuthErr('E-posta veya şifre hatalı.');
      return;
    }

    const redirectTo = searchParams.get('redirectTo') ?? '/admin';
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-4">
            <Lock size={22} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-800">Admin Paneli</h1>
          <p className="text-sm text-neutral-500 mt-1">Sanal Davetiyecim yönetim arayüzü</p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="E-posta"
              type="email"
              placeholder="admin@email.com"
              leftIcon={<Mail size={15} />}
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Şifre"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                leftIcon={<Lock size={15} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="text-neutral-400 hover:text-neutral-600 pointer-events-auto"
                    tabIndex={-1}
                    aria-label={showPw ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            {authErr && (
              <p className="text-sm text-red-500 text-center" role="alert">{authErr}</p>
            )}

            <Button type="submit" loading={isSubmitting} className="w-full mt-2">
              Giriş Yap
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
