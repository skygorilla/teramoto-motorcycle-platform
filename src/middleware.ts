import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'hr'],
  defaultLocale: 'hr',
  localePrefix: 'as-needed',
});
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`, `logo.png`)
  matcher: ['/((?!api|_next/static|_next/image|_vercel|delete-data|.*\\..*).*)']
};
