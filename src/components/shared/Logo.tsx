import { Link } from '@/navigation';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="TERAMOTO Home">
      <Image
        src="/logo.png"
        alt="TERAMOTO Logo"
        width={36}
        height={36}
        className="h-9 w-auto"
      />
      <span className="font-headline text-2xl font-bold text-foreground hidden md:inline">
        TERAMOTO
      </span>
    </Link>
  );
}
