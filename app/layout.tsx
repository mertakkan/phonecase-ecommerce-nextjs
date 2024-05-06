import type { Metadata } from 'next';
import '@/styles/globals.css';
import { fonts } from '@/utils/fonts';
import Navbar from '@/components/navbar';

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
      <body className={fonts.inter}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
