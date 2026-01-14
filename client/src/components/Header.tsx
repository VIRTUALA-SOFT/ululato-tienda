/**
 * Neo-Brutalism Dark Edition: Header sticky con búsqueda, categorías, carrito, notificaciones
 * Fondo azul marino con acentos dorados en elementos interactivos
 * Optimizado para móviles, tablets y desktop
 */
import { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, BookOpen, Code, Briefcase, TrendingUp, Palette, Globe, X, ArrowLeft, Menu } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2 sm:gap-4">
          
          {/* Mobile: Menu hamburguesa */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:text-[#FFD700] hover:bg-white/10 shrink-0">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] bg-[#003366] border-r-2 border-[#FFD700] p-0">
              <div className="flex flex-col h-full">
                {/* Logo en menú móvil */}
                <div className="p-4 border-b border-white/10">
                  <Logo size="sm" />
                </div>
                
                {/* Búsqueda móvil */}
                <div className="p-4 border-b border-white/10">
                  <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      type="search"
                      placeholder="Buscar cursos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 h-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </form>
                </div>
                
                {/* Navegación móvil */}
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Categorías</p>
                    {categoriesNav.map((category) => (
                      <Link 
                        key={category.name} 
                        href={category.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-white/10 transition-colors"
                      >
                        <category.icon className="w-5 h-5 text-[#FFD700]" />
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/10 space-y-1">
                    <Link 
                      href="/mi-aprendizaje"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-[#FFD700]" />
                      <span>Mi Aprendizaje</span>
                    </Link>
                    <Link 
                      href="/perfil"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                      <img src={currentUser.avatar} alt="" className="w-5 h-5 rounded-full" />
                      <span>Mi Perfil</span>
                    </Link>
                  </div>
                </nav>
                
                {/* Link Volviendo al Origen en móvil */}
                <div className="p-4 border-t border-white/10">
                  <a 
                    href="https://prototipo.ululato.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-[#FFD700] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Volviendo al Origen</span>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo - responsive */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 shrink-0">
            {/* Link Volviendo al Origen - Solo visible en desktop */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://prototipo.ululato.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:flex group items-center gap-2 px-3 py-2 rounded-full border border-transparent hover:border-[#FFD700] transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-[#FFD700] transition-colors" />
                  <span 
                    className="text-xs font-light tracking-[0.15em] text-white/70 group-hover:text-[#FFD700] uppercase transition-colors"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    VOLVIENDO AL ORIGEN
                  </span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-card border-2 border-[#FFD700]">
                <p>Ir al sitio principal</p>
              </TooltipContent>
            </Tooltip>

            {/* Logo - tamaño responsive */}
            <Link href="/" className="flex items-center">
              <Logo size="sm" className="lg:hidden" />
              <span className="hidden lg:block"><Logo size="md" /></span>
            </Link>
          </div>

          {/* Barra de Búsqueda - Solo desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl relative mx-4">
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
                  className="w-full pl-12 pr-10 h-11 bg-background/90 border-2 border-border focus:border-[#FFD700] transition-colors"
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

          {/* Navegación - responsive */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {/* Dropdown de Categorías - Solo tablet y desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden md:flex text-white hover:text-[#FFD700] hover:bg-white/10 text-sm px-2 lg:px-3">
                  <span className="hidden lg:inline">Categorías</span>
                  <span className="lg:hidden">Cat.</span>
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

            {/* Mi Aprendizaje - Solo desktop */}
            <Link href="/mi-aprendizaje">
              <Button variant="ghost" className="hidden xl:flex text-white hover:text-[#FFD700] hover:bg-white/10 text-sm">
                Mi Aprendizaje
              </Button>
            </Link>

            {/* Carrito */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/carrito">
                  <Button variant="ghost" size="icon" className="relative text-white hover:text-[#FFD700] hover:bg-white/10 w-9 h-9 sm:w-10 sm:h-10">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 bg-[#DC143C] text-white text-[10px] sm:text-xs border-2 border-[#003366]">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-card border-2 border-[#FFD700]">
                <p>Carrito {cart.length > 0 && `(${cart.length})`}</p>
              </TooltipContent>
            </Tooltip>

            {/* Selector de Idioma - Solo tablet y desktop */}
            <div className="hidden sm:block">
              <LanguageSelector className="text-white" />
            </div>

            {/* Toggle de Tema */}
            <ThemeToggle />

            {/* Notificaciones */}
            <NotificationButton />

            {/* Menú de Usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10 w-9 h-9 sm:w-10 sm:h-10 p-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#FFD700] object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-2 border-border">
                <div className="p-3 border-b border-border">
                  <p className="font-semibold text-sm">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
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
