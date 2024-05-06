import type { Metadata } from 'next';
import '@/styles/globals.css';
import { fonts } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'CaseCobra',
  description: 'E-Commerce Case Cobra',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts.inter}>{children}</body>
    </html>
  );
}
