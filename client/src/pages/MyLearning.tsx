/**
 * Neo-Brutalism Dark Edition: My Learning page
 * Shows enrolled courses with progress tracking
 */
import { BookOpen, Clock, Award } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import { Progress } from '@/components/ui/progress';
import { currentUser, courses } from '@/data/mocks';

export default function MyLearning() {
  const enrolledCourses = courses.filter(c => currentUser.enrolledCourses.includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-display mb-2">My Learning</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-display mb-2">No courses yet</h2>
            <p className="text-muted-foreground mb-6">Start learning today!</p>
            <Link href="/">
              <a className="inline-flex items-center justify-center px-6 py-3 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold rounded-lg border-4 border-black glow-gold-hover">
                Browse Courses
              </a>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const totalLectures = course.sections.reduce((acc, s) => acc + s.lectures.length, 0);
              const completedLectures = course.sections.reduce(
                (acc, s) => acc + s.lectures.filter(l => l.completed).length,
                0
              );
              const progress = totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;

              return (
                <Link key={course.id} href={`/course/${course.id}`}>
                  <a className="block bg-card border-2 border-border rounded-lg overflow-hidden hover:border-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all duration-300 group">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between text-xs text-white mb-2">
                          <span>{progress}% complete</span>
                          <span>{completedLectures}/{totalLectures} lectures</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-black/50">
                          <div
                            className="h-full bg-[#FFD700] transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </Progress>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        By {course.instructor.name}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-[#FFD700]" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
