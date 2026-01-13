/**
 * Página de Comparación de Cursos
 * Permite comparar hasta 3 cursos lado a lado
 */
import { useState, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Plus, Search, Star, Users, Clock, Award, BookOpen,
  Check, Minus, ChevronDown, ArrowLeft, Scale, Sparkles,
  GraduationCap, Target, BarChart3, Heart, LucideIcon
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { courses, Course, categories } from '@/data/mocks';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const MAX_COMPARE = 3;

// Comparison criteria
const comparisonCriteria = [
  { id: 'price', label: 'Precio', icon: BarChart3 },
  { id: 'rating', label: 'Calificación', icon: Star },
  { id: 'students', label: 'Estudiantes', icon: Users },
  { id: 'duration', label: 'Duración', icon: Clock },
  { id: 'level', label: 'Nivel', icon: Target },
  { id: 'lessons', label: 'Lecciones', icon: BookOpen },
  { id: 'certificate', label: 'Certificado', icon: Award },
  { id: 'instructor', label: 'Instructor', icon: GraduationCap },
];

// Course selector modal
function CourseSelector({ 
  onSelect, 
  excludeIds 
}: { 
  onSelect: (course: Course) => void;
  excludeIds: string[];
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      if (excludeIds.includes(course.id)) return false;
      if (selectedCategory && course.category !== selectedCategory) return false;
      if (search) {
        const searchLower = search.toLowerCase();
        return (
          course.title.toLowerCase().includes(searchLower) ||
          course.instructor.name.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [search, selectedCategory, excludeIds]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cursos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? "bg-[#FFD700] text-black" : ""}
        >
          Todos
        </Button>
        {categories.map(cat => (
          <Button
            key={cat.slug}
            variant={selectedCategory === cat.slug ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.slug)}
            className={selectedCategory === cat.slug ? "bg-[#FFD700] text-black" : ""}
          >
            {cat.icon} {cat.name}
          </Button>
        ))}
      </div>

      {/* Course List */}
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {filteredCourses.map(course => (
            <button
              key={course.id}
              onClick={() => onSelect(course)}
              className="w-full p-3 rounded-lg border border-border hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all text-left flex gap-3"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-14 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-1">{course.title}</h4>
                <p className="text-xs text-muted-foreground">{course.instructor.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                    <span className="text-xs font-medium">{course.rating}</span>
                  </div>
                  <span className="text-xs text-[#FFD700] font-bold">${course.price}</span>
                </div>
              </div>
              <Plus className="w-5 h-5 text-muted-foreground self-center" />
            </button>
          ))}
          {filteredCourses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron cursos
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// Empty slot component
function EmptySlot({ onAdd, excludeIds }: { onAdd: (course: Course) => void; excludeIds: string[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full h-full min-h-[200px] rounded-xl border-2 border-dashed border-border hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-[#FFD700]">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Agregar curso</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Seleccionar curso para comparar</DialogTitle>
        </DialogHeader>
        <CourseSelector onSelect={onAdd} excludeIds={excludeIds} />
      </DialogContent>
    </Dialog>
  );
}

// Course card in comparison
function CompareCard({ 
  course, 
  onRemove,
  isWinner 
}: { 
  course: Course; 
  onRemove: () => void;
  isWinner?: boolean;
}) {
  const { addToCart, cart, toggleWishlist, wishlist } = useApp();
  const isInCart = cart.includes(course.id);
  const isInWishlist = wishlist.includes(course.id);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "relative rounded-xl border-2 overflow-hidden transition-all",
        isWinner ? "border-[#FFD700] shadow-lg shadow-[#FFD700]/20" : "border-border"
      )}
    >
      {/* Winner Badge */}
      {isWinner && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#FFD700] to-amber-500 text-black text-center py-1 text-sm font-bold z-10">
          <Sparkles className="w-4 h-4 inline mr-1" />
          Mejor opción
        </div>
      )}

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Thumbnail */}
      <div className={cn("relative aspect-video", isWinner && "mt-7")}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.isBestseller && (
          <Badge className="absolute bottom-2 left-2 bg-[#FFD700] text-black">
            Más Vendido
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <Link href={`/course/${course.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-[#FFD700] transition-colors cursor-pointer">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{course.instructor.name}</p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            className={cn(
              "flex-1",
              isInCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
            )}
            onClick={() => addToCart(course.id)}
            disabled={isInCart}
          >
            {isInCart ? 'En Carrito' : 'Agregar'}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleWishlist(course.id)}
          >
            <Heart className={cn(
              "w-4 h-4",
              isInWishlist && "fill-[#DC143C] text-[#DC143C]"
            )} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Comparison row
function CompareRow({ 
  label, 
  icon: Icon, 
  values,
  highlight 
}: { 
  label: string;
  icon: LucideIcon;
  values: (string | number | boolean | null)[];
  highlight?: 'highest' | 'lowest';
}) {
  // Find best value for highlighting
  const numericValues = values.map(v => typeof v === 'number' ? v : null);
  const validValues = numericValues.filter((v): v is number => v !== null);
  
  let bestIndex = -1;
  if (highlight && validValues.length > 0) {
    const best = highlight === 'highest' 
      ? Math.max(...validValues) 
      : Math.min(...validValues);
    bestIndex = numericValues.indexOf(best);
  }

  return (
    <div className="grid grid-cols-4 gap-4 py-4 border-b border-border">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {values.map((value, index) => (
        <div
          key={index}
          className={cn(
            "text-center font-medium",
            index === bestIndex && "text-[#FFD700]"
          )}
        >
          {value === null ? (
            <Minus className="w-4 h-4 mx-auto text-muted-foreground" />
          ) : typeof value === 'boolean' ? (
            value ? (
              <Check className="w-5 h-5 mx-auto text-green-500" />
            ) : (
              <X className="w-5 h-5 mx-auto text-red-500" />
            )
          ) : (
            <span className={index === bestIndex ? "relative" : ""}>
              {value}
              {index === bestIndex && (
                <Sparkles className="w-3 h-3 absolute -top-1 -right-4 text-[#FFD700]" />
              )}
            </span>
          )}
        </div>
      ))}
      {/* Fill empty slots */}
      {Array.from({ length: MAX_COMPARE - values.length }).map((_, i) => (
        <div key={`empty-${i}`} className="text-center">
          <Minus className="w-4 h-4 mx-auto text-muted-foreground/30" />
        </div>
      ))}
    </div>
  );
}

export default function ComparePage() {
  const [, navigate] = useLocation();
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const addCourse = (course: Course) => {
    if (selectedCourses.length < MAX_COMPARE) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== courseId));
  };

  // Calculate winner based on value score
  const winnerIndex = useMemo(() => {
    if (selectedCourses.length < 2) return -1;
    
    const scores = selectedCourses.map(course => {
      let score = 0;
      // Rating weight: 30%
      score += (course.rating / 5) * 30;
      // Price value (inverse): 25%
      const maxPrice = Math.max(...selectedCourses.map(c => c.price));
      score += ((maxPrice - course.price) / maxPrice) * 25;
      // Students (popularity): 20%
      const maxStudents = Math.max(...selectedCourses.map(c => c.studentCount));
      score += (course.studentCount / maxStudents) * 20;
      // Lessons (content): 15%
      const totalLessons = course.sections.reduce((acc, s) => acc + s.lectures.length, 0);
      const maxLessons = Math.max(...selectedCourses.map(c => 
        c.sections.reduce((acc, s) => acc + s.lectures.length, 0)
      ));
      score += (totalLessons / maxLessons) * 15;
      // Bestseller bonus: 10%
      if (course.isBestseller) score += 10;
      
      return score;
    });

    return scores.indexOf(Math.max(...scores));
  }, [selectedCourses]);

  const excludeIds = selectedCourses.map(c => c.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 border border-[#FFD700]/30 flex items-center justify-center">
                <Scale className="w-7 h-7 text-[#FFD700]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-display">Comparar Cursos</h1>
                <p className="text-muted-foreground">
                  Selecciona hasta {MAX_COMPARE} cursos para comparar sus características
                </p>
              </div>
            </div>

            {/* Selection Count */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {selectedCourses.length} de {MAX_COMPARE} cursos seleccionados
              </Badge>
              {selectedCourses.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCourses([])}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Limpiar todo
                </Button>
              )}
            </div>
          </motion.div>

          {/* Course Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <AnimatePresence mode="popLayout">
              {selectedCourses.map((course, index) => (
                <CompareCard
                  key={course.id}
                  course={course}
                  onRemove={() => removeCourse(course.id)}
                  isWinner={index === winnerIndex && selectedCourses.length >= 2}
                />
              ))}
            </AnimatePresence>
            {Array.from({ length: MAX_COMPARE - selectedCourses.length }).map((_, i) => (
              <EmptySlot 
                key={`empty-${i}`} 
                onAdd={addCourse}
                excludeIds={excludeIds}
              />
            ))}
          </motion.div>

          {/* Comparison Table */}
          {selectedCourses.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#FFD700]" />
                Comparación detallada
              </h2>

              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 pb-4 border-b-2 border-border">
                <div className="text-sm font-medium text-muted-foreground">Característica</div>
                {selectedCourses.map(course => (
                  <div key={course.id} className="text-center">
                    <span className="font-semibold text-sm line-clamp-1">{course.title}</span>
                  </div>
                ))}
                {Array.from({ length: MAX_COMPARE - selectedCourses.length }).map((_, i) => (
                  <div key={`header-empty-${i}`} className="text-center text-muted-foreground/30">
                    -
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              <CompareRow
                label="Precio"
                icon={BarChart3}
                values={selectedCourses.map(c => `$${c.price}`)}
                highlight="lowest"
              />
              <CompareRow
                label="Calificación"
                icon={Star}
                values={selectedCourses.map(c => c.rating)}
                highlight="highest"
              />
              <CompareRow
                label="Estudiantes"
                icon={Users}
                values={selectedCourses.map(c => `${(c.studentCount / 1000).toFixed(0)}k`)}
                highlight="highest"
              />
              <CompareRow
                label="Duración"
                icon={Clock}
                values={selectedCourses.map(c => c.duration)}
              />
              <CompareRow
                label="Nivel"
                icon={Target}
                values={selectedCourses.map(c => 
                  c.level === 'principiante' ? 'Principiante' :
                  c.level === 'intermedio' ? 'Intermedio' : 'Avanzado'
                )}
              />
              <CompareRow
                label="Lecciones"
                icon={BookOpen}
                values={selectedCourses.map(c => 
                  c.sections.reduce((acc, s) => acc + s.lectures.length, 0)
                )}
                highlight="highest"
              />
              <CompareRow
                label="Secciones"
                icon={BookOpen}
                values={selectedCourses.map(c => c.sections.length)}
                highlight="highest"
              />
              <CompareRow
                label="Certificado"
                icon={Award}
                values={selectedCourses.map(() => true)}
              />
              <CompareRow
                label="Más Vendido"
                icon={Sparkles}
                values={selectedCourses.map(c => c.isBestseller)}
              />
              <CompareRow
                label="Instructor"
                icon={GraduationCap}
                values={selectedCourses.map(c => c.instructor.name)}
              />

              {/* What You'll Learn */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#FFD700]" />
                  Lo que aprenderás
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {selectedCourses.map(course => (
                    <div key={course.id} className="space-y-2">
                      {course.whatYouWillLearn.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground line-clamp-2">{item}</span>
                        </div>
                      ))}
                      {course.whatYouWillLearn.length > 4 && (
                        <p className="text-xs text-muted-foreground">
                          +{course.whatYouWillLearn.length - 4} más...
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {selectedCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Scale className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comienza a comparar</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Selecciona al menos 2 cursos para ver una comparación detallada de sus características, 
                precios y contenido.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar primer curso
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Seleccionar curso para comparar</DialogTitle>
                  </DialogHeader>
                  <CourseSelector onSelect={addCourse} excludeIds={excludeIds} />
                </DialogContent>
              </Dialog>
            </motion.div>
          )}

          {/* Single Course State */}
          {selectedCourses.length === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 bg-card/50 rounded-xl border border-border"
            >
              <p className="text-muted-foreground mb-4">
                Agrega al menos un curso más para ver la comparación
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar otro curso
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Seleccionar curso para comparar</DialogTitle>
                  </DialogHeader>
                  <CourseSelector onSelect={addCourse} excludeIds={excludeIds} />
                </DialogContent>
              </Dialog>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
