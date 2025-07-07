"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CompactLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function CompactLayout({ 
  children, 
  sidebar, 
  header, 
  maxWidth = 'xl',
  className 
}: CompactLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl'
  };

  return (
    <div className="min-h-screen bg-background">
      {header && (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
          <div className={cn("mx-auto px-4", maxWidthClasses[maxWidth])}>
            {header}
          </div>
        </header>
      )}
      
      <div className={cn("mx-auto px-4 py-6", maxWidthClasses[maxWidth])}>
        {sidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              {sidebar}
            </aside>
            <main className={cn("min-w-0", className)}>
              {children}
            </main>
          </div>
        ) : (
          <main className={cn("w-full", className)}>
            {children}
          </main>
        )}
      </div>
    </div>
  );
}