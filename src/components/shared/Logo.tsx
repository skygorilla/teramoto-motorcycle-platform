
import { Link } from '@/navigation';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="https://imagekit.io/public/share/oe3ifd1ja/c28b3591e043ca5604f3ea6d3afacab70cd6878ab21eb0c150f80e2f3b0a9462eaf52715f506f69343e91736e4118d51572eac7a3cb8980ef0eb461627679e466fb1e7050551d7f127131bc73797ee1c"
        alt="TERAMOTO Logo"
        width={32}  // Displayed width in pixels, changed from 40
        height={32} // Displayed height in pixels, changed from 40
        priority
      />
    </Link>
  );
}
