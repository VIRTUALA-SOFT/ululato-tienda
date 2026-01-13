/**
 * Ululato Premium - Selector de Idioma
 * Permite cambiar entre Español, Inglés y Wayuunaiki
 */
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const languages = [
  { code: 'es' as const, name: 'Español', flag: '🇨🇴', native: 'Español' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸', native: 'English' },
  { code: 'way' as const, name: 'Wayuunaiki', flag: '🏜️', native: 'Wayuunaiki' },
];

interface LanguageSelectorProps {
  variant?: 'icon' | 'full';
  className?: string;
}

export default function LanguageSelector({ variant = 'icon', className }: LanguageSelectorProps) {
  const { language, setLanguage, languageFlag } = useLanguage();

  const currentLang = languages.find(l => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
            "hover:bg-muted border border-transparent hover:border-border",
            "focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50",
            className
          )}
        >
          <Globe className="w-4 h-4 text-muted-foreground" />
          {variant === 'full' ? (
            <>
              <span className="text-lg">{languageFlag}</span>
              <span className="text-sm font-medium">{currentLang?.native}</span>
            </>
          ) : (
            <span className="text-lg">{languageFlag}</span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-card border-2 border-border"
      >
        <div className="px-3 py-2 border-b border-border">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Seleccionar idioma
          </p>
        </div>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "flex items-center gap-3 px-3 py-3 cursor-pointer",
              language === lang.code && "bg-[#FFD700]/10"
            )}
          >
            <span className="text-2xl">{lang.flag}</span>
            <div className="flex-1">
              <p className={cn(
                "font-medium",
                language === lang.code && "text-[#FFD700]"
              )}>
                {lang.native}
              </p>
              <p className="text-xs text-muted-foreground">{lang.name}</p>
            </div>
            {language === lang.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 rounded-full bg-[#FFD700]"
              />
            )}
          </DropdownMenuItem>
        ))}
        
        {/* Nota sobre Wayuunaiki */}
        <div className="px-3 py-2 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">
            🌵 El Wayuunaiki es el idioma del pueblo Wayuu de La Guajira, Colombia.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
