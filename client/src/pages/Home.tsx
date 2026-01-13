/**
 * Neo-Brutalism Dark Edition: Página principal con hero carousel y secciones de cursos
 * Incluye banner especial de Wayuu, filtros funcionales y búsqueda
 */
import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles, Award, Globe, Filter } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/mocks';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const heroSlides = [
  {
    id: 1,
    image: '/images/hero-wayuu.png',
    title: 'Aprende Wayuunaiki',
    subtitle: 'Descubre el idioma ancestral del pueblo Wayuu de La Guajira',
    cta: 'Explorar Curso',
    href: '/course/7',
    featured: true,
  },
  {
    id: 2,
    image: '/images/hero-banner-1.png',
    title: 'Domina la Estrategia Empresarial',
    subtitle: 'Aprende de expertos de la industria y transforma tu carrera',
    cta: 'Explorar Cursos',
    href: '/course/1',
  },
  {
    id: 3,
    image: '/images/hero-banner-2.png',
    title: 'Mejora Tus Habilidades',
    subtitle: 'Únete a más de 500,000 estudiantes aprendiendo en Ululato',
    cta: 'Comenzar a Aprender',
    href: '/',
  },
  {
    id: 4,
    image: '/images/hero-banner-3.png',
    title: 'Tu Futuro Comienza Aquí',
    subtitle: 'Cursos premium diseñados para el éxito en el mundo real',
    cta: 'Ver Categorías',
    href: '/',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Estados de filtros
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Filtrar cursos
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Filtro de calificación
      if (selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings.map(r => parseFloat(r)));
        if (course.rating < minRating) return false;
      }

      // Filtro de duración
      if (selectedDurations.length > 0) {
        const hours = parseInt(course.duration);
        const matchesDuration = selectedDurations.some(d => {
          if (d === '0-10') return hours >= 0 && hours <= 10;
          if (d === '10-20') return hours > 10 && hours <= 20;
          if (d === '20-40') return hours > 20 && hours <= 40;
          if (d === '40+') return hours > 40;
          return false;
        });
        if (!matchesDuration) return false;
      }

      // Filtro de precio
      if (selectedPrices.length > 0) {
        const matchesPrice = selectedPrices.some(p => {
          if (p === 'free') return course.price === 0;
          if (p === '0-50') return course.price > 0 && course.price <= 50;
          if (p === '50-100') return course.price > 50 && course.price <= 100;
          if (p === '100+') return course.price > 100;
          return false;
        });
        if (!matchesPrice) return false;
      }

      // Filtro de nivel
      if (selectedLevels.length > 0) {
        if (!selectedLevels.includes(course.level)) return false;
      }

      return true;
    });
  }, [selectedRatings, selectedDurations, selectedPrices, selectedLevels]);

  const bestsellerCourses = filteredCourses.filter(c => c.isBestseller);
  const newCourses = filteredCourses.filter(c => c.isNew);
  const wayuuCourse = courses.find(c => c.id === '7');

  const toggleFilter = (value: string, selected: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedRatings([]);
    setSelectedDurations([]);
    setSelectedPrices([]);
    setSelectedLevels([]);
  };

  const hasActiveFilters = selectedRatings.length > 0 || selectedDurations.length > 0 || 
                          selectedPrices.length > 0 || selectedLevels.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Carousel */}
      <section className="relative h-[500px] overflow-hidden bg-[#003366]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
            
            <div className="container relative h-full flex items-center">
              <div className="max-w-2xl space-y-6">
                {slide.featured && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC143C] text-white font-bold rounded-full border-2 border-black">
                    <Globe className="w-4 h-4" />
                    Destacado Cultural
                  </span>
                )}
                <h1 className="text-6xl font-bold text-white text-display leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl text-gray-200">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-8 py-6 border-4 border-black glow-gold-hover"
                  asChild
                >
                  <Link href={slide.href}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Botones de Navegación */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12"
          onClick={nextSlide}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full border-2 border-white transition-all",
                index === currentSlide ? "bg-[#FFD700] w-8" : "bg-transparent"
              )}
            />
          ))}
        </div>
      </section>

      {/* Contenido Principal */}
      <main className="container py-16">
        <div className="flex gap-8">
          {/* Filtros Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <CourseFilters
              selectedRatings={selectedRatings}
              selectedDurations={selectedDurations}
              selectedPrices={selectedPrices}
              selectedLevels={selectedLevels}
              onRatingChange={(v) => toggleFilter(v, selectedRatings, setSelectedRatings)}
              onDurationChange={(v) => toggleFilter(v, selectedDurations, setSelectedDurations)}
              onPriceChange={(v) => toggleFilter(v, selectedPrices, setSelectedPrices)}
              onLevelChange={(v) => toggleFilter(v, selectedLevels, setSelectedLevels)}
              onClearAll={clearAllFilters}
            />
          </aside>

          {/* Contenido */}
          <div className="flex-1 space-y-16">
            {/* Botón de filtros móvil */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full border-2 border-[#FFD700]">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                    {hasActiveFilters && (
                      <span className="ml-2 px-2 py-0.5 bg-[#FFD700] text-black text-xs rounded-full">
                        {selectedRatings.length + selectedDurations.length + selectedPrices.length + selectedLevels.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <CourseFilters
                      selectedRatings={selectedRatings}
                      selectedDurations={selectedDurations}
                      selectedPrices={selectedPrices}
                      selectedLevels={selectedLevels}
                      onRatingChange={(v) => toggleFilter(v, selectedRatings, setSelectedRatings)}
                      onDurationChange={(v) => toggleFilter(v, selectedDurations, setSelectedDurations)}
                      onPriceChange={(v) => toggleFilter(v, selectedPrices, setSelectedPrices)}
                      onLevelChange={(v) => toggleFilter(v, selectedLevels, setSelectedLevels)}
                      onClearAll={clearAllFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Curso Wayuu Destacado */}
            {wayuuCourse && !hasActiveFilters && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-[#DC143C]" />
                  <h2 className="text-4xl font-bold text-display">Cultura Indígena</h2>
                </div>
                <div className="bg-gradient-to-r from-[#003366] to-[#001a33] border-4 border-[#FFD700] rounded-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="space-y-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#DC143C] text-white text-sm font-bold rounded-full">
                        Nuevo
                      </span>
                      <h3 className="text-3xl font-bold text-white text-display">{wayuuCourse.title}</h3>
                      <p className="text-gray-200">{wayuuCourse.description}</p>
                      <div className="flex items-center gap-4 text-gray-200">
                        <span className="flex items-center gap-1">
                          <span className="text-[#FFD700]">★</span>
                          {wayuuCourse.rating}
                        </span>
                        <span>{wayuuCourse.studentCount.toLocaleString()} estudiantes</span>
                        <span>{wayuuCourse.duration}</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-[#FFD700]">${wayuuCourse.price}</span>
                        <span className="text-xl text-gray-400 line-through">${wayuuCourse.originalPrice}</span>
                      </div>
                      <Button
                        size="lg"
                        className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold border-4 border-black glow-gold-hover"
                        asChild
                      >
                        <Link href={`/course/${wayuuCourse.id}`}>Ver Curso</Link>
                      </Button>
                    </div>
                    <div className="relative aspect-video md:aspect-auto rounded-lg overflow-hidden">
                      <img
                        src={wayuuCourse.thumbnail}
                        alt={wayuuCourse.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Sección Recomendados */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-[#FFD700]" />
                <h2 className="text-4xl font-bold text-display">Recomendados para Ti</h2>
              </div>
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.slice(0, 6).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card border-2 border-border rounded-lg">
                  <p className="text-xl text-muted-foreground">No se encontraron cursos con los filtros seleccionados</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-[#FFD700] text-[#FFD700]"
                    onClick={clearAllFilters}
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              )}
            </section>

            {/* Sección Más Vendidos */}
            {bestsellerCourses.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#FFD700]" />
                  <h2 className="text-4xl font-bold text-display">Más Vendidos</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {bestsellerCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </section>
            )}

            {/* Sección Nuevos */}
            {newCourses.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-[#DC143C]" />
                  <h2 className="text-4xl font-bold text-display">Nuevos y Populares</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {newCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </section>
            )}

            {/* Sección CTA */}
            <section className="relative overflow-hidden rounded-2xl border-4 border-[#FFD700] bg-gradient-to-br from-[#003366] to-[#001a33] p-12 text-center">
              <div className="relative z-10 space-y-6">
                <h2 className="text-5xl font-bold text-white text-display">
                  ¿Listo para Transformar Tu Carrera?
                </h2>
                <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                  Únete a miles de estudiantes aprendiendo de instructores de clase mundial
                </p>
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-10 py-6 border-4 border-black glow-gold-hover"
                >
                  Comienza a Aprender Hoy
                </Button>
              </div>
              <div className="absolute inset-0 bg-[url('/images/hero-banner-3.png')] opacity-10 bg-cover bg-center" />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#003366] border-t-4 border-[#FFD700] mt-20">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white text-display">Ululato</h3>
              <p className="text-gray-300 text-sm">
                Plataforma de aprendizaje en línea premium para profesionales ambiciosos
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Categorías</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/categoria/desarrollo"><a className="hover:text-[#FFD700]">Desarrollo</a></Link></li>
                <li><Link href="/categoria/negocios"><a className="hover:text-[#FFD700]">Negocios</a></Link></li>
                <li><Link href="/categoria/diseno"><a className="hover:text-[#FFD700]">Diseño</a></Link></li>
                <li><Link href="/categoria/idiomas"><a className="hover:text-[#FFD700]">Idiomas</a></Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Soporte</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#FFD700]">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Contáctanos</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Política de Privacidad</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Enseña en Ululato</h4>
              <p className="text-sm text-gray-300">
                Comparte tu conocimiento y gana dinero
              </p>
              <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold">
                Conviértete en Instructor
              </Button>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Ululato. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
