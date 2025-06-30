
import { Link } from '@/navigation';

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="TERAMOTO Home">
      <svg
        className="h-8 w-auto text-primary"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M5 3H19V5H13V21H11V5H5V3Z" />
      </svg>
    </Link>
  );
}
