import { Link } from '@/navigation';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png" // User must place their logo image as 'logo.png' in the 'public' folder.
        alt="TERAMOTO Logo"
        width={40}  // Displayed width in pixels
        height={40} // Displayed height in pixels
        priority 
      />
    </Link>
  );
}
