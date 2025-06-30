import { Link } from '@/navigation';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="TERAMOTO Home">
      <Image
        src="https://placehold.co/100x100.png"
        alt="TERAMOTO Logo"
        width={100} 
        height={100}
        priority 
        className="h-12 w-auto"
        data-ai-hint="logo"
      />
    </Link>
  );
}
