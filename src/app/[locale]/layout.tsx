
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { AppShell } from '@/components/layout/AppShell';
import {notFound} from 'next/navigation';
import { locales } from '@/navigation'; // Using locales from navigation.ts for consistency


type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  // Using `locales` array from navigation.ts (imported as `allLocales` to avoid name clash if any)
  if (!locales.includes(locale as any)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        <AppShell>{children}</AppShell>
    </NextIntlClientProvider>
  );
}
