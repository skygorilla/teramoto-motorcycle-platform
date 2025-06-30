
import { Link } from '@/navigation';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="TERAMOTO Home">
      <Image
        src="/logo.png"
        alt="TERAMOTO Logo"
        width={100} // The asset is square, so width and height are the same for aspect ratio
        height={100}
        priority // Preload the logo as it's likely a Largest Contentful Paint element
        className="h-12 w-auto" // Render it as a 48px high image, width will adjust automatically
      />
    </Link>
  );
}
