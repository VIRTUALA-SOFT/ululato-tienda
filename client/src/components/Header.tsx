/**
 * Neo-Brutalism Dark Edition: Header sticky con búsqueda, categorías, carrito, notificaciones
 * Fondo azul marino con acentos dorados en elementos interactivos
 */
import { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, BookOpen, Code, Briefcase, TrendingUp, Palette, Globe, X, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import Logo from './Logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';
import { useApp } from '@/contexts/AppContext';
import { currentUser, courses } from '@/data/mocks';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { NotificationButton } from './NotificationSystem';

const categoriesNav = [
  { name: 'Desarrollo', icon: Code, href: '/categoria/desarrollo' },
  { name: 'Negocios', icon: Briefcase, href: '/categoria/negocios' },
  { name: 'Diseño', icon: Palette, href: '/categoria/diseno' },
  { name: 'Marketing', icon: TrendingUp, href: '/categoria/marketing' },
  { name: 'Ciencia de Datos', icon: BookOpen, href: '/categoria/ciencia-datos' },
  { name: 'Idiomas', icon: Globe, href: '/categoria/idiomas' },
];

export default function Header() {
  const { cart } = useApp();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Búsqueda en tiempo real
  const searchResults = searchQuery.length > 1
    ? courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/buscar?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#003366] border-b-4 border-[#FFD700] shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Link "Volviendo al Origen" + Logo */}
          <div className="flex items-center gap-4">
            {/* Link Volviendo al Origen - Responsive: solo flecha en móviles */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://prototipo.ululato.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-2 sm:px-4 py-2 rounded-full border border-transparent hover:border-[#FFD700] transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-[#FFD700] transition-colors" />
                  <span 
                    className="hidden sm:inline text-xs font-light tracking-[0.15em] text-white/70 group-hover:text-[#FFD700] uppercase transition-colors"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    VOLVIENDO AL ORIGEN
                  </span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="sm:hidden bg-card border-2 border-[#FFD700]">
                <p>Volviendo al Origen</p>
              </TooltipContent>
            </Tooltip>

            {/* Logo */}
            <Logo />
          </div>

          {/* Barra de Búsqueda */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar cursos..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.length > 1);
                  }}
                  onFocus={() => searchQuery.length > 1 && setShowSearchResults(true)}
                  className="w-full pl-12 pr-10 h-12 bg-background/90 border-2 border-border focus:border-[#FFD700] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchResults(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Resultados de búsqueda */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-border rounded-lg shadow-xl overflow-hidden z-50">
                {searchResults.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 p-4 hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => {
                      setShowSearchResults(false);
                      setLocation(`/course/${course.id}`);
                    }}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{course.title}</p>
                      <p className="text-sm text-muted-foreground">{course.instructor.name}</p>
                    </div>
                    <span className="text-[#FFD700] font-bold">${course.price}</span>
                  </div>
                ))}
                <div
                  className="block p-4 text-center text-[#FFD700] hover:bg-accent font-medium border-t border-border cursor-pointer"
                  onClick={() => {
                    setShowSearchResults(false);
                    setLocation(`/buscar?q=${encodeURIComponent(searchQuery)}`);
                  }}
                >
                  Ver todos los resultados
                </div>
              </div>
            )}
          </div>

          {/* Navegación */}
          <nav className="flex items-center gap-2">
            {/* Dropdown de Categorías */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-[#FFD700] hover:bg-white/10">
                  Categorías
                  <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-2 border-border">
                {categoriesNav.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href} className="flex items-center gap-3 w-full px-3 py-2 hover:bg-accent">
                      <category.icon className="w-5 h-5 text-[#FFD700]" />
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mi Aprendizaje */}
            <Link href="/mi-aprendizaje">
              <Button variant="ghost" className="hidden lg:flex text-white hover:text-[#FFD700] hover:bg-white/10">
                Mi Aprendizaje
              </Button>
            </Link>

            {/* Carrito */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/carrito">
                  <Button variant="ghost" size="icon" className="relative text-white hover:text-[#FFD700] hover:bg-white/10">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#DC143C] text-white text-xs border-2 border-[#003366]">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-card border-2 border-[#FFD700]">
                <p>Carrito de compras {cart.length > 0 && `(${cart.length} ${cart.length === 1 ? 'curso' : 'cursos'})`}</p>
              </TooltipContent>
            </Tooltip>

            {/* Selector de Idioma */}
            <LanguageSelector className="text-white" />

            {/* Toggle de Tema */}
            <ThemeToggle />

            {/* Notificaciones */}
            <NotificationButton />

            {/* Menú de Usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full border-2 border-[#FFD700] object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-2 border-border">
                <div className="p-3 border-b border-border">
                  <p className="font-semibold">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="w-full px-3 py-2">Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/mi-aprendizaje" className="w-full px-3 py-2">Mi Aprendizaje</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/instructor/dashboard" className="w-full px-3 py-2">Panel de Instructor</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-destructive">
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
