/**
 * Ululato Premium - Página Principal
 * Diseño inspirador con conexión emocional y UX excepcional
 */
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  ChevronLeft, ChevronRight, Star, Users, Clock, Award, 
  Play, Sparkles, TrendingUp, Globe, Heart, ArrowRight,
  BookOpen, Zap, Target, Quote
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import WeavingAnimation from '@/components/WeavingAnimation';
import RecommendationsSection from '@/components/RecommendationEngine';
import { Button } from '@/components/ui/button';
import { courses, categories, testimonials, stats } from '@/data/mocks';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    id: 1,
    image: '/images/wayuu-hero-premium.png',
    badge: 'Destacado Cultural',
    badgeIcon: Globe,
    title: 'Descubre el Wayuunaiki',
    subtitle: 'Conecta con la sabiduría ancestral del pueblo Wayuu',
    description: 'Aprende el idioma de una de las culturas más fascinantes de América Latina',
    cta: 'Explorar Curso',
    link: '/course/7',
    accent: 'from-amber-500/20 to-orange-600/20',
  },
  {
    id: 2,
    image: '/images/hero-learning-premium.png',
    badge: 'Nuevo',
    badgeIcon: Sparkles,
    title: 'Transforma tu Futuro',
    subtitle: 'Aprende de los mejores expertos del mundo',
    description: 'Miles de cursos diseñados para impulsar tu carrera profesional',
    cta: 'Comenzar Ahora',
    link: '/',
    accent: 'from-blue-500/20 to-indigo-600/20',
  },
  {
    id: 3,
    image: '/images/hero-success-premium.png',
    badge: 'Inspiración',
    badgeIcon: Award,
    title: 'Tu Éxito Comienza Aquí',
    subtitle: 'Únete a millones de estudiantes exitosos',
    description: 'Certificaciones reconocidas que abren puertas en todo el mundo',
    cta: 'Ver Historias',
    link: '/',
    accent: 'from-purple-500/20 to-pink-600/20',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Filtrar cursos
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      if (selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings.map(r => parseFloat(r)));
        if (course.rating < minRating) return false;
      }
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
      if (selectedLevels.length > 0) {
        if (!selectedLevels.includes(course.level)) return false;
      }
      return true;
    });
  }, [selectedRatings, selectedDurations, selectedPrices, selectedLevels]);

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

  const wayuuCourse = courses.find(c => c.id === '7');
  const featuredCourses = courses.filter(c => c.isFeatured).slice(0, 4);
  const trendingCourses = courses.filter(c => c.isBestseller || c.isNew).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Carousel Premium */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hero-overlay" />
            <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].accent}`} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl space-y-6"
            >
              <div className="badge-premium">
                {(() => {
                  const Icon = heroSlides[currentSlide].badgeIcon;
                  return <Icon className="w-4 h-4" />;
                })()}
                {heroSlides[currentSlide].badge}
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight font-display">
                {heroSlides[currentSlide].title}
              </h1>
              
              <p className="text-2xl text-white/90 font-light">
                {heroSlides[currentSlide].subtitle}
              </p>
              
              <p className="text-lg text-white/70">
                {heroSlides[currentSlide].description}
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Link 
                  href={heroSlides[currentSlide].link}
                  className="btn-premium text-lg px-8 py-6 rounded-xl inline-flex items-center justify-center gap-2"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-2 border-white/30 text-white hover:bg-white/10"
                >
                  <Play className="w-5 h-5 mr-2" fill="currentColor" />
                  Ver Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-[#FFD700]' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stat-card"
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Wayuu Course - Premium Spotlight */}
      {wayuuCourse && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/30 to-transparent" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <div className="badge-premium">
                  <Globe className="w-4 h-4" />
                  Cultura Indígena
                </div>
                <h2 className="text-5xl font-bold font-display gradient-text">
                  Aprende Wayuunaiki
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Sumérgete en la riqueza cultural del pueblo Wayuu de La Guajira, Colombia. 
                  Aprende su idioma ancestral, comprende su cosmovisión y conecta con una de 
                  las tradiciones más vivas de América Latina.
                </p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#FFD700]" fill="currentColor" />
                    <span className="font-bold">{wayuuCourse.rating}</span>
                    <span className="text-muted-foreground">({wayuuCourse.reviewCount} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#FFD700]" />
                    <span>{wayuuCourse.studentCount.toLocaleString()} estudiantes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#FFD700]" />
                    <span>{wayuuCourse.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <Link 
                    href={`/course/${wayuuCourse.id}`}
                    className="btn-premium text-lg px-8 py-6 rounded-xl inline-flex items-center justify-center gap-2"
                  >
                    Comenzar Aprendizaje
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#FFD700]">${wayuuCourse.price}</div>
                    <div className="text-sm text-muted-foreground line-through">${wayuuCourse.originalPrice}</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="/images/wayuu-course-thumb-premium.png"
                    alt="Curso Wayuunaiki"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button className="absolute inset-0 flex items-center justify-center group">
                    <div className="w-20 h-20 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform animate-pulse-glow">
                      <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                    </div>
                  </button>
                </motion.div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-3xl" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#003366]/40 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-display mb-4">¿Por qué elegir Ululato?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Más que una plataforma de cursos, somos tu compañero en el camino hacia el éxito
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Contenido de Calidad',
                description: 'Cursos creados por expertos reconocidos mundialmente, con metodologías probadas y actualizaciones constantes.',
              },
              {
                icon: Zap,
                title: 'Aprendizaje Flexible',
                description: 'Aprende a tu ritmo, desde cualquier dispositivo. Acceso de por vida a todos tus cursos.',
              },
              {
                icon: Target,
                title: 'Resultados Reales',
                description: 'El 87% de nuestros estudiantes reportan mejoras significativas en su carrera dentro de 6 meses.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-[#FFD700]/30 transition-all card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-[#FFD700]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#FFD700]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider">Tendencia</span>
              </div>
              <h2 className="text-4xl font-bold font-display">Cursos Más Populares</h2>
            </div>
            <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10">
              Ver Todos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <RecommendationsSection />

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-[#003366]/20 to-transparent">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-display mb-4">Historias de Éxito</h2>
            <p className="text-xl text-muted-foreground">
              Lo que dicen nuestros estudiantes sobre su experiencia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="testimonial-card"
              >
                <p className="text-lg mb-6 pt-8 text-white/90 leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-[#FFD700]"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Premium Redesign */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#003366]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-sm font-medium mb-6"
            >
              <Target className="w-4 h-4" />
              Encuentra tu camino
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6">
              Explora por{' '}
              <span className="relative">
                <span className="relative z-10 gradient-text">Categoría</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada categoría es un universo de posibilidades. Elige la tuya y comienza tu transformación.
            </p>
          </motion.div>

          {/* Categories Grid - Premium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/categoria/${category.slug}`} className="block h-full">
                  <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-card via-card to-card/50 border-2 border-border hover:border-[#FFD700] transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#FFD700]/10">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 via-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:via-[#FFD700]/10 group-hover:to-[#FFD700]/5 transition-all duration-500" />
                    
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 border border-[#FFD700]/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <span className="text-4xl">{category.icon}</span>
                      </div>
                      {/* Floating particles */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FFD700]/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {category.slug === 'desarrollo' && 'Domina el código y construye el futuro digital'}
                        {category.slug === 'negocios' && 'Lidera con visión y estrategia empresarial'}
                        {category.slug === 'diseno' && 'Crea experiencias visuales memorables'}
                        {category.slug === 'marketing' && 'Conecta marcas con audiencias globales'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#FFD700]">
                          {category.courseCount} cursos
                        </span>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Second Row - Smaller Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {categories.slice(4).map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/categoria/${category.slug}`} className="block">
                  <div className="relative p-6 rounded-2xl bg-card border-2 border-border hover:border-[#FFD700] transition-all duration-500 overflow-hidden group-hover:shadow-xl group-hover:shadow-[#FFD700]/10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 border border-[#FFD700]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">{category.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold group-hover:text-[#FFD700] transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.courseCount} cursos disponibles
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/categorias" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] font-medium hover:bg-[#FFD700]/20 transition-colors">
              Ver todas las categorías
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* All Courses with Filters */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold font-display mb-4">Todos los Cursos</h2>
            <p className="text-xl text-muted-foreground">
              Descubre nuestra colección completa de cursos
            </p>
          </motion.div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
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

            {/* Courses Grid */}
            <div className="flex-1">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Animation Section - El tejido que nos une */}
      <section className="py-0 relative overflow-hidden bg-gradient-to-b from-[#001a33] to-[#003366]">
        <WeavingAnimation height="600px" />
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/60 text-lg">
            Una experiencia de aprendizaje que conecta culturas, personas y conocimiento
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-[#001a33]" />
            <div className="absolute inset-0 bg-[url('/images/hero-success-premium.png')] bg-cover bg-center opacity-20" />
            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                ¿Listo para transformar tu vida?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Únete a más de 500,000 estudiantes que ya están construyendo el futuro que merecen
              </p>
              <Button
                size="lg"
                className="btn-premium text-lg px-10 py-6 rounded-xl"
              >
                Comenzar Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
