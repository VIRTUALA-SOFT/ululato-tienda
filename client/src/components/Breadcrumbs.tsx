/**
 * Ululato Premium - Componente Breadcrumbs
 * Navegación jerárquica elegante con animaciones sutiles
 */
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link 
          href="/" 
          className="flex items-center gap-1 text-muted-foreground hover:text-[#FFD700] transition-colors group"
        >
          <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="sr-only">Inicio</span>
        </Link>
      </motion.div>

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
          className="flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-muted-foreground hover:text-[#FFD700] transition-colors hover:underline underline-offset-4"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-[300px]">
              {item.label}
            </span>
          )}
        </motion.div>
      ))}
    </nav>
  );
}
