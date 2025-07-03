
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // The middleware is responsible for validating the locale.
  // We can assume that a valid locale is provided here.
  // Removing the `notFound()` call from this file prevents
  // a potential circular dependency during the build process.
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
