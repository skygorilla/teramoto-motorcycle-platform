
import {getRequestConfig, unstable_getRequestLocale} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // The middleware is responsible for validating the locale.
  // We can assume that a valid locale is provided here.
  const locale = await unstable_getRequestLocale();
  
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
