import type { Metadata } from 'next';
import { Container }    from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SSSContent }   from './SSSContent';

export const metadata: Metadata = {
  title:       'Sıkça Sorulan Sorular',
  description: 'Dijital davetiye hakkında merak ettikleriniz: teslimat süresi, fiyatlar, revizyon hakkı ve teknik detaylar.',
  openGraph: {
    title:       'Sıkça Sorulan Sorular — Sanal Davetiyecim',
    description: 'Dijital davetiye sipariş sürecinde merak ettiklerinize cevap bulun.',
  },
};

const faqs = [
  {
    category: 'Süreç',
    items: [
      {
        q: 'Sipariş verdikten sonra ne kadar sürede teslim alırım?',
        a: 'Siparişiniz alındıktan sonra 24-48 saat içinde davetiye siteniz hazırlanır ve e-posta adresinize iletilir. Yoğun dönemlerde bu süre biraz uzayabilir, ancak sizi önceden bilgilendiririz.',
      },
      {
        q: 'Davetiyemi nasıl alacağım?',
        a: 'Davetiyeniz hazırlandıktan sonra size özel bir link e-posta adresinize gönderilir. Bu linki misafirlerinizle WhatsApp, SMS veya sosyal medya üzerinden paylaşabilirsiniz.',
      },
      {
        q: 'Revizyon talep edebilir miyim?',
        a: 'Evet, her siparişte 1 ücretsiz revizyon hakkınız bulunmaktadır. Davetiye teslimatından sonra değiştirmek istediğiniz detayları belirtmeniz yeterlidir.',
      },
    ],
  },
  {
    category: 'Fiyatlandırma',
    items: [
      {
        q: 'Fiyatlar neden farklılık gösteriyor?',
        a: 'Fiyatlar tasarımın karmaşıklığına, animasyon içeriğine ve ek özelliklere göre değişmektedir. Her tasarımın detay sayfasında fiyatı açıkça belirtilmiştir.',
      },
      {
        q: 'Ödemeyi nasıl yapabilirim?',
        a: 'Sipariş formunu doldurduktan sonra ekibimiz sizinle iletişime geçerek ödeme detaylarını paylaşır. Banka havalesi veya EFT ile ödeme kabul edilmektedir.',
      },
      {
        q: 'İptal etmek istesem ücret iadesi yapılır mı?',
        a: 'Davetiye hazırlanmaya başlamadan önce iptal etmeniz durumunda ödemenizin tamamı iade edilir. Hazırlık başladıktan sonraki iptallerde kısmi iade yapılabilir.',
      },
    ],
  },
  {
    category: 'Teslimat',
    items: [
      {
        q: 'Davetiye linki ne kadar süre aktif kalır?',
        a: 'Davetiye linki organizasyon tarihinden 30 gün sonrasına kadar aktif kalır. Daha uzun süre ihtiyaç duyarsanız bize bildirin.',
      },
      {
        q: 'Kaç misafir aynı anda davetiyeyi görüntüleyebilir?',
        a: 'Sınırsız sayıda misafir davetiyeyi aynı anda görüntüleyebilir. Herhangi bir kullanıcı sınırı yoktur.',
      },
    ],
  },
  {
    category: 'Teknik',
    items: [
      {
        q: 'Davetiye tüm cihazlarda düzgün görünür mü?',
        a: 'Evet. Tüm davetiyeler mobil öncelikli olarak tasarlanır ve telefon, tablet, bilgisayar gibi tüm cihazlarda kusursuz görüntülenir.',
      },
      {
        q: 'Davetiyeye tıklamak için uygulama indirmek gerekiyor mu?',
        a: 'Hayır. Davetiye linki standart bir web tarayıcısında açılır. Herhangi bir uygulama indirmek gerekmez.',
      },
      {
        q: 'Davetiyeye müzik eklenebilir mi?',
        a: 'Evet, bazı tasarımlarımızda arka plan müziği seçeneği mevcuttur. Sipariş notlarınıza müzik tercihlerinizi belirtebilirsiniz.',
      },
    ],
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: faqs.flatMap((section) =>
    section.items.map((item) => ({
      '@type':          'Question',
      name:             item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    item.a,
      },
    }))
  ),
};

export default function SSSPage() {
  return (
    <div className="min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-cream py-14 md:py-20">
        <Container>
          <SectionTitle
            title="Sıkça Sorulan Sorular"
            subtitle="Aklınızdaki soruların cevaplarını burada bulabilirsiniz."
          />
        </Container>
      </div>

      <Container className="py-16 max-w-3xl">
        <SSSContent faqs={faqs} />
      </Container>
    </div>
  );
}
