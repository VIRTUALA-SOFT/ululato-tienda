/**
 * Ululato Premium - Páginas del Footer
 * Eventos, Embajadores, Ayuda, Contacto, Términos, Privacidad, etc.
 */
import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Calendar, MapPin, Users, Star, Award, Mail, Phone, 
  MessageSquare, Search, ChevronRight, Globe, BookOpen,
  Shield, FileText, HelpCircle, Send, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { courses, instructors, categories } from '@/data/mocks';

// ============ EVENTOS ============
export function EventosPage() {
  const events = [
    {
      id: '1',
      title: 'Webinar: Introducción al Wayuunaiki',
      description: 'Descubre la riqueza del idioma Wayuu con María Pushaina',
      date: '2026-01-20',
      time: '18:00',
      type: 'online',
      attendees: 234,
      image: '/images/wayuu-hero-premium.png',
    },
    {
      id: '2',
      title: 'Taller de Diseño UI/UX',
      description: 'Aprende a crear interfaces increíbles desde cero',
      date: '2026-01-25',
      time: '15:00',
      type: 'online',
      attendees: 156,
      image: '/images/course-design-premium.png',
    },
    {
      id: '3',
      title: 'Conferencia de Data Science',
      description: 'Las últimas tendencias en ciencia de datos e IA',
      date: '2026-02-05',
      time: '10:00',
      type: 'presencial',
      location: 'Bogotá, Colombia',
      attendees: 89,
      image: '/images/course-datascience-premium.png',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <Calendar className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Eventos
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Webinars, talleres y conferencias para seguir aprendiendo
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border-2 border-border rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all"
              >
                <img src={event.image} alt={event.title} className="w-full aspect-video object-cover" />
                <div className="p-5">
                  <Badge className={event.type === 'online' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}>
                    {event.type === 'online' ? 'En línea' : 'Presencial'}
                  </Badge>
                  <h3 className="font-bold text-lg mt-3">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees} inscritos
                    </span>
                  </div>
                  <Button className="w-full mt-4 btn-premium" onClick={() => toast.success('¡Te has inscrito al evento!')}>
                    Inscribirse
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ EMBAJADORES ============
export function EmbajadoresPage() {
  const ambassadors = [
    { name: 'Carlos Mendoza', country: 'México', students: 1250, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
    { name: 'Ana Lucía Pérez', country: 'Argentina', students: 980, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
    { name: 'Diego Ramírez', country: 'Colombia', students: 1100, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    { name: 'Valentina Torres', country: 'Chile', students: 850, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <Award className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Embajadores Ululato
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Líderes apasionados que comparten el conocimiento en sus comunidades
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {ambassadors.map((amb, i) => (
              <motion.div
                key={amb.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border-2 border-border rounded-xl p-6 text-center hover:border-[#FFD700]/50 transition-all"
              >
                <img src={amb.image} alt={amb.name} className="w-24 h-24 rounded-full mx-auto border-4 border-[#FFD700]/30" />
                <h3 className="font-bold mt-4">{amb.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" /> {amb.country}
                </p>
                <p className="text-[#FFD700] font-semibold mt-2">{amb.students.toLocaleString()} estudiantes referidos</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#003366] to-[#001a33] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">¿Quieres ser embajador?</h2>
            <p className="text-white/70 mb-6">Únete a nuestra red de embajadores y gana beneficios exclusivos</p>
            <Button className="btn-premium" onClick={() => toast.info('Formulario de aplicación próximamente')}>
              Aplicar ahora
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ CENTRO DE AYUDA ============
export function AyudaPage() {
  const faqs = [
    { q: '¿Cómo puedo inscribirme en un curso?', a: 'Simplemente navega al curso que te interesa, haz clic en "Añadir al carrito" y completa el proceso de pago. Una vez confirmado, tendrás acceso inmediato al contenido.' },
    { q: '¿Puedo obtener un reembolso?', a: 'Sí, ofrecemos garantía de devolución de 30 días. Si no estás satisfecho con un curso, puedes solicitar el reembolso completo dentro de los primeros 30 días.' },
    { q: '¿Los certificados tienen validez oficial?', a: 'Nuestros certificados son reconocidos por empresas y organizaciones en toda Latinoamérica. Incluyen verificación digital y código QR único.' },
    { q: '¿Puedo descargar los videos?', a: 'Algunos cursos permiten descargar contenido para ver sin conexión a través de nuestra app móvil. Esto depende de cada instructor.' },
    { q: '¿Cómo contacto a un instructor?', a: 'Puedes hacer preguntas directamente en la sección de Q&A de cada curso. Los instructores responden regularmente a las consultas de los estudiantes.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <HelpCircle className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Centro de Ayuda
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Encuentra respuestas a las preguntas más frecuentes
          </p>

          <div className="max-w-3xl">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Buscar en el centro de ayuda..." className="pl-12 input-premium h-14 text-lg" />
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border-2 border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:text-[#FFD700]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 bg-card border-2 border-border rounded-xl p-8 text-center">
              <MessageSquare className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">¿No encontraste lo que buscabas?</h3>
              <p className="text-muted-foreground mb-4">Nuestro equipo de soporte está listo para ayudarte</p>
              <Button asChild className="btn-premium">
                <Link href="/contacto">Contactar Soporte</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ CONTACTO ============
export function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Mensaje enviado', { description: 'Te responderemos pronto' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <Mail className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Contacto
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Estamos aquí para ayudarte
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre</label>
                    <Input placeholder="Tu nombre" className="input-premium" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Correo</label>
                    <Input type="email" placeholder="tu@correo.com" className="input-premium" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Asunto</label>
                  <Input placeholder="¿En qué podemos ayudarte?" className="input-premium" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Mensaje</label>
                  <Textarea placeholder="Escribe tu mensaje aquí..." className="input-premium min-h-[150px]" required />
                </div>
                <Button type="submit" className="btn-premium w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : <><Send className="w-4 h-4 mr-2" /> Enviar Mensaje</>}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-card border-2 border-border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#FFD700]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Correo</p>
                      <p className="font-medium">hola@ululato.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#FFD700]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-medium">+57 300 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#FFD700]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <p className="font-medium">La Guajira, Colombia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#003366] to-[#001a33] rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Horario de Atención</h3>
                <p className="text-white/70">Lunes a Viernes: 8:00 AM - 6:00 PM (COT)</p>
                <p className="text-white/70">Sábados: 9:00 AM - 1:00 PM (COT)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ TÉRMINOS ============
export function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <h1 className="text-4xl font-bold font-display mb-4">
            <FileText className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Términos de Servicio
          </h1>
          <p className="text-muted-foreground mb-8">Última actualización: Enero 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">1. Aceptación de los Términos</h2>
              <p className="text-muted-foreground">
                Al acceder y utilizar la plataforma Ululato, aceptas estos términos de servicio en su totalidad. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
              </p>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">2. Uso de la Plataforma</h2>
              <p className="text-muted-foreground">
                Ululato proporciona una plataforma de aprendizaje en línea. Los usuarios deben tener al menos 
                13 años de edad para crear una cuenta. El contenido de los cursos es para uso personal y no 
                puede ser redistribuido sin autorización.
              </p>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">3. Política de Reembolso</h2>
              <p className="text-muted-foreground">
                Ofrecemos una garantía de devolución de 30 días para todos los cursos. Si no estás satisfecho 
                con tu compra, puedes solicitar un reembolso completo dentro de los primeros 30 días desde 
                la fecha de compra.
              </p>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">4. Propiedad Intelectual</h2>
              <p className="text-muted-foreground">
                Todo el contenido de la plataforma, incluyendo cursos, videos, materiales y diseño, está 
                protegido por derechos de autor. Los usuarios obtienen una licencia limitada para acceder 
                al contenido para uso personal.
              </p>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">5. Contacto</h2>
              <p className="text-muted-foreground">
                Para cualquier consulta sobre estos términos, contáctanos en legal@ululato.com
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ PRIVACIDAD ============
export function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <h1 className="text-4xl font-bold font-display mb-4">
            <Shield className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Política de Privacidad
          </h1>
          <p className="text-muted-foreground mb-8">Última actualización: Enero 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">1. Información que Recopilamos</h2>
              <p className="text-muted-foreground">
                Recopilamos información que nos proporcionas directamente, como nombre, correo electrónico, 
                y datos de pago. También recopilamos información sobre tu uso de la plataforma para mejorar 
                tu experiencia de aprendizaje.
              </p>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">2. Uso de la Información</h2>
              <p className="text-muted-foreground">
                Utilizamos tu información para proporcionar y mejorar nuestros servicios, procesar pagos, 
                enviar comunicaciones relevantes, y personalizar tu experiencia de aprendizaje.
              </p>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">3. Protección de Datos</h2>
              <p className="text-muted-foreground">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
                personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">4. Tus Derechos</h2>
              <p className="text-muted-foreground">
                Tienes derecho a acceder, corregir, eliminar o exportar tus datos personales. También puedes 
                optar por no recibir comunicaciones de marketing en cualquier momento.
              </p>
            </section>

            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">5. Contacto</h2>
              <p className="text-muted-foreground">
                Para ejercer tus derechos o consultas sobre privacidad, contáctanos en privacidad@ululato.com
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ TODOS LOS CURSOS ============
export function CursosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <BookOpen className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Todos los Cursos
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Explora nuestra biblioteca de más de 1,200 cursos
          </p>

          <div className="relative max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 input-premium"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/course/${course.id}`}>
                  <a className="block bg-card border border-border rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all group">
                    <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform" />
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-2 group-hover:text-[#FFD700] transition-colors">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{course.instructor.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[#FFD700] font-bold">{course.rating}</span>
                        <span className="text-[#FFD700]">★</span>
                        <span className="text-sm text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-bold">${course.price}</span>
                        {course.originalPrice > course.price && (
                          <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ CATEGORÍAS ============
export function CategoriasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <Globe className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Categorías
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Explora cursos por área de conocimiento
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/categoria/${cat.slug}`}>
                  <a className="block bg-card border-2 border-border rounded-xl p-6 hover:border-[#FFD700]/50 transition-all group">
                    <div className="text-4xl mb-4">{cat.icon}</div>
                    <h3 className="text-xl font-bold group-hover:text-[#FFD700] transition-colors">{cat.name}</h3>
                    <p className="text-muted-foreground mt-1">{cat.courseCount} cursos</p>
                    <div className="flex items-center gap-1 mt-4 text-[#FFD700] text-sm font-medium">
                      Explorar <ChevronRight className="w-4 h-4" />
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ INSTRUCTORES ============
export function InstructoresPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <Users className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Nuestros Instructores
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Aprende de expertos reconocidos en su campo
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor, i) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border-2 border-border rounded-xl p-6 text-center hover:border-[#FFD700]/50 transition-all"
              >
                <img src={instructor.avatar} alt={instructor.name} className="w-24 h-24 rounded-full mx-auto border-4 border-[#FFD700]/30 object-cover" />
                <h3 className="font-bold text-lg mt-4">{instructor.name}</h3>
                <p className="text-sm text-[#FFD700]">{instructor.title}</p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{instructor.bio}</p>
                <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-[#FFD700]">{instructor.students.toLocaleString()}</div>
                    <div className="text-muted-foreground">Estudiantes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#FFD700]">{instructor.courses}</div>
                    <div className="text-muted-foreground">Cursos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#FFD700]">{instructor.rating}</div>
                    <div className="text-muted-foreground">Rating</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ CERTIFICACIONES ============
export function CertificacionesPage() {
  const certifications = [
    { name: 'Certificado de Finalización', desc: 'Obtén un certificado al completar cualquier curso', icon: '🎓' },
    { name: 'Certificado Profesional', desc: 'Demuestra tus habilidades con certificaciones verificables', icon: '📜' },
    { name: 'Insignias Digitales', desc: 'Comparte tus logros en LinkedIn y redes sociales', icon: '🏆' },
    { name: 'Verificación Blockchain', desc: 'Certificados inmutables y verificables globalmente', icon: '🔐' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <Award className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Certificaciones
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Valida tu aprendizaje con certificados reconocidos
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border-2 border-border rounded-xl p-6 flex gap-4 hover:border-[#FFD700]/50 transition-all"
              >
                <div className="text-4xl">{cert.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#003366] to-[#001a33] rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Certificados que abren puertas</h2>
                <p className="text-white/70 mb-6">
                  Nuestros certificados son reconocidos por empresas líderes en Latinoamérica. 
                  Cada certificado incluye un código QR único para verificación instantánea.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Verificación digital', 'Código QR único', 'Compartible en LinkedIn'].map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-xs">
                  <div className="text-center">
                    <Award className="w-16 h-16 text-[#FFD700] mx-auto mb-4" />
                    <h4 className="text-white font-bold">Certificado de Ejemplo</h4>
                    <p className="text-white/60 text-sm mt-1">Curso completado con éxito</p>
                    <div className="mt-4 p-2 bg-white rounded">
                      <div className="w-20 h-20 mx-auto bg-gray-200 rounded" />
                    </div>
                    <p className="text-white/40 text-xs mt-2">Código QR de verificación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// ============ FORO GENERAL ============
export function ForoGeneralPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold font-display mb-4">
            <MessageSquare className="inline w-10 h-10 text-[#FFD700] mr-3" />
            Foro de la Comunidad
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Conecta con otros estudiantes y comparte conocimiento
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[
                { title: '¿Cómo empezar en programación?', author: 'Carlos M.', replies: 23, category: 'Desarrollo' },
                { title: 'Recursos gratuitos para aprender diseño', author: 'Ana L.', replies: 15, category: 'Diseño' },
                { title: 'Tips para aprender Wayuunaiki', author: 'María P.', replies: 31, category: 'Idiomas' },
                { title: 'Grupo de estudio de Data Science', author: 'Pedro S.', replies: 18, category: 'Ciencia de Datos' },
              ].map((post, i) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-5 hover:border-[#FFD700]/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">{post.category}</Badge>
                      <h3 className="font-semibold hover:text-[#FFD700] transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Por {post.author}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#FFD700]">{post.replies}</div>
                      <div className="text-xs text-muted-foreground">respuestas</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-card border-2 border-border rounded-xl p-6">
                <h3 className="font-bold mb-4">Categorías Populares</h3>
                <div className="space-y-2">
                  {['Desarrollo', 'Diseño', 'Marketing', 'Negocios', 'Idiomas'].map(cat => (
                    <button key={cat} className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#003366] to-[#001a33] rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">¿Primera vez aquí?</h3>
                <p className="text-white/70 text-sm mb-4">Lee las reglas de la comunidad antes de publicar</p>
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                  Ver reglas
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
