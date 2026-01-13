/**
 * Neo-Brutalism Dark Edition: Tarjeta de curso con bordes gruesos, efectos glow
 * Muestra thumbnail, título, instructor, calificación, precio con acentos dorados
 */
import { Star, Heart, Users } from 'lucide-react';
import { Link } from 'wouter';
import { Course } from '@/data/mocks';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  className?: string;
}

export default function CourseCard({ course, className }: CourseCardProps) {
  const { wishlist, toggleWishlist, addToCart, cart } = useApp();
  const isInWishlist = wishlist.includes(course.id);
  const isInCart = cart.includes(course.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(course.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(course.id);
  };

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <Link href={`/course/${course.id}`}>
      <a className={cn(
        "group block bg-card border-2 border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20 hover:-translate-y-1",
        className
      )}>
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {course.isBestseller && (
              <Badge className="bg-[#FFD700] text-black font-bold border-2 border-black">
                Más Vendido
              </Badge>
            )}
            {course.isNew && (
              <Badge className="bg-[#DC143C] text-white font-bold border-2 border-black">
                Nuevo
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-[#DC143C] text-white font-bold border-2 border-black">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Botón de Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-colors",
                isInWishlist && "fill-[#DC143C] text-[#DC143C]"
              )}
            />
          </Button>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-3">
          {/* Título */}
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#FFD700] transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground">
            {course.instructor.name}
          </p>

          {/* Calificación y Estudiantes */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#FFD700]">{course.rating}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(course.rating)
                        ? "fill-[#FFD700] text-[#FFD700]"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{(course.studentCount / 1000).toFixed(0)}k</span>
            </div>
          </div>

          {/* Precio y CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#FFD700]">
                ${course.price}
              </span>
              {course.originalPrice > course.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            {!isInCart ? (
              <Button
                size="sm"
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold border-2 border-black glow-gold-hover"
                onClick={handleAddToCart}
              >
                Agregar
              </Button>
            ) : (
              <Badge className="bg-green-600 text-white border-2 border-black">
                En Carrito
              </Badge>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
}
