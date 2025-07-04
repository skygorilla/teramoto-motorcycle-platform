import { Link } from '@/navigation';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="TERAMOTO Home">
      <img
        src="/logo.png"
        alt="TERAMOTO Logo"
        className="h-8 md:h-12 lg:h-16 w-auto"
        width="698" 
        height="180" 
      />
    </Link>
  );
}
