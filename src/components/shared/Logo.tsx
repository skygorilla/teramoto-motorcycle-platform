import { Link } from '@/navigation';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="TERAMOTO Home">
      {/* 
        This uses a standard <img> tag to load your logo.
        For this to work, you MUST have your logo file at this exact location:
        public/logo.png
      */}
      <img
        src="/logo.png"
        alt="TERAMOTO Logo"
        className="h-9 w-auto"
        width="140" // Set a width to prevent layout shift
        height="36" // Set a height to prevent layout shift
      />
    </Link>
  );
}
