/**
 * Neo-Brutalism Dark Edition: Logo component
 * Uses Space Grotesk bold font with golden feather icon
 */
import { BookOpen } from 'lucide-react';
import { Link } from 'wouter';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/">
      <a className={`flex items-center gap-2 group ${className}`}>
        <BookOpen className="w-8 h-8 text-[#FFD700] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
        <span className="text-2xl font-bold text-white text-display tracking-tight">
          ULULATO
        </span>
      </a>
    </Link>
  );
}
