/**
 * Ululato Premium - Foro de Discusión por Curso
 * Comunidad de aprendizaje con hilos de discusión
 */
import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { 
  MessageSquare, ThumbsUp, Reply, Search, Filter, 
  Plus, Clock, User, ChevronDown, Pin, Award, 
  ArrowLeft, Send, Heart, Bookmark, Share2, MoreHorizontal
} from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { courses, currentUser } from '@/data/mocks';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'student' | 'instructor' | 'moderator';
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  isResolved: boolean;
  likes: number;
  replies: ForumReply[];
  createdAt: Date;
  views: number;
}

interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'student' | 'instructor' | 'moderator';
  content: string;
  likes: number;
  isAccepted: boolean;
  createdAt: Date;
}

// Datos de ejemplo del foro
const samplePosts: ForumPost[] = [
  {
    id: '1',
    authorId: 'user2',
    authorName: 'María García',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    authorRole: 'student',
    title: '¿Cómo aplicar el análisis FODA en una startup tecnológica?',
    content: 'Hola a todos. Estoy trabajando en mi proyecto final y tengo dudas sobre cómo adaptar el análisis FODA tradicional a una startup de tecnología. ¿Alguien tiene experiencia con esto? ¿Qué factores externos son los más relevantes en este sector?',
    category: 'Pregunta',
    isPinned: false,
    isResolved: true,
    likes: 24,
    views: 156,
    createdAt: new Date('2026-01-10'),
    replies: [
      {
        id: 'r1',
        authorId: 'instructor1',
        authorName: 'Dra. Sara Martínez',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop',
        authorRole: 'instructor',
        content: '¡Excelente pregunta María! Para startups tecnológicas, te recomiendo enfocarte especialmente en: 1) Amenazas: cambios regulatorios en privacidad de datos, competidores con más financiamiento. 2) Oportunidades: tendencias de digitalización, nuevos mercados emergentes. En el módulo 5 profundizamos en esto con casos reales de Silicon Valley.',
        likes: 18,
        isAccepted: true,
        createdAt: new Date('2026-01-10'),
      },
      {
        id: 'r2',
        authorId: 'user3',
        authorName: 'Carlos López',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
        authorRole: 'student',
        content: 'Yo hice mi análisis FODA para una fintech y me sirvió mucho considerar la velocidad de cambio tecnológico como una amenaza y oportunidad a la vez. También es clave analizar el ecosistema de inversión en tu región.',
        likes: 8,
        isAccepted: false,
        createdAt: new Date('2026-01-11'),
      },
    ],
  },
  {
    id: '2',
    authorId: 'instructor1',
    authorName: 'Dra. Sara Martínez',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop',
    authorRole: 'instructor',
    title: '📌 Recursos adicionales: Plantillas de análisis estratégico',
    content: 'Comparto con ustedes una colección de plantillas profesionales que uso en mis consultorías. Incluye: plantilla FODA interactiva, matriz BCG en Excel, canvas de modelo de negocio, y más. ¡Espero les sean útiles!',
    category: 'Recurso',
    isPinned: true,
    isResolved: false,
    likes: 89,
    views: 432,
    createdAt: new Date('2026-01-05'),
    replies: [],
  },
  {
    id: '3',
    authorId: 'user4',
    authorName: 'Ana Rodríguez',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop',
    authorRole: 'student',
    title: 'Grupo de estudio: ¿Alguien quiere practicar casos juntos?',
    content: 'Estoy buscando compañeros para formar un grupo de estudio virtual. La idea es reunirnos una vez por semana para analizar casos de negocio y practicar presentaciones. ¿Alguien se apunta?',
    category: 'Comunidad',
    isPinned: false,
    isResolved: false,
    likes: 31,
    views: 198,
    createdAt: new Date('2026-01-08'),
    replies: [
      {
        id: 'r3',
        authorId: 'user5',
        authorName: 'Pedro Sánchez',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop',
        authorRole: 'student',
        content: '¡Me apunto! Estoy en zona horaria GMT-5, ¿cuándo les funcionaría mejor?',
        likes: 5,
        isAccepted: false,
        createdAt: new Date('2026-01-08'),
      },
    ],
  },
];

const categories = ['Todas', 'Pregunta', 'Discusión', 'Recurso', 'Comunidad', 'Feedback'];

