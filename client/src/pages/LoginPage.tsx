/**
 * Ululato Premium - Página de Inicio de Sesión
 * Diseño elegante con animación 3D de fondo
 */
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    
    // Simular autenticación
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('¡Bienvenido de vuelta!', {
      description: 'Has iniciado sesión exitosamente',
    });
    
    setIsLoading(false);
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 bg-background">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Logo */}
          <div className="mb-8">
            <Logo size="lg" />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-display mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 input-premium h-12"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Contraseña</label>
                <Link href="/recuperar-contrasena" className="text-sm text-[#FFD700] hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-11 input-premium h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Recordarme en este dispositivo
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-premium h-12 text-lg"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12" onClick={() => toast.info('Función próximamente')}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12" onClick={() => toast.info('Función próximamente')}>
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link href="/registro" className="text-[#FFD700] font-semibold hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#003366] to-[#001a33] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-5xl font-bold font-display text-white mb-6">
              El tejido que<br />
              <span className="text-[#FFD700]">nos une</span>
            </h2>
            <p className="text-xl text-white/70 max-w-md">
              Más de 500,000 estudiantes ya están aprendiendo en Ululato. 
              Únete a nuestra comunidad de aprendizaje.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-[#FFD700]">500K+</div>
                <div className="text-white/60">Estudiantes</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#FFD700]">1,200+</div>
                <div className="text-white/60">Cursos</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#FFD700]">98%</div>
                <div className="text-white/60">Satisfacción</div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-md border border-white/10"
          >
            <p className="text-white/80 italic">
              "Ululato cambió mi carrera. Los cursos son de alta calidad y la comunidad 
              es increíblemente solidaria."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
                alt="Testimonial"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-white font-medium">María González</div>
                <div className="text-white/60 text-sm">Desarrolladora Full-Stack</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Woven Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="weave" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 5 L10 5 M5 0 L5 10" stroke="#FFD700" strokeWidth="0.5" fill="none"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#weave)"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
