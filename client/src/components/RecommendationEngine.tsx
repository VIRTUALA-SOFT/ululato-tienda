/**
 * Sistema de Recomendaciones Personalizadas
 * Analiza intereses del usuario, historial de navegación y comportamiento
 * para sugerir cursos relevantes
 */
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, TrendingUp, Clock, Target, ChevronRight, 
  Brain, Lightbulb, Zap, RefreshCw, X, Check
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import CourseCard from './CourseCard';
import { courses, categories, Course } from '@/data/mocks';
import { cn } from '@/lib/utils';

// User interests storage key
const INTERESTS_KEY = 'ululato_user_interests';
const VIEWED_COURSES_KEY = 'ululato_viewed_courses';
const RECOMMENDATIONS_KEY = 'ululato_recommendations';

interface UserInterests {
  categories: string[];
  levels: string[];
  priceRange: 'free' | 'budget' | 'premium' | 'any';
  goals: string[];
  lastUpdated: number;
}

interface RecommendationReason {
  type: 'interest' | 'trending' | 'similar' | 'popular' | 'new' | 'completion';
  text: string;
}

interface RecommendedCourse extends Course {
  matchScore: number;
  reasons: RecommendationReason[];
}

// Default interests
const defaultInterests: UserInterests = {
  categories: [],
  levels: ['principiante', 'intermedio'],
  priceRange: 'any',
  goals: [],
  lastUpdated: Date.now(),
};

// Available goals
const availableGoals = [
  { id: 'career', label: 'Avanzar en mi carrera', icon: TrendingUp },
  { id: 'skills', label: 'Aprender nuevas habilidades', icon: Brain },
  { id: 'hobby', label: 'Explorar un hobby', icon: Lightbulb },
  { id: 'certification', label: 'Obtener certificaciones', icon: Target },
  { id: 'startup', label: 'Emprender un negocio', icon: Zap },
];

// Hook para gestionar intereses del usuario
export function useUserInterests() {
  const [interests, setInterests] = useState<UserInterests>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(INTERESTS_KEY);
      return saved ? JSON.parse(saved) : defaultInterests;
    }
    return defaultInterests;
  });

  const [viewedCourses, setViewedCourses] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(VIEWED_COURSES_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(INTERESTS_KEY, JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    localStorage.setItem(VIEWED_COURSES_KEY, JSON.stringify(viewedCourses));
  }, [viewedCourses]);

  const updateInterests = (newInterests: Partial<UserInterests>) => {
    setInterests(prev => ({
      ...prev,
      ...newInterests,
      lastUpdated: Date.now(),
    }));
  };

  const addViewedCourse = (courseId: string) => {
    setViewedCourses(prev => {
      if (prev.includes(courseId)) return prev;
      return [...prev.slice(-19), courseId]; // Keep last 20
    });
  };

  const hasSetInterests = interests.categories.length > 0 || interests.goals.length > 0;

  return {
    interests,
    viewedCourses,
    updateInterests,
    addViewedCourse,
    hasSetInterests,
  };
}

// Hook para generar recomendaciones
export function useRecommendations() {
  const { interests, viewedCourses, hasSetInterests } = useUserInterests();

  const recommendations = useMemo((): RecommendedCourse[] => {
    const scored: RecommendedCourse[] = courses.map(course => {
      let score = 0;
      const reasons: RecommendationReason[] = [];

      // Category match (high weight)
      if (interests.categories.includes(course.category)) {
        score += 30;
        const categoryName = categories.find(c => c.slug === course.category)?.name || course.category;
        reasons.push({
          type: 'interest',
          text: `Basado en tu interés en ${categoryName}`,
        });
      }

      // Level match
      if (interests.levels.includes(course.level)) {
        score += 10;
      }

      // Price range match
      if (interests.priceRange === 'free' && course.price === 0) {
        score += 15;
      } else if (interests.priceRange === 'budget' && course.price < 50) {
        score += 10;
      } else if (interests.priceRange === 'premium' && course.price >= 50) {
        score += 10;
      }

      // Trending/Popular bonus
      if (course.studentCount > 50000) {
        score += 15;
        reasons.push({
          type: 'popular',
          text: 'Popular entre estudiantes',
        });
      }

      // High rating bonus
      if (course.rating >= 4.7) {
        score += 10;
        reasons.push({
          type: 'trending',
          text: 'Altamente valorado',
        });
      }

      // Bestseller bonus
      if (course.isBestseller) {
        score += 20;
        if (!reasons.find(r => r.type === 'popular')) {
          reasons.push({
            type: 'popular',
            text: 'Curso más vendido',
          });
        }
      }

      // New course bonus
      if (course.isNew) {
        score += 5;
        reasons.push({
          type: 'new',
          text: 'Recién lanzado',
        });
      }

      // Similar to viewed courses
      const viewedCategories = viewedCourses
        .map(id => courses.find(c => c.id === id)?.category)
        .filter(Boolean);
      
      if (viewedCategories.includes(course.category) && !viewedCourses.includes(course.id)) {
        score += 20;
        if (!reasons.find(r => r.type === 'interest')) {
          reasons.push({
            type: 'similar',
            text: 'Similar a cursos que has visto',
          });
        }
      }

      // Penalize already viewed
      if (viewedCourses.includes(course.id)) {
        score -= 50;
      }

      // Add some randomness for variety
      score += Math.random() * 5;

      return {
        ...course,
        matchScore: Math.max(0, score),
        reasons: reasons.slice(0, 2), // Max 2 reasons
      };
    });

    // Sort by score and return top results
    return scored
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 12);
  }, [interests, viewedCourses]);

  return {
    recommendations,
    hasSetInterests,
  };
}

