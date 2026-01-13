/**
 * Ululato Premium - Componente LazyImage
 * Carga diferida de imágenes con placeholder elegante y transición suave
 */
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
}

export default function LazyImage({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  aspectRatio = 'auto'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const aspectRatioClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    auto: ''
  }[aspectRatio];

  return (
    <div 
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-muted/30',
        aspectRatioClass,
        className
      )}
    >
      {/* Placeholder con shimmer */}
      <div 
        className={cn(
          'absolute inset-0 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 animate-shimmer',
          isLoaded ? 'opacity-0' : 'opacity-100',
          'transition-opacity duration-500',
          placeholderClassName
        )}
        style={{
          backgroundSize: '200% 100%'
        }}
      />
      
      {/* Imagen real */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
        />
      )}
    </div>
  );
}
