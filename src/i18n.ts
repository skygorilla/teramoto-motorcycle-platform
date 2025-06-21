
import {getRequestConfig, requestLocale} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Obtain the current locale
  const locale = await requestLocale();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