// Componente de configuración de intereses
export function InterestsSetup({ onComplete }: { onComplete?: () => void }) {
  const { interests, updateInterests } = useUserInterests();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(interests.categories);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(interests.goals);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(interests.levels);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleComplete = () => {
    updateInterests({
      categories: selectedCategories,
      goals: selectedGoals,
      levels: selectedLevels,
    });
    onComplete?.();
  };

  const progress = (step / 3) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border-2 border-border rounded-2xl p-8 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 border border-[#FFD700]/30 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-[#FFD700]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Personaliza tu experiencia</h2>
        <p className="text-muted-foreground">
          Cuéntanos sobre ti para recomendarte los mejores cursos
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Paso {step} de 3</span>
          <span className="text-[#FFD700]">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-lg font-semibold mb-4">¿Qué temas te interesan?</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => toggleCategory(category.slug)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    selectedCategories.includes(category.slug)
                      ? "border-[#FFD700] bg-[#FFD700]/10"
                      : "border-border hover:border-[#FFD700]/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {category.courseCount} cursos
                      </div>
                    </div>
                    {selectedCategories.includes(category.slug) && (
                      <Check className="w-5 h-5 text-[#FFD700] ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-lg font-semibold mb-4">¿Cuáles son tus objetivos?</h3>
            <div className="space-y-3">
              {availableGoals.map(goal => {
                const Icon = goal.icon;
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4",
                      selectedGoals.includes(goal.id)
                        ? "border-[#FFD700] bg-[#FFD700]/10"
                        : "border-border hover:border-[#FFD700]/50"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      selectedGoals.includes(goal.id)
                        ? "bg-[#FFD700]/20"
                        : "bg-muted"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        selectedGoals.includes(goal.id) ? "text-[#FFD700]" : "text-muted-foreground"
                      )} />
                    </div>
                    <span className="font-medium">{goal.label}</span>
                    {selectedGoals.includes(goal.id) && (
                      <Check className="w-5 h-5 text-[#FFD700] ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-lg font-semibold mb-4">¿Cuál es tu nivel de experiencia?</h3>
            <div className="space-y-3">
              {[
                { id: 'principiante', label: 'Principiante', desc: 'Estoy comenzando desde cero' },
                { id: 'intermedio', label: 'Intermedio', desc: 'Tengo conocimientos básicos' },
                { id: 'avanzado', label: 'Avanzado', desc: 'Busco profundizar mis conocimientos' },
              ].map(level => (
                <button
                  key={level.id}
                  onClick={() => toggleLevel(level.id)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all",
                    selectedLevels.includes(level.id)
                      ? "border-[#FFD700] bg-[#FFD700]/10"
                      : "border-border hover:border-[#FFD700]/50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-sm text-muted-foreground">{level.desc}</div>
                    </div>
                    {selectedLevels.includes(level.id) && (
                      <Check className="w-5 h-5 text-[#FFD700]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
        >
          Anterior
        </Button>
        {step < 3 ? (
          <Button
            onClick={() => setStep(s => s + 1)}
            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
          >
            Siguiente
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ver mis recomendaciones
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// Componente de sección de recomendaciones
export function RecommendationsSection() {
  const { recommendations, hasSetInterests } = useRecommendations();
  const [showSetup, setShowSetup] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(k => k + 1);
  };

  if (showSetup) {
    return (
      <section className="py-16">
        <div className="container">
          <InterestsSetup onComplete={() => setShowSetup(false)} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#003366]/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 border border-[#FFD700]/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FFD700]" />
              </div>
              <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30">
                Personalizado para ti
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">
              Recomendaciones para ti
            </h2>
            <p className="text-muted-foreground">
              {hasSetInterests
                ? 'Cursos seleccionados según tus intereses y objetivos'
                : 'Cursos populares que podrían interesarte'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSetup(true)}
              className="gap-2"
            >
              <Target className="w-4 h-4" />
              {hasSetInterests ? 'Editar intereses' : 'Personalizar'}
            </Button>
          </div>
        </motion.div>

        {/* Recommendations Grid */}
        <div key={refreshKey} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendations.slice(0, 8).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Match Reasons */}
              {course.reasons.length > 0 && (
                <div className="absolute -top-3 left-4 right-4 z-10 flex gap-2 flex-wrap">
                  {course.reasons.slice(0, 1).map((reason, i) => (
                    <Badge
                      key={i}
                      className={cn(
                        "text-xs",
                        reason.type === 'interest' && "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30",
                        reason.type === 'popular' && "bg-blue-500/20 text-blue-400 border-blue-500/30",
                        reason.type === 'trending' && "bg-green-500/20 text-green-400 border-green-500/30",
                        reason.type === 'similar' && "bg-purple-500/20 text-purple-400 border-purple-500/30",
                        reason.type === 'new' && "bg-[#DC143C]/20 text-[#DC143C] border-[#DC143C]/30"
                      )}
                    >
                      {reason.text}
                    </Badge>
                  ))}
                </div>
              )}
              <CourseCard course={course} className="pt-4" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {!hasSetInterests && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
              <Brain className="w-10 h-10 text-[#FFD700] mb-3" />
              <h3 className="text-lg font-semibold mb-2">
                ¿Quieres mejores recomendaciones?
              </h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-md">
                Cuéntanos sobre tus intereses y objetivos para personalizar tu experiencia de aprendizaje
              </p>
              <Button
                onClick={() => setShowSetup(true)}
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Personalizar ahora
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default RecommendationsSection;