export default function ForumPage() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  
  const [posts, setPosts] = useState<ForumPost[]>(samplePosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Pregunta');
  const [newReplyContent, setNewReplyContent] = useState('');

  // Filtrar y ordenar posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'unanswered':
          return a.replies.length - b.replies.length;
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const newPost: ForumPost = {
      id: Date.now().toString(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: 'student',
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      isPinned: false,
      isResolved: false,
      likes: 0,
      views: 0,
      createdAt: new Date(),
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setIsCreatingPost(false);
    toast.success('Publicación creada exitosamente');
  };

  const handleAddReply = () => {
    if (!newReplyContent.trim() || !selectedPost) return;

    const newReply: ForumReply = {
      id: Date.now().toString(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: 'student',
      content: newReplyContent,
      likes: 0,
      isAccepted: false,
      createdAt: new Date(),
    };

    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    ));
    setSelectedPost({ ...selectedPost, replies: [...selectedPost.replies, newReply] });
    setNewReplyContent('');
    toast.success('Respuesta publicada');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'instructor':
        return <Badge className="bg-[#FFD700] text-black text-xs">Instructor</Badge>;
      case 'moderator':
        return <Badge className="bg-blue-500 text-white text-xs">Moderador</Badge>;
      default:
        return null;
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Curso no encontrado</h1>
          <Button asChild className="mt-4">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href={`/course/${course.id}`}>
              <a className="text-muted-foreground hover:text-[#FFD700] transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Volver al curso
              </a>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Foro de Discusión</span>
          </div>
        </div>
      </div>

      <main className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Course Info */}
            <div className="bg-card border-2 border-border rounded-xl p-4">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full aspect-video object-cover rounded-lg mb-4"
              />
              <h2 className="font-bold line-clamp-2">{course.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{course.instructor.name}</p>
            </div>

            {/* Stats */}
            <div className="bg-card border-2 border-border rounded-xl p-4 space-y-3">
              <h3 className="font-semibold">Estadísticas del Foro</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-[#FFD700]">{posts.length}</div>
                  <div className="text-muted-foreground">Publicaciones</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-[#FFD700]">
                    {posts.reduce((acc, p) => acc + p.replies.length, 0)}
                  </div>
                  <div className="text-muted-foreground">Respuestas</div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-card border-2 border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Categorías</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      selectedCategory === cat 
                        ? "bg-[#FFD700]/20 text-[#FFD700]" 
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-[#FFD700]" />
                  Foro de Discusión
                </h1>
                <p className="text-muted-foreground mt-1">
                  Comparte, aprende y conecta con la comunidad
                </p>
              </div>
              <Button 
                onClick={() => setIsCreatingPost(true)}
                className="btn-premium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Publicación
              </Button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar en el foro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-premium"
                />
              </div>
              <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                <SelectTrigger className="w-[180px] input-premium">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más recientes</SelectItem>
                  <SelectItem value="popular">Más populares</SelectItem>
                  <SelectItem value="unanswered">Sin responder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Create Post Form */}
            <AnimatePresence>
              {isCreatingPost && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-card border-2 border-[#FFD700]/30 rounded-xl overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Nueva Publicación</h3>
                    <Input
                      placeholder="Título de tu publicación"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="input-premium"
                    />
                    <Textarea
                      placeholder="Escribe tu mensaje aquí..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="input-premium min-h-[150px]"
                    />
                    <div className="flex items-center gap-4">
                      <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                        <SelectTrigger className="w-[180px] input-premium">
                          <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c !== 'Todas').map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreatingPost(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreatePost} className="btn-premium">
                        Publicar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">No hay publicaciones</h3>
                  <p className="text-muted-foreground">Sé el primero en iniciar una discusión</p>
                </div>
              ) : (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "bg-card border-2 rounded-xl p-5 hover:border-[#FFD700]/30 transition-all cursor-pointer",
                      post.isPinned ? "border-[#FFD700]/50" : "border-border"
                    )}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12 border-2 border-border">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {post.isPinned && (
                                <Pin className="w-4 h-4 text-[#FFD700]" />
                              )}
                              <h3 className="font-semibold hover:text-[#FFD700] transition-colors">
                                {post.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                              <span className="text-muted-foreground">{post.authorName}</span>
                              {getRoleBadge(post.authorRole)}
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{formatDate(post.createdAt)}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {post.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-2 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <button 
                            className="flex items-center gap-1 hover:text-[#FFD700] transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLikePost(post.id);
                            }}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {post.replies.length} respuestas
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.views} vistas
                          </span>
                          {post.isResolved && (
                            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                              Resuelto
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border-2 border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Post Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border-2 border-border">
                    <AvatarImage src={selectedPost.authorAvatar} />
                    <AvatarFallback>{selectedPost.authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <span className="font-medium">{selectedPost.authorName}</span>
                      {getRoleBadge(selectedPost.authorRole)}
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{formatDate(selectedPost.createdAt)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <p className="text-foreground whitespace-pre-wrap">{selectedPost.content}</p>

                {/* Replies */}
                {selectedPost.replies.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="font-semibold text-lg">
                      {selectedPost.replies.length} Respuesta{selectedPost.replies.length !== 1 ? 's' : ''}
                    </h3>
                    {selectedPost.replies.map(reply => (
                      <div 
                        key={reply.id} 
                        className={cn(
                          "p-4 rounded-xl border",
                          reply.isAccepted 
                            ? "bg-green-500/10 border-green-500/30" 
                            : "bg-muted/30 border-border"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={reply.authorAvatar} />
                            <AvatarFallback>{reply.authorName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{reply.authorName}</span>
                              {getRoleBadge(reply.authorRole)}
                              {reply.isAccepted && (
                                <Badge className="bg-green-500 text-white">
                                  <Award className="w-3 h-3 mr-1" />
                                  Mejor respuesta
                                </Badge>
                              )}
                            </div>
                            <p className="mt-2 text-sm">{reply.content}</p>
                            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <button className="flex items-center gap-1 hover:text-[#FFD700]">
                                <ThumbsUp className="w-3 h-3" />
                                {reply.likes}
                              </button>
                              <span>{formatDate(reply.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">Tu respuesta</h4>
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Escribe tu respuesta..."
                        value={newReplyContent}
                        onChange={(e) => setNewReplyContent(e.target.value)}
                        className="input-premium"
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAddReply}
                          disabled={!newReplyContent.trim()}
                          className="btn-premium"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Responder
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
