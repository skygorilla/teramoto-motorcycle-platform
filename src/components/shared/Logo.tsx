import { Link } from '@/navigation';
import { MountainSnow } from 'lucide-react'; // Using a placeholder icon

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
      <MountainSnow className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold font-headline">TERAMOTO</span>
    </Link>
  );
}
