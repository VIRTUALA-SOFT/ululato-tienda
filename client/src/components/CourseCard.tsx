/**
 * Neo-Brutalism Dark Edition: Tarjeta de curso con bordes gruesos, efectos glow
 * Muestra thumbnail, título, instructor, calificación, precio con acentos dorados
 * Incluye vista previa de video en hover
 */
import { useState, useRef, useEffect } from 'react';
import { Star, Heart, Users, Play, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'wouter';
import { Course } from '@/data/mocks';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import LazyImage from './LazyImage';
import { motion, AnimatePresence } from 'framer-motion';

interface CourseCardProps {
  course: Course;
  className?: string;
  enableVideoPreview?: boolean;
}

// Sample preview videos for demo (in production, each course would have its own preview)
const previewVideos: Record<string, string> = {
  '1': 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  '2': 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  '3': 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  '4': 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  '5': 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  '6': 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  '7': 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
};

export default function CourseCard({ course, className, enableVideoPreview = true }: CourseCardProps) {
  const { wishlist, toggleWishlist, addToCart, cart } = useApp();
  const isInWishlist = wishlist.includes(course.id);
  const isInCart = cart.includes(course.id);
  
  const [isHovering, setIsHovering] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(course.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(course.id);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (enableVideoPreview) {
      // Delay video start to avoid loading on quick hovers
      hoverTimeoutRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowVideo(false);
    setVideoLoaded(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, probably due to browser restrictions
      });
    }
  }, [showVideo]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  const previewUrl = previewVideos[course.id] || previewVideos['1'];

  return (
    <Link href={`/course/${course.id}`}>
      <div 
        className={cn(
          "group block bg-card border-2 border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20 hover:-translate-y-1 cursor-pointer",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail / Video Preview */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {/* Static Image */}
          <LazyImage
            src={course.thumbnail}
            alt={course.title}
            className={cn(
              "w-full h-full transition-all duration-500",
              showVideo && videoLoaded ? "opacity-0 scale-110" : "opacity-100 group-hover:scale-105"
            )}
            aspectRatio="video"
          />
          
          {/* Video Preview */}
          <AnimatePresence>
            {showVideo && enableVideoPreview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  src={previewUrl}
                  muted={isMuted}
                  loop
                  playsInline
                  onLoadedData={() => setVideoLoaded(true)}
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    videoLoaded ? "opacity-100" : "opacity-0"
                  )}
                />
                
                {/* Video Loading Indicator */}
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-10 h-10 border-3 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                
                {/* Video Controls Overlay */}
                {videoLoaded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  >
                    {/* Mute Toggle */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-3 left-3 bg-black/50 hover:bg-black/70 text-white w-8 h-8"
                      onClick={handleToggleMute}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    
                    {/* Preview Label */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
                      <Play className="w-3 h-3 fill-current" />
                      Vista previa
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Play Icon on Hover (before video loads) */}
          <AnimatePresence>
            {isHovering && !showVideo && enableVideoPreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30"
              >
                <div className="w-14 h-14 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-black fill-black ml-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
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
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white z-10"
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
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {/* Título */}
          <h3 className="font-semibold text-sm sm:text-base lg:text-lg line-clamp-2 group-hover:text-[#FFD700] transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-xs sm:text-sm text-muted-foreground">
            {course.instructor.name}
          </p>

          {/* Calificación y Estudiantes */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#003366] dark:text-[#FFD700]">{course.rating}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3 sm:w-4 sm:h-4",
                      i < Math.floor(course.rating)
                        ? "fill-[#003366] text-[#003366] dark:fill-[#FFD700] dark:text-[#FFD700]"
                        : "text-gray-400 dark:text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-muted-foreground hidden sm:inline">({course.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{(course.studentCount / 1000).toFixed(0)}k</span>
            </div>
          </div>

          {/* Precio y CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#003366] dark:text-[#FFD700]">
                ${course.price}
              </span>
              {course.originalPrice > course.price && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
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
      </div>
    </Link>
  );
}
