/**
 * Ululato Logo Component
 * Uses the feather logo with "SABERES" tagline
 * Logo | SABERES
 */
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  asLink?: boolean;
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
};

const saberesSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const dividerHeightClasses = {
  sm: 'h-6',
  md: 'h-7',
  lg: 'h-8',
  xl: 'h-10',
};

function LogoContent({ size = 'md', className = "" }: Omit<LogoProps, 'asLink'>) {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      {/* Logo Icon */}
      <img 
        src="/images/logo.png" 
        alt="Ululato Logo" 
        className={cn(
          sizeClasses[size],
          "w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        )}
      />
      
      {/* Línea divisoria vertical - más visible */}
      <div className={cn(
        dividerHeightClasses[size],
        "w-[2px] bg-white/40"
      )} />
      
      {/* Palabra SABERES */}
      <span 
        className={cn(
          saberesSizeClasses[size],
          "font-light tracking-[0.25em] text-[#FFD100] uppercase"
        )}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        SABERES
      </span>
    </div>
  );
}

export default function Logo({ className = "", size = 'md', asLink = true }: LogoProps) {
  if (asLink) {
    return (
      <Link href="/" className={cn("flex items-center gap-3 group", className)}>
        {/* Logo Icon */}
        <img 
          src="/images/logo.png" 
          alt="Ululato Logo" 
          className={cn(
            sizeClasses[size],
            "w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          )}
        />
        
        {/* Línea divisoria vertical - más visible */}
        <div className={cn(
          dividerHeightClasses[size],
          "w-[2px] bg-white/40"
        )} />
        
        {/* Palabra SABERES */}
        <span 
          className={cn(
            saberesSizeClasses[size],
            "font-light tracking-[0.25em] text-[#FFD100] uppercase"
          )}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          SABERES
        </span>
      </Link>
    );
  }

  return <LogoContent size={size} className={className} />;
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
