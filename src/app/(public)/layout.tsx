import { Header }         from '@/components/layout/Header';
import { Footer }         from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

/** Public sayfalar için layout — Header, Footer ve WhatsApp butonu içerir */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
