import type { Metadata } from 'next';
import { Container }     from '@/components/ui/Container';
import { OrderQueryForm } from '@/components/order/OrderQueryForm';

export const metadata: Metadata = {
  title:       'Sipariş Sorgula',
  description: 'Sipariş numaranız veya e-posta adresinizle sipariş durumunuzu sorgulayın.',
};

export default function SiparisSorgulaPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <div className="bg-white border-b border-neutral-100 py-10 md:py-14">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-800 mb-3">
              Sipariş Sorgula
            </h1>
            <p className="text-neutral-500">
              Sipariş numaranızı veya e-posta adresinizi girerek sipariş durumunuzu öğrenin.
            </p>
          </div>
        </Container>
      </div>

      <Container className="pt-10 max-w-lg">
        <OrderQueryForm />
      </Container>
    </div>
  );
}
