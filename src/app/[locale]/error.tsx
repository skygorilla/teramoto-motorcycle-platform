"use client"; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center py-12 px-4">
      <h1 className="text-4xl font-bold font-headline mb-4 text-destructive">
        {t('error')}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {error.message || "Something went wrong on our end."}
      </p>
      <Button
        onClick={() => reset()}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Try again
      </Button>
    </div>
  );
}
