/**
 * Ululato Premium - Transiciones de Página
 * Animaciones fluidas y elegantes entre páginas
 */
import { useEffect, useRef, ReactNode } from 'react';
import { useLocation } from 'wouter';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

// Variantes de animación para las páginas
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
};

// Variantes para elementos hijos
export const childVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Componente de transición de página
export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll al inicio de la página en cada cambio de ruta
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Animación adicional con GSAP para elementos específicos
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.animate-on-enter');
      
      gsap.fromTo(elements,
        { 
          opacity: 0, 
          y: 40,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        ref={containerRef}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Componente de overlay de transición premium
export function TransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    if (overlayRef.current) {
      const tl = gsap.timeline();
      
      tl.set(overlayRef.current, { scaleY: 0, transformOrigin: 'bottom' })
        .to(overlayRef.current, {
          scaleY: 1,
          duration: 0.4,
          ease: "power4.inOut"
        })
        .to(overlayRef.current, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.4,
          ease: "power4.inOut",
          delay: 0.1
        });
    }
  }, [location]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-gradient-to-b from-[#FFD700] to-[#003366] pointer-events-none"
      style={{ transform: 'scaleY(0)' }}
    />
  );
}

// Hook para animaciones de entrada de secciones
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target,
              { opacity: 0, y: 50 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power3.out" 
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

// Componente de sección animada
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target,
              { 
                opacity: 0, 
                y: 60,
                scale: 0.95
              },
              { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.8, 
                delay: delay,
                ease: "power3.out" 
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={sectionRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

// Animación de texto revelado
interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function RevealText({ children, className = '', delay = 0 }: RevealTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      
      gsap.fromTo(chars,
        { 
          opacity: 0, 
          y: 50,
          rotateX: -90
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 0.6,
          stagger: 0.02,
          delay: delay,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [delay]);

  return (
    <span ref={textRef} className={className}>
      {children.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block" 
          style={{ opacity: 0 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
