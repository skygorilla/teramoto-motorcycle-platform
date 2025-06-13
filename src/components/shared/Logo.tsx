
import { Link } from '@/navigation';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="https://placehold.co/32x32.png"
        alt="TERAMOTO Logo"
        width={32}
        height={32}
        priority
        data-ai-hint="logo teramoto"
      />
    </Link>
  );
}
