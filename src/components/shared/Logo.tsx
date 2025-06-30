import { Link } from '@/navigation';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="TERAMOTO Home">
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-auto"
        aria-hidden="true"
      >
        <title>TERAMOTO Logo</title>
        {/* Outer Gear Shape */}
        <circle cx="20" cy="20" r="17" stroke="hsl(var(--primary))" strokeWidth="2" />
        
        {/* Gear Teeth */}
        <g transform="translate(20, 20)">
            <line x1="0" y1="17" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(0)" />
            <line x1="0" y1="17" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(45)" />
            <line x1="0" y1="17" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(90)" />
            <line x1="0" y1="17" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(135)" />
            <line x1="0" y1="17" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(180)" />
            <line x1="0" y1="17" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(225)" />
            <line x1="0" y1="17" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(270)" />
            <line x1="0" y1="17" x2="0" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(315)" />
        </g>
        
        {/* Stylized 'T' that evokes a lion's face */}
        <path d="M13 14H27" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 14V28" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 23L20 18L24 23" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
      <span className="font-headline text-2xl font-bold text-foreground hidden md:inline">
        TERAMOTO
      </span>
    </Link>
  );
}
