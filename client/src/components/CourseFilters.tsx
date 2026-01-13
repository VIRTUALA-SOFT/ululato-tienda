/**
 * Neo-Brutalism Dark Edition: Filtros laterales para cursos
 * Filtros por rating, duración, precio y nivel
 */
import { Star, Clock, DollarSign, BarChart } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { filterOptions } from '@/data/mocks';

interface CourseFiltersProps {
  selectedRatings: string[];
  selectedDurations: string[];
  selectedPrices: string[];
  selectedLevels: string[];
  onRatingChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onClearAll: () => void;
}

export default function CourseFilters({
  selectedRatings,
  selectedDurations,
  selectedPrices,
  selectedLevels,
  onRatingChange,
  onDurationChange,
  onPriceChange,
  onLevelChange,
  onClearAll,
}: CourseFiltersProps) {
  const hasFilters = selectedRatings.length > 0 || selectedDurations.length > 0 || 
                     selectedPrices.length > 0 || selectedLevels.length > 0;

  return (
    <div className="bg-card border-2 border-border rounded-lg p-6 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-display">Filtros</h3>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-[#FFD700] hover:underline"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Filtro de Calificación */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Star className="w-4 h-4 text-[#FFD700]" />
          <span className="font-medium">Calificación</span>
        </div>
        <div className="space-y-2">
          {filterOptions.ratings.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${option.value}`}
                checked={selectedRatings.includes(option.value)}
                onCheckedChange={() => onRatingChange(option.value)}
                className="border-[#FFD700] data-[state=checked]:bg-[#FFD700] data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`rating-${option.value}`}
                className="text-sm cursor-pointer flex items-center gap-1"
              >
                <span className="text-[#FFD700]">★</span>
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro de Duración */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 text-[#FFD700]" />
          <span className="font-medium">Duración</span>
        </div>
        <div className="space-y-2">
          {filterOptions.durations.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`duration-${option.value}`}
                checked={selectedDurations.includes(option.value)}
                onCheckedChange={() => onDurationChange(option.value)}
                className="border-[#FFD700] data-[state=checked]:bg-[#FFD700] data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`duration-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro de Precio */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign className="w-4 h-4 text-[#FFD700]" />
          <span className="font-medium">Precio</span>
        </div>
        <div className="space-y-2">
          {filterOptions.prices.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`price-${option.value}`}
                checked={selectedPrices.includes(option.value)}
                onCheckedChange={() => onPriceChange(option.value)}
                className="border-[#FFD700] data-[state=checked]:bg-[#FFD700] data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`price-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro de Nivel */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BarChart className="w-4 h-4 text-[#FFD700]" />
          <span className="font-medium">Nivel</span>
        </div>
        <div className="space-y-2">
          {filterOptions.levels.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`level-${option.value}`}
                checked={selectedLevels.includes(option.value)}
                onCheckedChange={() => onLevelChange(option.value)}
                className="border-[#FFD700] data-[state=checked]:bg-[#FFD700] data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`level-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
