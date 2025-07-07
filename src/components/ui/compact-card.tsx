import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CompactCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function CompactCard({ children, className, padding = 'md' }: CompactCardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4', 
    lg: 'p-6'
  };

  return (
    <div className={cn(
      "bg-card border rounded-lg shadow-sm",
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

interface CompactGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CompactGrid({ children, cols = 2, gap = 'md', className }: CompactGridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6'
  };

  return (
    <div className={cn("grid", colClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
}