import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container }  from '@/components/ui/Container';
import { OrderForm }  from '@/components/order/OrderForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const metadata: Metadata = {
  title:       'Sipariş Ver',
  description: 'Dijital davetiye siparişinizi verin. 4 adımda kolayca tamamlayın.',
};

export default function SiparisPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Başlık */}
      <div className="bg-white border-b border-neutral-100 py-10 md:py-14">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-3">
              Sipariş Ver
            </h1>
            <p className="text-neutral-500">
              Aşağıdaki formu doldurun, 24-48 saat içinde davetiyeniz hazır olsun.
            </p>
          </div>
        </Container>
      </div>

      <Container className="pt-10">
        <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
          <OrderForm />
        </Suspense>
      </Container>
    </div>
  );
}
