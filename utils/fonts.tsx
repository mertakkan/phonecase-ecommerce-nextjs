import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const fonts = {
  montserrat: montserrat.className,
  inter: inter.className,
};
