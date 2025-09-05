import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/features/Header';
import clsx from 'clsx';
import AuthProvider from '@/features/AuthProvider/AuthProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Weatherly — Your Daily Weather Companion',
  description: 'Stay prepared with Weatherly. Accurate hourly and daily forecasts in a clean, simple interface.',
  icons: [
    { url: '/favicon.svg', type: 'image/svg+xml' },
    { url: '/favicon.ico', type: 'image/x-icon' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(geistSans.variable, geistMono.variable)}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
