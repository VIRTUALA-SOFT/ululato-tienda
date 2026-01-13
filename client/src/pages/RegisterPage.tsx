/**
 * Ululato Premium - Página de Registro
 * Diseño elegante con pasos de registro
 */
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, 
  User, CheckCircle2, Circle, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Logo from '@/components/Logo';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const interests = [
  'Desarrollo Web',
  'Ciencia de Datos',
  'Diseño UI/UX',
  'Marketing Digital',
  'Negocios',
  'Finanzas',
  'Idiomas',
  'Fotografía',
  'Música',
  'Desarrollo Personal',
];

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step 1 - Account
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Step 2 - Profile
  const [role, setRole] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // Step 3 - Terms
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(true);

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthLabels = ['', 'Débil', 'Regular', 'Buena', 'Excelente'];
  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !password) {
        toast.error('Por favor completa todos los campos');
        return;
      }
      if (password.length < 8) {
        toast.error('La contraseña debe tener al menos 8 caracteres');
        return;
      }
    }
    if (step === 2) {
      if (!role) {
        toast.error('Por favor selecciona tu rol');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!acceptTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);
    
    // Simular registro
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('¡Cuenta creada exitosamente!', {
      description: 'Bienvenido a Ululato',
    });
    
    setIsLoading(false);
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#003366] to-[#001a33] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#DC143C]/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-[#FFD700]" />
              <span className="text-white/60 text-lg">Comienza tu viaje</span>
            </div>
            
            <h2 className="text-5xl font-bold font-display text-white mb-6">
              Aprende sin<br />
              <span className="text-[#FFD700]">límites</span>
            </h2>
            <p className="text-xl text-white/70 max-w-md">
              Únete a miles de estudiantes que están transformando sus vidas 
              a través del aprendizaje continuo.
            </p>

            {/* Benefits */}
            <div className="mt-12 space-y-4">
              {[
                'Acceso a más de 1,200 cursos',
                'Certificados reconocidos',
                'Comunidad de apoyo',
                'Aprende a tu ritmo',
              ].map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-white/80">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-16 right-16"
          >
            <img
              src="/images/wayuu-hero-premium.png"
              alt="Decorative"
              className="w-64 h-64 object-cover rounded-2xl border-4 border-[#FFD700]/30 shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Woven Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="weave2" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1" fill="#FFD700"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#weave2)"/>
          </svg>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 xl:px-24 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Logo */}
          <Link href="/">
            <a className="inline-block mb-8">
              <Logo />
            </a>
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= s 
                    ? "bg-[#FFD700] text-black" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={cn(
                    "w-12 h-1 mx-2 rounded transition-colors",
                    step > s ? "bg-[#FFD700]" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold font-display mb-2">
                    Crea tu cuenta
                  </h1>
                  <p className="text-muted-foreground">
                    Paso 1 de 3: Información de la cuenta
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-11 input-premium h-12"
                    />
                  </div>
                </div>

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
                  <label className="text-sm font-medium">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 8 caracteres"
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
                  
                  {/* Password Strength */}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              "h-1 flex-1 rounded transition-colors",
                              passwordStrength() >= level 
                                ? strengthColors[passwordStrength()] 
                                : "bg-muted"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Fortaleza: {strengthLabels[passwordStrength()]}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleNextStep}
                  className="w-full btn-premium h-12 text-lg"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold font-display mb-2">
                    Cuéntanos sobre ti
                  </h1>
                  <p className="text-muted-foreground">
                    Paso 2 de 3: Personaliza tu experiencia
                  </p>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">¿Cuál es tu rol principal?</label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="input-premium h-12">
                      <SelectValue placeholder="Selecciona tu rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Estudiante</SelectItem>
                      <SelectItem value="professional">Profesional</SelectItem>
                      <SelectItem value="entrepreneur">Emprendedor</SelectItem>
                      <SelectItem value="teacher">Docente</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interests */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    ¿Qué te gustaría aprender? (Selecciona al menos 1)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm transition-all",
                          selectedInterests.includes(interest)
                            ? "bg-[#FFD700] text-black"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12"
                  >
                    Atrás
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    className="flex-1 btn-premium h-12"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold font-display mb-2">
                    Casi listo
                  </h1>
                  <p className="text-muted-foreground">
                    Paso 3 de 3: Revisa y confirma
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nombre:</span>
                    <span className="font-medium">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Correo:</span>
                    <span className="font-medium">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rol:</span>
                    <span className="font-medium capitalize">{role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Intereses:</span>
                    <span className="font-medium">{selectedInterests.length} seleccionados</span>
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      Acepto los{' '}
                      <Link href="/terminos">
                        <a className="text-[#FFD700] hover:underline">Términos de Servicio</a>
                      </Link>
                      {' '}y la{' '}
                      <Link href="/privacidad">
                        <a className="text-[#FFD700] hover:underline">Política de Privacidad</a>
                      </Link>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="newsletter"
                      checked={acceptNewsletter}
                      onCheckedChange={(checked) => setAcceptNewsletter(checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                      Quiero recibir novedades, ofertas y recomendaciones personalizadas
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 h-12"
                  >
                    Atrás
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !acceptTerms}
                    className="flex-1 btn-premium h-12"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Crear Cuenta
                        <Sparkles className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Link */}
          <p className="mt-8 text-center text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login">
              <a className="text-[#FFD700] font-semibold hover:underline">
                Inicia sesión
              </a>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
