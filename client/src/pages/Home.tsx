/**
 * Neo-Brutalism Dark Edition: Home page with hero carousel and course sections
 * Features dramatic gradients, asymmetric layouts, and golden accents
 */
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles, Award } from 'lucide-react';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/mocks';
import { cn } from '@/lib/utils';

const heroSlides = [
  {
    id: 1,
    image: '/images/hero-banner-1.png',
    title: 'Master Business Strategy',
    subtitle: 'Learn from industry experts and transform your career',
    cta: 'Explore Courses',
    href: '/course/1',
  },
  {
    id: 2,
    image: '/images/hero-banner-2.png',
    title: 'Level Up Your Skills',
    subtitle: 'Join 500,000+ students learning on Ululato',
    cta: 'Start Learning',
    href: '/',
  },
  {
    id: 3,
    image: '/images/hero-banner-3.png',
    title: 'Your Future Starts Here',
    subtitle: 'Premium courses designed for real-world success',
    cta: 'Browse Categories',
    href: '/',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const bestsellerCourses = courses.filter(c => c.isBestseller);
  const newCourses = courses.filter(c => c.isNew);
  const recommendedCourses = courses.slice(0, 4);

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
                  <a href={slide.href}>{slide.cta}</a>
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
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

        {/* Indicators */}
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

      {/* Main Content */}
      <main className="container py-16 space-y-20">
        {/* Recommended Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#FFD700]" />
            <h2 className="text-4xl font-bold text-display">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Bestsellers Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#FFD700]" />
            <h2 className="text-4xl font-bold text-display">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellerCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* New & Hot Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[#DC143C]" />
            <h2 className="text-4xl font-bold text-display">New & Hot</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-2xl border-4 border-[#FFD700] bg-gradient-to-br from-[#003366] to-[#001a33] p-12 text-center">
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl font-bold text-white text-display">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Join thousands of students learning from world-class instructors
            </p>
            <Button
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg px-10 py-6 border-4 border-black glow-gold-hover"
            >
              Start Learning Today
            </Button>
          </div>
          <div className="absolute inset-0 bg-[url('/images/hero-banner-3.png')] opacity-10 bg-cover bg-center" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003366] border-t-4 border-[#FFD700] mt-20">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white text-display">Ululato</h3>
              <p className="text-gray-300 text-sm">
                Premium online learning platform for ambitious professionals
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#FFD700]">Development</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Business</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Design</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Marketing</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#FFD700]">Help Center</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#FFD700]">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Teach on Ululato</h4>
              <p className="text-sm text-gray-300">
                Share your knowledge and earn money
              </p>
              <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold">
                Become an Instructor
              </Button>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Ululato. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
