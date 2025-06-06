import type { Metadata } from 'next';
// Removed NextIntlClientProvider and getMessages from root layout
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'TERAMOTO',
  description: 'Motorcycle services, marketplace, and AI gear assistance.',
};

export default function RootLayout({ // Made synchronous, removed getMessages
  children,
  params: { locale } 
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Messages are now fetched and provided in src/app/[locale]/layout.tsx

  return (
    <html lang={locale || 'en'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        {/* NextIntlClientProvider removed from here */}
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
