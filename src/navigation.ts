
import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'hr'] as const;
export const localePrefix = 'as-needed'; // Default

// The `pathnames` object holds pairs of internal
// pathnames and translated pathnames for each locale.
// So if you have a route like `/about`, you can
// now create localized pathnames like `/en/about`
// and `/de/ueber-uns`.
export const pathnames = {
  // If all locales use the same pathname, a single
  // external path can be used for all locales.
  '/': '/',
  '/appointments': '/appointments',
  '/marketplace': '/marketplace',
  '/ai-assistant': '/ai-assistant',
  // '/signin': '/signin', // Removed auth routes
  // '/signup': '/signup', // Removed auth routes
  '/account': '/account',
  '/vehicle-sales': '/vehicle-sales',
  '/transport-roadside': '/transport-roadside',
  '/admin': '/admin',

  // If locales use different paths, you can
  // specify each external path per locale.
  // '/about': {
  //   en: '/about',
  //   de: '/ueber-uns'
  // }
};

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});
