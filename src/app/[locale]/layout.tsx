import type { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import {notFound} from 'next/navigation';
import {unstable_setRequestLocale} from 'next-intl/server';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

// Make sure to configure `i18n.ts` and `middleware.ts`
// according to the Next.js App Router internationalization docs.
// https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components

// Can be configured to serve different locales from different domains.
// If you want to serve all locales from the same domain, configure
// the `localePrefix` option in `src/navigation.ts` to be `always`.
// export const dynamic = 'force-static';


export default function LocaleLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  // Using internationalization in Server Components
  // const t = useTranslations('LocaleLayout');
  // console.log(t('title'));
  const localesList = ['en', 'hr']; // Renamed to avoid conflict with locale from params
  if (!localesList.includes(locale)) notFound();

  const messages = useMessages();


  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
        <AppShell>{children}</AppShell>
    </NextIntlClientProvider>
  );
}
