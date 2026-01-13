/**
 * Ululato Logo Component
 * Uses the feather logo representing knowledge and cultural heritage
 */
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
  xl: 'h-14',
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export default function Logo({ className = "", showText = true, size = 'md' }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <img 
        src="/images/logo.png" 
        alt="Ululato Logo" 
        className={cn(
          sizeClasses[size],
          "w-auto object-contain group-hover:scale-110 transition-transform duration-300"
        )}
      />
      {showText && (
        <span className={cn(
          textSizeClasses[size],
          "font-bold text-white font-display tracking-tight"
        )}>
          ULULATO
        </span>
      )}
    </Link>
  );
}

// Standalone logo image for use in other contexts
export function LogoImage({ className = "", size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <img 
      src="/images/logo.png" 
      alt="Ululato Logo" 
      className={cn(
        sizeClasses[size],
        "w-auto object-contain",
        className
      )}
    />
  );
}
