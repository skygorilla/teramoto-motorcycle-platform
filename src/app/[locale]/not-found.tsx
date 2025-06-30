
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center py-12 px-4">
      <h1 className="text-9xl font-bold font-headline mb-4 text-primary/80 tracking-tighter">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-4">{t('title')}</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        {t('description')}
      </p>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          {t('goHome')}
        </Link>
      </Button>
    </div>
  );
}
