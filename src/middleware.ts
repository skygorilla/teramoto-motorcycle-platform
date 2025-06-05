import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
 
export default async function middleware(request: NextRequest) {
  // Add your public routes here
  const publicPages = ['/signin', '/signup'];
  const publicPathnameRegex = RegExp(
    `^(/(${['en', 'hr'].join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  const handleI18nRouting = createMiddleware({
    locales: ['en', 'hr'],
    defaultLocale: 'en',
    localePrefix: 'as-needed', // Only add /en or /hr prefix if not default
  });

  const response = handleI18nRouting(request);

  // Example: Add security headers
  // response.headers.set('x-custom-header', 'custom-value');

  return response;
}
 
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
