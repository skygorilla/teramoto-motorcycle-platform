import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
 
export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales: ['en', 'hr'],
    defaultLocale: 'hr',
    localePrefix: 'as-needed', 
  });

  const response = handleI18nRouting(request);

  return response;
}
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`, `logo.png`)
  matcher: ['/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)']
};