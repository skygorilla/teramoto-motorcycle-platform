import {getRequestConfig, getLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
 
// Can be imported from a shared config
const locales = ['en', 'hr'];
 
export default getRequestConfig(async () => {
  // Obtain the current locale
  const locale = await getLocale();
 
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale: locale // Ensure the locale is returned
  };
});
