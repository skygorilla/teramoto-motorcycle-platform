import { Link } from '@/navigation';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="TERAMOTO Home">
      {/* Embedded SVG to ensure the logo always loads and bypasses file path issues. */}
      <svg
        role="img"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-auto text-primary"
      >
        <title>TERAMOTO Logo</title>
        <g fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m4.93 19.07 1.41-1.41" />
          <path d="m17.66 6.34 1.41-1.41" />
        </g>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="Belleza, sans-serif"
          fontSize="11px"
          fontWeight="bold"
          fill="hsl(var(--primary))"
        >
          T
        </text>
      </svg>
      <span className="font-headline text-2xl font-bold text-foreground hidden md:inline">
        TERAMOTO
      </span>
    </Link>
  );
}
