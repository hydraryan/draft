// src/app/layout.tsx

import { Anton, Bebas_Neue } from 'next/font/google';
import './globals.css';

// Configure the fonts
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${bebasNeue.variable}`}>
      <body className="bg-main-bg text-white">{children}</body>
    </html>
  );
}