'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Home, Mail } from 'lucide-react';

export default function DeleteDataNotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center py-12 px-4">
      <h1 className="text-9xl font-bold font-headline mb-4 text-primary/80 tracking-tighter">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-4">Data Deletion Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        To delete your data from TERAMOTO, please contact us directly.
      </p>
      <div className="bg-muted p-6 rounded-lg mb-8 max-w-md">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-4 w-4" />
          <strong>Email:</strong>
        </div>
        <p className="text-sm">info.teramoto@gmail.com</p>
        <p className="text-xs text-muted-foreground mt-2">
          Include your account email address in your request
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          {t('goHome')}
        </Link>
      </Button>
    </div>
  );
}