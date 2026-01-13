/**
 * Neo-Brutalism Dark Edition: Panel de Instructor
 * Muestra gráfico de ganancias, lista de cursos y botón de crear curso
 */
import { DollarSign, TrendingUp, Users, BookOpen, Plus } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { instructorEarnings, courses, instructors } from '@/data/mocks';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InstructorDashboard() {
  const instructor = instructors[0]; // Usuario actual como instructor
  const instructorCourses = courses.filter(c => c.instructor.id === instructor.id);

  const handleCreateCourse = () => {
    toast.info('Función de crear curso próximamente', {
      description: 'Este es un prototipo. La creación de cursos será añadida.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-display mb-2">Panel de Instructor</h1>
            <p className="text-muted-foreground">Bienvenido de nuevo, {instructor.name}</p>
          </div>
          <Button
            size="lg"
            className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold border-4 border-black glow-gold-hover"
            onClick={handleCreateCourse}
          >
            <Plus className="w-5 h-5 mr-2" />
            Crear Nuevo Curso
          </Button>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ganancias Totales</CardTitle>
              <DollarSign className="w-5 h-5 text-[#FFD700]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#FFD700]">
                ${instructorEarnings.total.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ganancias de por vida</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Este Mes</CardTitle>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${instructorEarnings.thisMonth.toLocaleString()}
              </div>
              <p className="text-xs text-green-500 mt-1">
                +{Math.round(((instructorEarnings.thisMonth - instructorEarnings.lastMonth) / instructorEarnings.lastMonth) * 100)}% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Estudiantes</CardTitle>
              <Users className="w-5 h-5 text-[#FFD700]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {instructor.students.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">En todos los cursos</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cursos Activos</CardTitle>
              <BookOpen className="w-5 h-5 text-[#FFD700]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {instructorCourses.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Cursos publicados</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Ganancias */}
        <Card className="border-4 border-[#FFD700] bg-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-display">Resumen de Ganancias</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={instructorEarnings.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '2px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ganancias']}
                />
                <Bar dataKey="earnings" fill="#FFD700" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mis Cursos */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-display">Mis Cursos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructorCourses.map((course) => (
              <Card key={course.id} className="border-2 border-border bg-card hover:border-[#FFD700] transition-colors group">
                <Link href={`/course/${course.id}`}>
                  <a>
                    <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                        {course.title}
                      </h3>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-[#FFD700]">{course.rating}</div>
                          <div className="text-xs text-muted-foreground">Calificación</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{(course.studentCount / 1000).toFixed(0)}k</div>
                          <div className="text-xs text-muted-foreground">Estudiantes</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-[#FFD700]">${course.price}</div>
                          <div className="text-xs text-muted-foreground">Precio</div>
                        </div>
                      </div>
                    </CardContent>
                  </a>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
