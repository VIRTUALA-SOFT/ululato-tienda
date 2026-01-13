/**
 * Neo-Brutalism Dark Edition: Página de resultados de búsqueda
 * Muestra cursos filtrados por término de búsqueda
 */
import { useState, useMemo } from 'react';
import { useSearch } from 'wouter';
import { Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/mocks';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function SearchPage() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const query = params.get('q') || '';
  
  // Estados de filtros
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  // Filtrar cursos por búsqueda y filtros
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Filtro de búsqueda
      const searchLower = query.toLowerCase();
      const matchesSearch = 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.name.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;

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
  }, [query, selectedRatings, selectedDurations, selectedPrices, selectedLevels]);

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

      {/* Header de Búsqueda */}
      <section className="bg-[#003366] border-b-4 border-[#FFD700] py-12">
        <div className="container">
          <div className="flex items-center gap-4 mb-2">
            <Search className="w-8 h-8 text-[#FFD700]" />
            <h1 className="text-4xl font-bold text-white text-display">
              Resultados para "{query}"
            </h1>
          </div>
          <p className="text-gray-300">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <main className="container py-12">
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

          {/* Resultados */}
          <div className="flex-1">
            {/* Botón de filtros móvil */}
            <div className="lg:hidden mb-6">
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

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card border-2 border-border rounded-lg">
                <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold text-display mb-2">No se encontraron resultados</h2>
                <p className="text-muted-foreground mb-6">
                  {hasActiveFilters 
                    ? 'Intenta ajustar los filtros o buscar con otros términos'
                    : `No encontramos cursos que coincidan con "${query}"`}
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="border-[#FFD700] text-[#FFD700]"
                    onClick={clearAllFilters}
                  >
                    Limpiar Filtros
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
