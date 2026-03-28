'use client';

import { useState, Suspense }        from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm }                    from 'react-hook-form';
import { zodResolver }                from '@hookform/resolvers/zod';
import { z }                          from 'zod';
import { Eye, EyeOff }               from 'lucide-react';
import { createClient }              from '@/lib/supabase/client';

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
    if (error) { setAuthErr('E-posta veya şifre hatalı.'); return; }
    const redirectTo = searchParams.get('redirectTo') ?? '/admin';
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#090A0E' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at 50% 40%, rgba(184,134,11,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[380px]">

        {/* Logo mark */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-12 h-12 flex items-center justify-center mb-5"
            style={{
              background: 'linear-gradient(135deg, #B8860B 0%, #D4A017 100%)',
              borderRadius: '10px',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 40px rgba(184,134,11,0.3)',
            }}
          >
            <span
              className="text-white font-bold text-sm"
              style={{ fontFamily: 'Georgia, serif', transform: 'rotate(-45deg)' }}
            >
              SD
            </span>
          </div>
          <h1
            className="text-[22px] font-semibold text-center"
            style={{ color: '#E8EAF0', fontFamily: 'Georgia, serif', letterSpacing: '-0.4px' }}
          >
            Sanal Davetiyecim
          </h1>
          <p
            className="text-[12px] mt-1.5 tracking-widest uppercase"
            style={{ color: '#696C7B' }}
          >
            Yönetim Paneli
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: '#13151B',
            border: '1px solid #1D2029',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[12px] font-medium"
                style={{ color: '#9B9EAB' }}
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@ornek.com"
                autoComplete="email"
                {...register('email')}
                className="w-full rounded-lg px-3.5 py-2.5 text-[13.5px] outline-none transition-all"
                style={{
                  background: '#0D0F14',
                  border: errors.email ? '1px solid rgba(248,113,113,0.5)' : '1px solid #252830',
                  color: '#E8EAF0',
                }}
                onFocus={(e) => { if (!errors.email) e.target.style.borderColor = 'rgba(184,134,11,0.5)'; }}
                onBlur={(e) => { if (!errors.email) e.target.style.borderColor = '#252830'; }}
              />
              {errors.email && (
                <p className="text-[11px]" style={{ color: '#F87171' }}>{errors.email.message}</p>
              )}
            </div>

            {/* Şifre */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[12px] font-medium"
                style={{ color: '#9B9EAB' }}
              >
                Şifre
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register('password')}
                  className="w-full rounded-lg px-3.5 py-2.5 pr-10 text-[13.5px] outline-none transition-all"
                  style={{
                    background: '#0D0F14',
                    border: errors.password ? '1px solid rgba(248,113,113,0.5)' : '1px solid #252830',
                    color: '#E8EAF0',
                  }}
                  onFocus={(e) => { if (!errors.password) e.target.style.borderColor = 'rgba(184,134,11,0.5)'; }}
                  onBlur={(e) => { if (!errors.password) e.target.style.borderColor = '#252830'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#696C7B' }}
                  tabIndex={-1}
                  aria-label={showPw ? 'Şifreyi gizle' : 'Şifreyi göster'}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px]" style={{ color: '#F87171' }}>{errors.password.message}</p>
              )}
            </div>

            {/* Auth error */}
            {authErr && (
              <div
                className="rounded-lg px-3.5 py-2.5 text-[12px]"
                style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#F87171' }}
                role="alert"
              >
                {authErr}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg py-2.5 text-[13.5px] font-semibold mt-1 transition-all disabled:opacity-60"
              style={{
                background: isSubmitting
                  ? 'rgba(184,134,11,0.6)'
                  : 'linear-gradient(135deg, #B8860B 0%, #D4A017 100%)',
                color: '#fff',
                boxShadow: isSubmitting ? 'none' : '0 0 20px rgba(184,134,11,0.25)',
              }}
            >
              {isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>

          </form>
        </div>

        <p className="text-center text-[11px] mt-6" style={{ color: '#3D4050' }}>
          Sanal Davetiyecim © {new Date().getFullYear()}
        </p>
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
