/**
 * Ululato Premium - Página de Perfil de Usuario
 * Diseño elegante con edición de datos, preferencias y certificados
 */
import { useState } from 'react';
import { 
  User, Mail, MapPin, Calendar, BookOpen, Award, Heart, 
  Settings, Camera, Edit3, Save, X, Target, Trophy, Flame
} from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { currentUser, courses } from '@/data/mocks';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: currentUser.bio,
    location: currentUser.location,
  });

  const enrolledCourses = courses.filter(c => currentUser.enrolledCourses.includes(c.id));
  const wishlistCourses = courses.filter(c => currentUser.wishlist.includes(c.id));

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Perfil actualizado exitosamente');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserData({
      name: currentUser.name,
      email: currentUser.email,
      bio: currentUser.bio,
      location: currentUser.location,
    });
  };

  // Estadísticas del usuario
  const userStats = {
    coursesCompleted: 2,
    totalHours: 48,
    certificates: 2,
    streak: 15,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero del Perfil */}
      <section className="relative bg-gradient-to-br from-[#003366] to-[#001a33] py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-learning-premium.png')] bg-cover bg-center opacity-10" />
        <div className="container relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-[#FFD700] overflow-hidden bg-card">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#FFD700] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Info Principal */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold font-display text-white mb-2">
                {userData.name}
              </h1>
              <p className="text-lg text-white/70 mb-4">{userData.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {userData.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Miembro desde {currentUser.joinedDate}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {userData.email}
                </div>
              </div>
            </div>

            {/* Botón Editar */}
            <Button
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </motion.div>

          {/* Estadísticas */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { icon: BookOpen, value: userStats.coursesCompleted, label: 'Cursos Completados', color: 'text-blue-400' },
              { icon: Trophy, value: `${userStats.totalHours}h`, label: 'Horas de Aprendizaje', color: 'text-purple-400' },
              { icon: Award, value: userStats.certificates, label: 'Certificados', color: 'text-[#FFD700]' },
              { icon: Flame, value: `${userStats.streak} días`, label: 'Racha Actual', color: 'text-orange-400' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contenido Principal */}
      <main className="container py-12">
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="bg-card border border-border p-1 rounded-xl">
            <TabsTrigger 
              value="courses" 
              className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black rounded-lg px-6"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Mis Cursos
            </TabsTrigger>
            <TabsTrigger 
              value="wishlist"
              className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black rounded-lg px-6"
            >
              <Heart className="w-4 h-4 mr-2" />
              Lista de Deseos
            </TabsTrigger>
            <TabsTrigger 
              value="certificates"
              className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black rounded-lg px-6"
            >
              <Award className="w-4 h-4 mr-2" />
              Certificados
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black rounded-lg px-6"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </TabsTrigger>
          </TabsList>

          {/* Mis Cursos */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-display">Mis Cursos Inscritos</h2>
              <span className="text-muted-foreground">{enrolledCourses.length} cursos</span>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course, index) => {
                  const progress = course.id === '1' ? 35 : course.id === '2' ? 12 : course.id === '7' ? 8 : 0;
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card border-2 border-border rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all group"
                    >
                      <Link href={`/course/${course.id}`}>
                        <a>
                          <div className="relative aspect-video">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button className="btn-premium">Continuar</Button>
                            </div>
                          </div>
                          <div className="p-4 space-y-3">
                            <h3 className="font-semibold line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                              {course.title}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progreso</span>
                                <span className="font-bold text-[#FFD700]">{progress}%</span>
                              </div>
                              <div className="progress-premium">
                                <div 
                                  className="progress-premium-bar" 
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tienes cursos inscritos</h3>
                <p className="text-muted-foreground mb-4">Explora nuestro catálogo y comienza a aprender</p>
                <Button className="btn-premium" asChild>
                  <Link href="/">Explorar Cursos</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Lista de Deseos */}
          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-display">Lista de Deseos</h2>
              <span className="text-muted-foreground">{wishlistCourses.length} cursos guardados</span>
            </div>

            {wishlistCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border-2 border-border rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all group"
                  >
                    <Link href={`/course/${course.id}`}>
                      <a>
                        <div className="relative aspect-video">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 space-y-3">
                          <h3 className="font-semibold line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{course.instructor.name}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-[#FFD700]">{course.rating}</span>
                              <span className="text-[#FFD700]">★</span>
                            </div>
                            <div>
                              <span className="text-xl font-bold text-[#FFD700]">${course.price}</span>
                              <span className="text-sm text-muted-foreground line-through ml-2">${course.originalPrice}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tu lista de deseos está vacía</h3>
                <p className="text-muted-foreground mb-4">Guarda cursos para verlos más tarde</p>
                <Button className="btn-premium" asChild>
                  <Link href="/">Explorar Cursos</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Certificados */}
          <TabsContent value="certificates" className="space-y-6">
            <h2 className="text-2xl font-bold font-display">Mis Certificados</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Fundamentos de React', 
                  date: 'Diciembre 2025', 
                  instructor: 'Carlos Rodríguez',
                  credentialId: 'UC-12345678'
                },
                { 
                  title: 'Introducción al Wayuunaiki', 
                  date: 'Enero 2026', 
                  instructor: 'María Pushaina Epieyu',
                  credentialId: 'UC-87654321'
                },
              ].map((cert, index) => (
                <motion.div
                  key={cert.credentialId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#003366]/30 to-card border-2 border-[#FFD700]/30 rounded-xl p-6 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4">
                    <Award className="w-12 h-12 text-[#FFD700]/20" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{cert.title}</h3>
                      <p className="text-muted-foreground">{cert.instructor}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completado: {cert.date}</span>
                      <span className="text-[#FFD700]">ID: {cert.credentialId}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-[#FFD700] text-[#FFD700]">
                        Ver Certificado
                      </Button>
                      <Button variant="outline" size="sm">
                        Compartir
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Configuración */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold font-display">Configuración de la Cuenta</h2>

            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Información Personal</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre Completo</label>
                    <Input
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Correo Electrónico</label>
                    <Input
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ubicación</label>
                  <Input
                    value={userData.location}
                    onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                    className="input-premium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Biografía</label>
                  <Textarea
                    value={userData.bio}
                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                    className="input-premium min-h-[100px]"
                    placeholder="Cuéntanos sobre ti..."
                  />
                </div>
              </div>

              <div className="divider-elegant" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Objetivos de Aprendizaje</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.learningGoals.map((goal: string) => (
                    <span
                      key={goal}
                      className="px-4 py-2 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 text-sm"
                    >
                      {goal}
                    </span>
                  ))}
                  <button className="px-4 py-2 rounded-full border border-dashed border-muted-foreground text-muted-foreground text-sm hover:border-[#FFD700] hover:text-[#FFD700] transition-colors">
                    + Agregar
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancelar</Button>
                <Button className="btn-premium" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modal de Edición */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border-2 border-[#FFD700]/30 rounded-2xl p-6 w-full max-w-lg space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-display">Editar Perfil</h2>
              <button onClick={handleCancel} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="input-premium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="input-premium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ubicación</label>
                <Input
                  value={userData.location}
                  onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                  className="input-premium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Biografía</label>
                <Textarea
                  value={userData.bio}
                  onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                  className="input-premium"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button className="flex-1 btn-premium" onClick={handleSave}>
                Guardar
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
