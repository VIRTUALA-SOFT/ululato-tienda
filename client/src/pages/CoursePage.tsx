/**
 * Neo-Brutalism Dark Edition: Página del reproductor de curso
 * Layout: Reproductor de video (izquierda/centro) + Sidebar de contenido (derecha)
 * Tabs: Descripción, Preguntas, Notas, Reseñas
 */
import { useState } from 'react';
import { useRoute } from 'wouter';
import { Play, CheckCircle2, Circle, Clock, BarChart, Award, Users } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { courses } from '@/data/mocks';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function CoursePage() {
  const [, params] = useRoute('/course/:id');
  const courseId = params?.id;
  const course = courses.find(c => c.id === courseId);
  const { addToCart, cart } = useApp();
  const [noteContent, setNoteContent] = useState('');

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold text-display">Curso no encontrado</h1>
        </div>
      </div>
    );
  }

  const isInCart = cart.includes(course.id);
  const totalLectures = course.sections.reduce((acc, section) => acc + section.lectures.length, 0);
  const completedLectures = course.sections.reduce(
    (acc, section) => acc + section.lectures.filter(l => l.completed).length,
    0
  );
  const progress = totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;

  const handleSaveNote = () => {
    if (noteContent.trim()) {
      toast.success('Nota guardada exitosamente');
      setNoteContent('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Encabezado del Curso */}
      <div className="bg-[#003366] border-b-4 border-[#FFD700]">
        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-4xl font-bold text-white text-display">{course.title}</h1>
              <p className="text-lg text-gray-200">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFD700]" />
                  <span className="font-bold">{course.rating}</span>
                  <span>({course.reviewCount.toLocaleString()} reseñas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#FFD700]" />
                  <span>{course.studentCount.toLocaleString()} estudiantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FFD700]" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-[#FFD700]" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full border-2 border-[#FFD700]"
                />
                <div>
                  <p className="text-white font-semibold">{course.instructor.name}</p>
                  <p className="text-sm text-gray-300">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border-4 border-[#FFD700] rounded-lg p-6 space-y-4 sticky top-24">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-[#FFD700]">${course.price}</span>
                    <span className="text-xl text-muted-foreground line-through">${course.originalPrice}</span>
                  </div>
                  <p className="text-sm text-[#DC143C] font-bold">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% DE DESCUENTO - ¡Tiempo Limitado!
                  </p>
                </div>

                {!isInCart ? (
                  <Button
                    size="lg"
                    className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg border-4 border-black glow-gold-hover"
                    onClick={() => addToCart(course.id)}
                  >
                    Comprar Ahora
                  </Button>
                ) : (
                  <Button size="lg" className="w-full" variant="outline" disabled>
                    Agregado al Carrito
                  </Button>
                )}

                <div className="border-t border-border pt-4 space-y-3">
                  <h4 className="font-semibold text-display">Este curso incluye:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                      <span>{course.duration} de video bajo demanda</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                      <span>Acceso de por vida</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                      <span>Certificado de finalización</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Izquierda: Video y Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reproductor de Video */}
            <div className="aspect-video bg-black rounded-lg border-4 border-[#FFD700] overflow-hidden relative group">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black border-4 border-black glow-gold-hover"
                >
                  <Play className="w-10 h-10 ml-1" fill="currentColor" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-card border-2 border-border">
                <TabsTrigger value="overview" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
                  Descripción
                </TabsTrigger>
                <TabsTrigger value="qa" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
                  Preguntas
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
                  Notas
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
                  Reseñas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="bg-card border-2 border-border rounded-lg p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-display">Lo que aprenderás</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card border-2 border-border rounded-lg p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-display">Sobre el instructor</h3>
                  <div className="flex items-start gap-4">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-20 h-20 rounded-full border-4 border-[#FFD700]"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="text-xl font-semibold">{course.instructor.name}</h4>
                      <p className="text-muted-foreground">{course.instructor.title}</p>
                      <p className="text-sm">{course.instructor.bio}</p>
                      <div className="flex gap-6 text-sm">
                        <span><strong>{course.instructor.students.toLocaleString()}</strong> estudiantes</span>
                        <span><strong>{course.instructor.courses}</strong> cursos</span>
                        <span><strong>{course.instructor.rating}</strong> calificación</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="qa" className="space-y-4 mt-6">
                {course.questions.length > 0 ? (
                  course.questions.map((q) => (
                    <div key={q.id} className="bg-card border-2 border-border rounded-lg p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <img src={q.userAvatar} alt={q.userName} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{q.userName}</span>
                            <span className="text-sm text-muted-foreground">{q.date}</span>
                          </div>
                          <p>{q.question}</p>
                        </div>
                      </div>
                      {q.answers.map((a) => (
                        <div key={a.id} className="ml-12 pl-4 border-l-4 border-[#FFD700] space-y-2">
                          <div className="flex items-start gap-3">
                            <img src={a.userAvatar} alt={a.userName} className="w-8 h-8 rounded-full" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{a.userName}</span>
                                {a.isInstructor && (
                                  <span className="text-xs bg-[#FFD700] text-black px-2 py-0.5 rounded font-bold">
                                    Instructor
                                  </span>
                                )}
                                <span className="text-sm text-muted-foreground">{a.date}</span>
                              </div>
                              <p className="text-sm">{a.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="bg-card border-2 border-border rounded-lg p-6 text-center">
                    <p className="text-muted-foreground">Aún no hay preguntas. ¡Sé el primero en preguntar!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="notes" className="space-y-4 mt-6">
                <div className="bg-card border-2 border-border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-bold text-display">Agregar una nota</h3>
                  <Textarea
                    placeholder="Escribe tus notas aquí..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-[150px]"
                  />
                  <Button 
                    className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold"
                    onClick={handleSaveNote}
                  >
                    Guardar Nota
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 mt-6">
                {course.reviews.length > 0 ? (
                  course.reviews.map((review) => (
                    <div key={review.id} className="bg-card border-2 border-border rounded-lg p-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <img src={review.userAvatar} alt={review.userName} className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.userName}</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={cn("text-lg", i < review.rating ? "text-[#FFD700]" : "text-muted")}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-card border-2 border-border rounded-lg p-6 text-center">
                    <p className="text-muted-foreground">Aún no hay reseñas para este curso.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Derecha: Sidebar de Contenido del Curso */}
          <div className="lg:col-span-1">
            <div className="bg-card border-4 border-border rounded-lg overflow-hidden sticky top-24">
              <div className="bg-[#003366] p-4 border-b-4 border-[#FFD700]">
                <h3 className="text-xl font-bold text-white text-display">Contenido del Curso</h3>
                <div className="mt-2 text-sm text-gray-200">
                  <p>{course.sections.length} secciones • {totalLectures} lecciones</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Progreso</span>
                      <span className="font-bold text-[#FFD700]">{progress}%</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFD700] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {course.sections.length > 0 ? (
                  <Accordion type="multiple" className="w-full">
                    {course.sections.map((section) => (
                      <AccordionItem key={section.id} value={section.id} className="border-b border-border">
                        <AccordionTrigger className="px-4 py-3 hover:bg-accent">
                          <span className="font-semibold text-left">{section.title}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1">
                            {section.lectures.map((lecture) => (
                              <button
                                key={lecture.id}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent text-left transition-colors"
                              >
                                {lecture.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{lecture.title}</p>
                                  <p className="text-xs text-muted-foreground">{lecture.duration}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <p>El contenido del curso se está preparando</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
