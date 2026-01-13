/**
 * Ululato Premium - Sistema de Logros y Badges
 * Gamificación para motivar el aprendizaje continuo
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Flame, BookOpen, Award, Target, 
  Zap, Crown, Heart, Users, MessageSquare, Clock,
  CheckCircle, Lock, Sparkles, LucideIcon
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

// Tipos de logros
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'learning' | 'social' | 'streak' | 'mastery' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
  xpReward: number;
  badgeColor: string;
}

// Datos de logros
export const achievements: Achievement[] = [
  // Logros de Aprendizaje
  {
    id: 'first-course',
    title: 'Primer Paso',
    description: 'Completa tu primer curso',
    icon: BookOpen,
    category: 'learning',
    rarity: 'common',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date('2025-12-15'),
    xpReward: 100,
    badgeColor: '#4CAF50'
  },
  {
    id: 'five-courses',
    title: 'Estudiante Dedicado',
    description: 'Completa 5 cursos',
    icon: Award,
    category: 'learning',
    rarity: 'rare',
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    xpReward: 500,
    badgeColor: '#2196F3'
  },
  {
    id: 'ten-courses',
    title: 'Maestro del Conocimiento',
    description: 'Completa 10 cursos',
    icon: Crown,
    category: 'mastery',
    rarity: 'epic',
    progress: 3,
    maxProgress: 10,
    unlocked: false,
    xpReward: 1000,
    badgeColor: '#9C27B0'
  },
  {
    id: 'wayuu-master',
    title: 'Guardián Wayuu',
    description: 'Completa el curso de Wayuunaiki',
    icon: Heart,
    category: 'special',
    rarity: 'legendary',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    xpReward: 2000,
    badgeColor: '#FFD700'
  },
  
  // Logros de Racha
  {
    id: 'streak-7',
    title: 'Semana de Fuego',
    description: 'Mantén una racha de 7 días',
    icon: Flame,
    category: 'streak',
    rarity: 'common',
    progress: 5,
    maxProgress: 7,
    unlocked: false,
    xpReward: 200,
    badgeColor: '#FF5722'
  },
  {
    id: 'streak-30',
    title: 'Mes Imparable',
    description: 'Mantén una racha de 30 días',
    icon: Zap,
    category: 'streak',
    rarity: 'rare',
    progress: 5,
    maxProgress: 30,
    unlocked: false,
    xpReward: 1000,
    badgeColor: '#FF9800'
  },
  {
    id: 'streak-100',
    title: 'Leyenda de la Constancia',
    description: 'Mantén una racha de 100 días',
    icon: Trophy,
    category: 'streak',
    rarity: 'legendary',
    progress: 5,
    maxProgress: 100,
    unlocked: false,
    xpReward: 5000,
    badgeColor: '#FFD700'
  },
  
  // Logros Sociales
  {
    id: 'first-review',
    title: 'Crítico Constructivo',
    description: 'Deja tu primera reseña',
    icon: Star,
    category: 'social',
    rarity: 'common',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date('2025-12-20'),
    xpReward: 50,
    badgeColor: '#FFC107'
  },
  {
    id: 'forum-helper',
    title: 'Mentor de la Comunidad',
    description: 'Responde 10 preguntas en el foro',
    icon: MessageSquare,
    category: 'social',
    rarity: 'rare',
    progress: 4,
    maxProgress: 10,
    unlocked: false,
    xpReward: 300,
    badgeColor: '#00BCD4'
  },
  {
    id: 'community-leader',
    title: 'Líder Comunitario',
    description: 'Ayuda a 50 estudiantes',
    icon: Users,
    category: 'social',
    rarity: 'epic',
    progress: 12,
    maxProgress: 50,
    unlocked: false,
    xpReward: 1500,
    badgeColor: '#E91E63'
  },
  
  // Logros de Maestría
  {
    id: 'perfect-quiz',
    title: 'Perfeccionista',
    description: 'Obtén 100% en un quiz',
    icon: Target,
    category: 'mastery',
    rarity: 'rare',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date('2026-01-05'),
    xpReward: 250,
    badgeColor: '#673AB7'
  },
  {
    id: 'speed-learner',
    title: 'Aprendiz Veloz',
    description: 'Completa un curso en menos de una semana',
    icon: Clock,
    category: 'mastery',
    rarity: 'epic',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    xpReward: 750,
    badgeColor: '#3F51B5'
  },
];

// Colores por rareza
const rarityColors = {
  common: { bg: 'from-gray-500 to-gray-600', border: 'border-gray-400', text: 'text-gray-300' },
  rare: { bg: 'from-blue-500 to-blue-600', border: 'border-blue-400', text: 'text-blue-300' },
  epic: { bg: 'from-purple-500 to-purple-600', border: 'border-purple-400', text: 'text-purple-300' },
  legendary: { bg: 'from-yellow-500 to-amber-500', border: 'border-yellow-400', text: 'text-yellow-300' },
};

const rarityNames = {
  common: 'Común',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Legendario',
};

// Componente de Badge Individual
interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  onClick?: () => void;
}

export function AchievementBadge({ 
  achievement, 
  size = 'md', 
  showProgress = false,
  onClick 
}: AchievementBadgeProps) {
  const Icon = achievement.icon;
  const rarity = rarityColors[achievement.rarity];
  
  const sizes = {
    sm: { container: 'w-12 h-12', icon: 'w-5 h-5' },
    md: { container: 'w-16 h-16', icon: 'w-7 h-7' },
    lg: { container: 'w-24 h-24', icon: 'w-10 h-10' },
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Badge */}
      <div
        className={`
          ${sizes[size].container} 
          rounded-full 
          flex items-center justify-center
          border-4 ${achievement.unlocked ? rarity.border : 'border-gray-600'}
          ${achievement.unlocked 
            ? `bg-gradient-to-br ${rarity.bg}` 
            : 'bg-gray-800'
          }
          transition-all duration-300
          ${achievement.unlocked ? 'shadow-lg' : 'opacity-50'}
        `}
        style={achievement.unlocked ? { 
          boxShadow: `0 0 20px ${achievement.badgeColor}40` 
        } : {}}
      >
        {achievement.unlocked ? (
          <Icon className={`${sizes[size].icon} text-white drop-shadow-lg`} />
        ) : (
          <Lock className={`${sizes[size].icon} text-gray-500`} />
        )}
      </div>

      {/* Efecto de brillo para legendarios */}
      {achievement.unlocked && achievement.rarity === 'legendary' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${achievement.badgeColor}40 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Progreso */}
      {showProgress && !achievement.unlocked && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full px-1">
          <Progress 
            value={(achievement.progress / achievement.maxProgress) * 100} 
            className="h-1.5 bg-gray-700"
          />
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="bg-card border-2 border-border rounded-lg p-3 shadow-xl min-w-[200px]">
          <p className="font-bold text-sm">{achievement.title}</p>
          <p className="text-xs text-muted-foreground">{achievement.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs font-medium ${rarity.text}`}>
              {rarityNames[achievement.rarity]}
            </span>
            <span className="text-xs text-[#FFD700]">+{achievement.xpReward} XP</span>
          </div>
          {!achievement.unlocked && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progreso</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <Progress 
                value={(achievement.progress / achievement.maxProgress) * 100} 
                className="h-1.5"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Componente de Lista de Logros
interface AchievementsListProps {
  category?: Achievement['category'];
  showLocked?: boolean;
}

export function AchievementsList({ category, showLocked = true }: AchievementsListProps) {
  const filteredAchievements = achievements.filter(a => {
    if (category && a.category !== category) return false;
    if (!showLocked && !a.unlocked) return false;
    return true;
  });

  const unlockedCount = filteredAchievements.filter(a => a.unlocked).length;
  const totalXP = filteredAchievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex items-center justify-between p-4 bg-card rounded-xl border-2 border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
            <Trophy className="w-6 h-6 text-black" />
          </div>
          <div>
            <p className="text-2xl font-bold">{unlockedCount}/{filteredAchievements.length}</p>
            <p className="text-sm text-muted-foreground">Logros desbloqueados</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#FFD700]">{totalXP.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">XP ganado</p>
        </div>
      </div>

      {/* Grid de logros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAchievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border-2 border-border hover:border-[#FFD700]/50 transition-colors"
          >
            <AchievementBadge achievement={achievement} showProgress />
            <p className="text-sm font-medium text-center line-clamp-2">{achievement.title}</p>
            {achievement.unlocked && (
              <span className="text-xs text-[#FFD700]">+{achievement.xpReward} XP</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Componente de Notificación de Logro Desbloqueado
interface AchievementUnlockNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementUnlockNotification({ 
  achievement, 
  onClose 
}: AchievementUnlockNotificationProps) {
  const Icon = achievement.icon;
  const rarity = rarityColors[achievement.rarity];

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[100]"
    >
      <div className={`
        relative overflow-hidden
        bg-gradient-to-r ${rarity.bg}
        rounded-2xl p-6 shadow-2xl
        border-4 ${rarity.border}
        min-w-[300px]
      `}>
        {/* Partículas de celebración */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>

        <div className="relative flex items-center gap-4">
          {/* Icono */}
          <motion.div
            className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Texto */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white/80">¡Logro Desbloqueado!</span>
            </div>
            <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
            <p className="text-sm text-white/70">{achievement.description}</p>
            <p className="text-sm font-bold text-white mt-1">+{achievement.xpReward} XP</p>
          </div>
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}

// Hook para gestionar logros
export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    const stored = localStorage.getItem('ululato_achievements');
    return stored ? JSON.parse(stored) : achievements.filter(a => a.unlocked).map(a => a.id);
  });
  
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);

  useEffect(() => {
    localStorage.setItem('ululato_achievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  const unlockAchievement = (achievementId: string) => {
    if (unlockedAchievements.includes(achievementId)) return;
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return;

    setUnlockedAchievements(prev => [...prev, achievementId]);
    setNewUnlock(achievement);
    
    toast.success(`¡Logro desbloqueado: ${achievement.title}!`, {
      description: `+${achievement.xpReward} XP`,
    });
  };

  const isUnlocked = (achievementId: string) => unlockedAchievements.includes(achievementId);

  const getProgress = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    return achievement ? achievement.progress : 0;
  };

  const getTotalXP = () => {
    return achievements
      .filter(a => unlockedAchievements.includes(a.id))
      .reduce((sum, a) => sum + a.xpReward, 0);
  };

  return {
    achievements,
    unlockedAchievements,
    unlockAchievement,
    isUnlocked,
    getProgress,
    getTotalXP,
    newUnlock,
    clearNewUnlock: () => setNewUnlock(null),
  };
}

// Componente de Resumen de Logros (para mostrar en perfil)
export function AchievementsSummary() {
  const { achievements: allAchievements, getTotalXP } = useAchievements();
  const unlockedCount = allAchievements.filter(a => a.unlocked).length;
  const recentAchievements = allAchievements
    .filter(a => a.unlocked)
    .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
    .slice(0, 5);

  return (
    <div className="bg-card border-2 border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold font-display">Mis Logros</h3>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FFD700]" />
          <span className="font-bold">{unlockedCount}/{allAchievements.length}</span>
        </div>
      </div>

      {/* XP Total */}
      <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">XP Total</span>
          <span className="text-2xl font-bold text-[#FFD700]">{getTotalXP().toLocaleString()}</span>
        </div>
      </div>

      {/* Logros recientes */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Logros recientes</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recentAchievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
