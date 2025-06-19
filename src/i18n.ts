
import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
 
// Can be imported from a shared config
const allLocales = ['en', 'hr'];
 
export default getRequestConfig(async ({locale}) => { // Changed to use locale parameter
  // Validate that the incoming `locale` parameter is valid
  // const locale = await requestLocale(); // Removed problematic import and usage

  if (!allLocales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale: locale 
  };
});

