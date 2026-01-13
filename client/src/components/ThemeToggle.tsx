/**
 * Ululato Premium - Toggle de Tema
 * Cambio elegante entre modo oscuro y claro
 */
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme, switchable } = useTheme();

  if (!switchable || !toggleTheme) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-card border-2 border-border hover:border-[#FFD700]/50 flex items-center justify-center transition-colors overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Moon className="w-5 h-5 text-[#FFD700]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Sun className="w-5 h-5 text-[#FFA500]" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Efecto de brillo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}
