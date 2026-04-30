import { Globe, Lock, Music, Pause } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { THEME_REGISTRY } from '@/components/invitation-themes/themes.config';

const ENVELOPES = Object.values(THEME_REGISTRY).map((t) => t.envelope.desktop);

function Plate({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#e6dcc4] bg-blush-soft/80 shadow-sm shadow-black/[0.03]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CollectionIllustration() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        {ENVELOPES.slice(0, 4).map((src, i) => {
          const offsets = ['-rotate-[10deg] -translate-x-10', '-rotate-3 -translate-x-3', 'rotate-3 translate-x-3', 'rotate-[10deg] translate-x-10'];
          return (
            <div
              key={i}
              className={cn(
                'absolute aspect-[3/4] w-20 overflow-hidden rounded-md border border-[#e6dcc4] bg-white shadow-md shadow-black/[0.06]',
                offsets[i],
              )}
              style={{ zIndex: i }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DomainIllustration() {
  return (
    <div aria-hidden className="flex h-full w-full flex-col gap-3">
      {/* Browser bar */}
      <div className="flex items-center gap-2 rounded-lg border border-[#e6dcc4] bg-white px-3 py-2 shadow-sm shadow-black/[0.03]">
        <div className="flex gap-1">
          <span className="size-2 rounded-full bg-[#e6dcc4]" />
          <span className="size-2 rounded-full bg-[#e6dcc4]" />
          <span className="size-2 rounded-full bg-[#e6dcc4]" />
        </div>
        <div className="ml-1 flex flex-1 items-center gap-1.5 rounded-md bg-blush-soft px-2 py-1 text-[10px] font-medium tracking-tight">
          <Lock size={9} className="text-sage" aria-hidden />
          <span className="text-[#555555]">ayse-mehmet</span>
          <span className="text-[#999999]">.sanaldavetiyecim.com</span>
        </div>
      </div>
      {/* Card faux preview */}
      <div className="flex-1 rounded-lg border border-[#e6dcc4] bg-white p-3 shadow-sm shadow-black/[0.03]">
        <div className="flex items-center gap-1.5">
          <Globe size={10} className="text-brand" />
          <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-deep">Davetiye</span>
        </div>
        <div className="mt-2 font-display text-base italic text-black leading-tight">Ayşe &amp; Mehmet</div>
        <div className="mt-1 text-[10px] text-[#767676]">15 Ağustos 2026 · Cumartesi</div>
        <div className="mt-3 h-1.5 w-3/4 rounded-full bg-blush-deep/60" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-blush-deep/40" />
      </div>
    </div>
  );
}

function MusicIllustration() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      <div className="w-full rounded-xl border border-[#e6dcc4] bg-white p-3 shadow-sm shadow-black/[0.03]">
        <div className="flex items-center gap-3">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-blush via-blush-deep to-warm-tan">
            <Music className="absolute inset-0 m-auto size-5 text-brand-deep" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-black">A Thousand Years</div>
            <div className="truncate text-[10px] text-[#767676]">Christina Perri</div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-blush-soft">
              <div className="h-full w-2/5 rounded-full bg-brand" />
            </div>
          </div>
          <button
            type="button"
            disabled
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white shadow-md shadow-brand/30"
          >
            <Pause size={12} className="fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SealIllustration() {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/seal-nobg.png"
        alt=""
        className="h-full max-h-44 w-auto object-contain drop-shadow-md"
        loading="lazy"
      />
    </div>
  );
}

const features = [
  {
    title: 'Geniş Tasarım Koleksiyonu',
    description:
      'Klasik, modern, romantik ve butik temalar arasından organizasyonunuzun ruhuna uyan tasarımı seçin — her biri detayına kadar elden geçmiş.',
    illustration: <CollectionIllustration />,
    plateClass: 'p-6',
  },
  {
    title: 'Kişiye Özel Domain',
    description:
      'Çiftin isimleriyle özelleştirilmiş zarif bir bağlantı — adlariniz.sanaldavetiyecim.com — paylaşması ve hatırlaması kolay.',
    illustration: <DomainIllustration />,
    plateClass: 'p-5',
  },
  {
    title: 'Atmosferik Müzik',
    description:
      'Davetiyeyi açan misafirleri karşılayan, sizin seçtiğiniz özel bir parça ile o anın duygusunu daha açılışta yakalayın.',
    illustration: <MusicIllustration />,
    plateClass: 'p-6',
  },
  {
    title: 'Özel Mühür Tasarımı',
    description:
      'Çiftin baş harfleri veya monogramıyla hazırlanan zarf mühürü ile davetiyenize gerçek bir kağıt davetiye duygusu katın.',
    illustration: <SealIllustration />,
    plateClass: 'p-6',
  },
];

export function FeaturesSection() {
  return (
    <section className="border-y border-[#d9cfb8]" aria-label="Özellikler">
      <Container>
        <div className="py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-2 lg:px-0">
            {/* Başlık */}
            <div className="text-center mb-16 md:mb-20">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-deep mb-3">
                Davetiyelerinizde Ne Var?
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-[1.1] text-balance">
                Her detay, <span className="italic text-brand">özenle</span> hazırlanır
              </h2>
              <p className="mt-5 text-sm md:text-base text-[#555555] leading-relaxed">
                Dijital davetiyenizi sıradan bir bağlantıdan çıkartıp özel bir deneyime dönüştüren her şey.
              </p>
            </div>

            {/* Feature satırları */}
            <div className="space-y-12 md:space-y-14">
              {features.map((f) => (
                <div key={f.title} className="grid items-center gap-6 sm:grid-cols-5">
                  <Plate className={cn('aspect-[5/4] sm:col-span-2', f.plateClass)}>
                    {f.illustration}
                  </Plate>
                  <div className="max-w-md sm:col-span-3">
                    <h3 className="text-lg md:text-xl font-semibold text-black tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-balance text-sm md:text-base text-[#555555] leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
