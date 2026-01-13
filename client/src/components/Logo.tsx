/**
 * Ululato Logo Component
 * Uses the feather logo representing knowledge and cultural heritage
 * Includes "SABERES" tagline with elegant styling
 */
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  showSaberes?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  asLink?: boolean;
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

const saberesSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

const dividerHeightClasses = {
  sm: 'h-4',
  md: 'h-5',
  lg: 'h-6',
  xl: 'h-8',
};

function LogoContent({ showText = true, showSaberes = true, size = 'md', className = "" }: Omit<LogoProps, 'asLink'>) {
  return (
    <div className={cn("flex items-center gap-2 group", className)}>
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
      {showSaberes && (
        <>
          {/* Línea divisoria vertical */}
          <div className={cn(
            dividerHeightClasses[size],
            "w-px bg-white/30 mx-1"
          )} />
          {/* Palabra SABERES */}
          <span className={cn(
            saberesSizeClasses[size],
            "font-light tracking-widest text-[#FFD100]"
          )}
          style={{ fontFamily: 'Inter, Geist, sans-serif' }}
          >
            SABERES
          </span>
        </>
      )}
    </div>
  );
}

export default function Logo({ className = "", showText = true, showSaberes = true, size = 'md', asLink = true }: LogoProps) {
  if (asLink) {
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
        {showSaberes && (
          <>
            {/* Línea divisoria vertical */}
            <div className={cn(
              dividerHeightClasses[size],
              "w-px bg-white/30 mx-1"
            )} />
            {/* Palabra SABERES */}
            <span className={cn(
              saberesSizeClasses[size],
              "font-light tracking-widest text-[#FFD100]"
            )}
            style={{ fontFamily: 'Inter, Geist, sans-serif' }}
            >
              SABERES
            </span>
          </>
        )}
      </Link>
    );
  }

  return <LogoContent showText={showText} showSaberes={showSaberes} size={size} className={className} />;
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
