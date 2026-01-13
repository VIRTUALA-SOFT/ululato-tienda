/**
 * Ululato Premium - Página de Blog
 * Artículos y recursos educativos
 */
import { useState } from 'react';
import { Link } from 'wouter';
import { Calendar, Clock, User, Search, ArrowRight, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'El poder del aprendizaje continuo en la era digital',
    excerpt: 'Descubre cómo el aprendizaje constante puede transformar tu carrera y abrir nuevas oportunidades en un mundo en constante cambio.',
    content: '',
    author: {
      name: 'Dra. Sara Martínez',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop',
      role: 'Directora de Educación',
    },
    category: 'Desarrollo Personal',
    tags: ['aprendizaje', 'carrera', 'productividad'],
    image: '/images/hero-learning-premium.png',
    readTime: '8 min',
    publishedAt: '2026-01-10',
    featured: true,
  },
  {
    id: '2',
    title: 'Wayuunaiki: Preservando la sabiduría ancestral',
    excerpt: 'Un viaje al corazón de La Guajira para entender cómo el idioma Wayuu conecta generaciones y preserva una cultura milenaria.',
    content: '',
    author: {
      name: 'María Pushaina',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop',
      role: 'Instructora de Wayuunaiki',
    },
    category: 'Cultura',
    tags: ['wayuu', 'idiomas', 'cultura', 'colombia'],
    image: '/images/wayuu-hero-premium.png',
    readTime: '12 min',
    publishedAt: '2026-01-08',
    featured: true,
  },
  {
    id: '3',
    title: '5 tendencias de diseño UI/UX para 2026',
    excerpt: 'Las últimas tendencias en diseño de interfaces que están definiendo el futuro de la experiencia de usuario.',
    content: '',
    author: {
      name: 'Alejandro Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      role: 'Diseñador Senior',
    },
    category: 'Diseño',
    tags: ['ui/ux', 'diseño', 'tendencias'],
    image: '/images/course-design-premium.png',
    readTime: '6 min',
    publishedAt: '2026-01-05',
    featured: false,
  },
  {
    id: '4',
    title: 'Machine Learning: De la teoría a la práctica',
    excerpt: 'Guía práctica para implementar tu primer modelo de machine learning sin morir en el intento.',
    content: '',
    author: {
      name: 'Dr. Miguel Torres',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      role: 'Data Scientist',
    },
    category: 'Tecnología',
    tags: ['machine learning', 'python', 'ia'],
    image: '/images/course-datascience-premium.png',
    readTime: '15 min',
    publishedAt: '2026-01-03',
    featured: false,
  },
  {
    id: '5',
    title: 'Estrategias de marketing digital que realmente funcionan',
    excerpt: 'Casos de éxito y estrategias probadas para hacer crecer tu negocio en el mundo digital.',
    content: '',
    author: {
      name: 'Laura Méndez',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop',
      role: 'Marketing Manager',
    },
    category: 'Marketing',
    tags: ['marketing', 'digital', 'estrategia'],
    image: '/images/course-marketing-premium.png',
    readTime: '10 min',
    publishedAt: '2026-01-01',
    featured: false,
  },
];

const categories = ['Todos', 'Desarrollo Personal', 'Cultura', 'Diseño', 'Tecnología', 'Marketing', 'Negocios'];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#003366]/20 to-transparent py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold font-display mb-4">
              Blog de <span className="text-[#FFD700]">Ululato</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Artículos, guías y recursos para impulsar tu aprendizaje y desarrollo profesional.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 input-premium"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all",
                    selectedCategory === cat
                      ? "bg-[#FFD700] text-black"
                      : "bg-card border border-border hover:border-[#FFD700]/50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container py-12">
          <h2 className="text-2xl font-bold font-display mb-8">Destacados</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-[#FFD700]/50 transition-all"
              >
                <Link href={`/blog/${post.id}`}>
                  <a>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="text-2xl font-bold group-hover:text-[#FFD700] transition-colors mb-3">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-sm">{post.author.name}</p>
                            <p className="text-xs text-muted-foreground">{post.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold font-display mb-8">Todos los Artículos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all"
            >
              <Link href={`/blog/${post.id}`}>
                <a>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold group-hover:text-[#FFD700] transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-[#003366] to-[#001a33] rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-display text-white mb-4">
            Suscríbete a nuestro newsletter
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Recibe los mejores artículos, recursos y ofertas exclusivas directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="tu@correo.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button className="btn-premium">
              Suscribirse
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
