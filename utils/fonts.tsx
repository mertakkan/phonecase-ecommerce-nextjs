import { Inter, Montserrat, Recursive } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const recursive = Recursive({ subsets: ['latin'] });

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const fonts = {
  montserrat: montserrat.className,
  inter: inter.className,
  recursive: recursive.className,
};
