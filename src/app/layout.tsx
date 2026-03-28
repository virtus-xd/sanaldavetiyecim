import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { SITE_META } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets:  ['latin'],
  display:  'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets:  ['latin'],
  display:  'swap',
  weight:   ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default:  SITE_META.title,
    template: `%s — ${SITE_META.name}`,
  },
  description: SITE_META.description,
  metadataBase: new URL(SITE_META.url),
  keywords: [
    'dijital davetiye',
    'online davetiye',
    'düğün davetiyesi',
    'nişan davetiyesi',
    'söz davetiyesi',
    'kına davetiyesi',
    'davetiye sitesi',
    'sanal davetiye',
  ],
  authors:  [{ name: SITE_META.name, url: SITE_META.url }],
  creator:  SITE_META.name,
  openGraph: {
    type:        'website',
    locale:      'tr_TR',
    url:         SITE_META.url,
    siteName:    SITE_META.name,
    title:       SITE_META.title,
    description: SITE_META.description,
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    SITE_META.name,
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       SITE_META.title,
    description: SITE_META.description,
    images:      ['/og-image.jpg'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
  alternates: {
    canonical: SITE_META.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
