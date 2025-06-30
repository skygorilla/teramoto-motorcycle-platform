
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // This function is called for each request that requires localized messages.
  // It receives the locale of the request and returns the messages for that locale.
 
  // You can also import and validate the locale here if needed.
  // For example, by checking if it's included in a list of supported locales.
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
