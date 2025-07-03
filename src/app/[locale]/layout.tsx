
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { AppShell } from '@/components/layout/AppShell';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // The middleware is responsible for validating the locale.
  // We can assume that a valid locale is provided here.
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        <AppShell>{children}</AppShell>
    </NextIntlClientProvider>
  );
}
