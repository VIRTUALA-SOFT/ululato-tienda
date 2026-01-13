/**
 * Ululato Premium - Componentes Skeleton
 * Estados de carga elegantes y animados
 */
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

// Skeleton base con animación shimmer premium
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-muted/50",
        "before:absolute before:inset-0",
        "before:translate-x-[-100%]",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r",
        "before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
    />
  );
}

// Skeleton para tarjetas de curso
export function CourseCardSkeleton() {
  return (
    <div className="bg-card border-2 border-border rounded-xl overflow-hidden">
      {/* Imagen */}
      <Skeleton className="aspect-video w-full" />
      
      {/* Contenido */}
      <div className="p-5 space-y-4">
        {/* Título */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        
        {/* Instructor */}
        <Skeleton className="h-4 w-1/2" />
        
        {/* Rating y stats */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        
        {/* Precio */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

// Skeleton para item del carrito
export function CartItemSkeleton() {
  return (
    <div className="bg-card border-2 border-border rounded-xl p-6 flex gap-6">
      {/* Imagen */}
      <Skeleton className="w-40 h-24 flex-shrink-0" />
      
      {/* Contenido */}
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      
      {/* Precio */}
      <div className="text-right space-y-2">
        <Skeleton className="h-7 w-20 ml-auto" />
        <Skeleton className="h-4 w-16 ml-auto" />
      </div>
    </div>
  );
}

// Skeleton para el resumen del carrito
export function CartSummarySkeleton() {
  return (
    <div className="bg-card border-4 border-[#FFD700]/30 rounded-2xl p-6 space-y-6">
      <Skeleton className="h-7 w-48" />
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      
      <Skeleton className="h-14 w-full rounded-xl" />
      
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-4 w-44" />
        </div>
      </div>
    </div>
  );
}

// Skeleton para el hero carousel
export function HeroSkeleton() {
  return (
    <div className="relative h-[600px] w-full">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center">
        <div className="container space-y-6">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-3/4 max-w-2xl" />
            <Skeleton className="h-16 w-1/2 max-w-xl" />
          </div>
          <Skeleton className="h-6 w-2/3 max-w-lg" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-40 rounded-xl" />
            <Skeleton className="h-14 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton para perfil de usuario
export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header del perfil */}
      <div className="bg-card border-2 border-border rounded-2xl p-8">
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card border-2 border-border rounded-xl p-6 text-center">
            <Skeleton className="h-10 w-20 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        ))}
      </div>
      
      {/* Contenido */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border-2 border-border rounded-xl p-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border-2 border-border rounded-xl p-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton para video player
export function VideoPlayerSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="flex-1 h-2 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Skeleton para lista de cursos
export function CourseListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Skeleton para el sidebar de filtros
export function FiltersSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-5 w-24" />
          <div className="space-y-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton para foro/comentarios
export function ForumPostSkeleton() {
  return (
    <div className="bg-card border-2 border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-5 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center gap-4 pt-2">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>
    </div>
  );
}

// Componente de carga de página completa
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 border-b border-border">
        <div className="container h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-64 rounded-lg" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="container py-8 space-y-8">
        <Skeleton className="h-12 w-64" />
        <CourseListSkeleton count={6} />
      </div>
    </div>
  );
}
