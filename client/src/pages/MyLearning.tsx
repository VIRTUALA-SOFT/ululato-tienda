/**
 * Neo-Brutalism Dark Edition: Página Mi Aprendizaje
 * Muestra cursos inscritos con progreso
 */
import { Link } from 'wouter';
import { BookOpen, Play, Clock } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { courses, currentUser } from '@/data/mocks';

export default function MyLearning() {
  const enrolledCourses = courses.filter(c => currentUser.enrolledCourses.includes(c.id));

  // Simular progreso para cada curso
  const getProgress = (courseId: string) => {
    if (courseId === '1') return 35;
    if (courseId === '2') return 12;
    return 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-10 h-10 text-[#FFD700]" />
          <h1 className="text-4xl font-bold text-display">Mi Aprendizaje</h1>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const progress = getProgress(course.id);
              return (
                <div
                  key={course.id}
                  className="bg-card border-2 border-border rounded-lg overflow-hidden hover:border-[#FFD700] transition-colors group"
                >
                  <Link href={`/course/${course.id}`}>
                    <a>
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            size="lg"
                            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold border-4 border-black"
                          >
                            <Play className="w-5 h-5 mr-2" fill="currentColor" />
                            Continuar
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{course.instructor.name}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="font-bold text-[#FFD700]">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2 bg-muted">
                            <div
                              className="h-full bg-[#FFD700] transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </Progress>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration} restantes</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-card border-2 border-border rounded-lg">
            <BookOpen className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-display mb-2">Aún no tienes cursos</h2>
            <p className="text-muted-foreground mb-6">
              Comienza tu viaje de aprendizaje hoy
            </p>
            <Button
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold border-4 border-black"
              asChild
            >
              <Link href="/">Explorar Cursos</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
