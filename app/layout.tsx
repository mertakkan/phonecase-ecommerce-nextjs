import type { Metadata } from 'next';
import '@/styles/globals.css';
import { fonts } from '@/utils/fonts';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/providers';
import { constructMetadata } from '@/lib/utils';

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
      <body className={fonts.recursive}>
        <Navbar />

        <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div></div>
          {children}
        </main>
      </body>
    </html>
  );
}
