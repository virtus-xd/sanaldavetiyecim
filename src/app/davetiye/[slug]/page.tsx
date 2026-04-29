import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInvitationByOrderNumber } from '@/lib/data/invitations';
import InvitationRenderer from '@/components/invitation-themes/InvitationRenderer';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getInvitationByOrderNumber(slug);

  if (!result) {
    return { title: 'Davetiye Bulunamadı' };
  }

  const { invitationData } = result;
  const title = `${invitationData.brideName} & ${invitationData.groomName} — ${invitationData.eventType}`;

  return {
    title,
    description: `${invitationData.dateDisplay} tarihinde ${invitationData.venue.name} — Dijital davetiye`,
    openGraph: {
      title,
      description: `${invitationData.brideName} & ${invitationData.groomName} sizi ${invitationData.eventType} etkinliğine davet ediyor!`,
      type: 'website',
    },
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getInvitationByOrderNumber(slug);

  if (!result) {
    notFound();
  }

  return <InvitationRenderer data={result.invitationData} theme={result.theme} />;
}
