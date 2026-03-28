import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Star, Zap, Shield, ArrowRight } from 'lucide-react';
import { Container }    from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button }       from '@/components/ui/Button';

export const metadata: Metadata = {
  title:       'Hakkımızda',
  description: 'Sanal Davetiyecim hakkında bilgi alın. Düğün ve özel etkinlikler için şık dijital davetiyeler hazırlıyoruz.',
  openGraph: {
    title:       'Hakkımızda — Sanal Davetiyecim',
    description: 'Düğün ve özel etkinlikler için şık dijital davetiyeler hazırlıyoruz. Misyonumuz ve hikayemiz.',
  },
};

const values = [
  { icon: Heart,  title: 'Sevgi ile Tasarlıyoruz', description: 'Her davetiye, müşterimizin özel gününü yansıtacak şekilde özenle hazırlanır.' },
  { icon: Star,   title: 'Kaliteden Ödün Vermeyiz', description: 'Yüksek kaliteli tasarım ve teknik altyapı ile profesyonel hizmet sunuyoruz.' },
  { icon: Zap,    title: 'Hızlı Teslim',            description: '24-48 saat içinde davetiyeniz hazır. Özel gününüze yetişmek için çalışıyoruz.' },
  { icon: Shield, title: 'Güvenilir Hizmet',        description: '500\'den fazla mutlu çift ve %100 memnuniyet oranıyla hizmetinizdeyiz.' },
];

const stats = [
  { value: '500+', label: 'Mutlu Çift'    },
  { value: '3+',   label: 'Yıllık Deneyim' },
  { value: '%100', label: 'Memnuniyet'    },
  { value: '24s',  label: 'Ortalama Teslimat' },
];

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-cream py-14 md:py-20">
        <Container>
          <SectionTitle
            title="Hakkımızda"
            subtitle="Dijital davetiyelerde Türkiye'nin güvenilir adresi."
          />
        </Container>
      </div>

      <Container className="py-16">
        {/* Hikaye */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-2xl font-bold text-neutral-800 mb-5">
            Hikayemiz
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Sanal Davetiyecim, 2021 yılında düğün hazırlıklarının ne kadar yorucu olduğunu bizzat yaşayan bir çiftin hayaliyle kuruldu.
            Klasik kağıt davetiyelerin hem maliyetli hem de çevre dostu olmadığını fark ederek, modern ve şık bir alternatif sunmaya karar verdik.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Bugün 500&apos;den fazla çiftin özel gününde yanlarında olduk. Her davetiye, o çiftin hikayesini dijital dünyaya taşıyan özgün bir yapıt olarak hazırlanıyor.
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
              <div className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Değerlerimiz */}
        <SectionTitle title="Değerlerimiz" className="mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4 p-6 bg-white rounded-2xl border border-neutral-100 hover:border-primary/20 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <v.icon size={22} className="text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/tasarimlar" className="flex items-center gap-2">
              Tasarımları Keşfet <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
