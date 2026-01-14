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
  md: 'h-8',
  lg: 'h-9',
  xl: 'h-12',
};

// Componente de línea divisoria más visible
function Divider({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <div 
      className={cn(
        dividerHeightClasses[size],
        "w-[2px] rounded-full"
      )}
      style={{
        background: 'linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.7) 70%, transparent 95%)',
        boxShadow: '0 0 6px rgba(255,255,255,0.4), 0 0 2px rgba(255,209,0,0.3)'
      }}
    />
  );
}

function LogoContent({ size = 'md', className = "" }: Omit<LogoProps, 'asLink'>) {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      {/* Logo Icon */}
      <img 
        src="/images/logo.png" 
        alt="Saberes Logo" 
        className={cn(
          sizeClasses[size],
          "w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        )}
      />
      
      {/* Línea divisoria vertical */}
      <Divider size={size} />
      
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
          alt="Saberes Logo" 
          className={cn(
            sizeClasses[size],
            "w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          )}
        />
        
        {/* Línea divisoria vertical */}
        <Divider size={size} />
        
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
      alt="Saberes Logo" 
      className={cn(
        sizeClasses[size],
        "w-auto object-contain",
        className
      )}
    />
  );
}
