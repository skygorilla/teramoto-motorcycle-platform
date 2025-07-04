
import {getRequestConfig} from 'next-intl/server';
import {getRequestLocale} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // The middleware is responsible for validating the locale.
  // We can assume that a valid locale is provided here.
  const locale = await getRequestLocale();
  
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
