import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Employee Dashboard with Facial Authentication',
  description:
    'A cutting-edge employee dashboard featuring facial recognition for secure authentication and efficient workplace management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-white p-4">
          <h1 className="text-2xl font-bold">Faceio - Dision Solutions</h1>
        </header>
        <Toaster />
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-100 text-center p-4 mt-8">
          <p>&copy; 2024 Faceio -Dision . All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
