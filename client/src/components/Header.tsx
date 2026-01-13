/**
 * Neo-Brutalism Dark Edition: Sticky header with search, categories, cart, notifications
 * Navy blue background with golden accents on interactive elements
 */
import { Search, ShoppingCart, Bell, User, ChevronDown, BookOpen, Code, Briefcase, TrendingUp, Palette } from 'lucide-react';
import { Link } from 'wouter';
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
import { useApp } from '@/contexts/AppContext';
import { currentUser } from '@/data/mocks';

const categories = [
  { name: 'Development', icon: Code, href: '/category/development' },
  { name: 'Business', icon: Briefcase, href: '/category/business' },
  { name: 'Design', icon: Palette, href: '/category/design' },
  { name: 'Marketing', icon: TrendingUp, href: '/category/marketing' },
  { name: 'Data Science', icon: BookOpen, href: '/category/data-science' },
];

export default function Header() {
  const { cart } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-[#003366] border-b-4 border-[#FFD700] shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for courses..."
                className="w-full pl-12 pr-4 h-12 bg-background/90 border-2 border-border focus:border-[#FFD700] transition-colors"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-[#FFD700] hover:bg-white/10">
                  Categories
                  <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-2 border-border">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href}>
                      <a className="flex items-center gap-3 w-full px-3 py-2 hover:bg-accent">
                        <category.icon className="w-5 h-5 text-[#FFD700]" />
                        <span>{category.name}</span>
                      </a>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* My Learning */}
            <Link href="/my-learning">
              <Button variant="ghost" className="hidden lg:flex text-white hover:text-[#FFD700] hover:bg-white/10">
                My Learning
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-white hover:text-[#FFD700] hover:bg-white/10">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#DC143C] text-white text-xs border-2 border-[#003366]">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:text-[#FFD700] hover:bg-white/10">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#DC143C] text-white text-xs border-2 border-[#003366]">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card border-2 border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-display">Notifications</h3>
                </div>
                <DropdownMenuItem className="p-4 hover:bg-accent">
                  <div>
                    <p className="font-medium">New course available!</p>
                    <p className="text-sm text-muted-foreground">Check out "Advanced React Patterns"</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-accent">
                  <div>
                    <p className="font-medium">Course update</p>
                    <p className="text-sm text-muted-foreground">New lectures added to Business Strategy</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
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
                  <Link href="/my-learning">
                    <a className="w-full px-3 py-2">My Learning</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/instructor/dashboard">
                    <a className="w-full px-3 py-2">Instructor Dashboard</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
