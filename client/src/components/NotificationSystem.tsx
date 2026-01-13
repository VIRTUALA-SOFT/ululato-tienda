/**
 * Ululato Premium - Sistema de Notificaciones
 * Notificaciones elegantes para recordatorios, actualizaciones y ofertas
 */
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, BookOpen, Gift, Clock, MessageSquare, 
  Award, Flame, AlertCircle, CheckCircle, Info,
  Volume2, VolumeX, Settings, LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

// Tipos de notificación
export type NotificationType = 'info' | 'success' | 'warning' | 'course' | 'offer' | 'reminder' | 'achievement' | 'social';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  image?: string;
  persistent?: boolean;
}

// Iconos por tipo
const notificationIcons: Record<NotificationType, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  course: BookOpen,
  offer: Gift,
  reminder: Clock,
  achievement: Award,
  social: MessageSquare,
};

// Colores por tipo
const notificationColors: Record<NotificationType, { bg: string; border: string; icon: string }> = {
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'text-blue-400' },
  success: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: 'text-green-400' },
  warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: 'text-yellow-400' },
  course: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: 'text-purple-400' },
  offer: { bg: 'bg-[#FFD700]/10', border: 'border-[#FFD700]/30', icon: 'text-[#FFD700]' },
  reminder: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: 'text-orange-400' },
  achievement: { bg: 'bg-[#FFD700]/10', border: 'border-[#FFD700]/30', icon: 'text-[#FFD700]' },
  social: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: 'text-cyan-400' },
};

// Notificaciones de ejemplo
const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'course',
    title: '¡Nuevo curso disponible!',
    message: 'Aprende Wayuunaiki - El idioma ancestral del pueblo Wayuu ya está disponible.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    read: false,
    actionUrl: '/course/wayuu-language',
    actionLabel: 'Ver curso',
    image: '/images/wayuu-course-thumb-premium.png'
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Continúa tu racha',
    message: 'Has estudiado 5 días seguidos. ¡No pierdas tu racha de aprendizaje!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionUrl: '/mi-aprendizaje',
    actionLabel: 'Continuar'
  },
  {
    id: '3',
    type: 'offer',
    title: '¡Oferta especial!',
    message: 'Usa el código WAYUU50 para obtener 50% de descuento en el curso de Wayuunaiki.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    actionUrl: '/course/wayuu-language',
    actionLabel: 'Aplicar cupón'
  },
  {
    id: '4',
    type: 'achievement',
    title: '¡Logro desbloqueado!',
    message: 'Has obtenido el badge "Semana de Fuego" por mantener una racha de 7 días.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: '/perfil',
    actionLabel: 'Ver logros'
  },
  {
    id: '5',
    type: 'social',
    title: 'Nueva respuesta en el foro',
    message: 'María García respondió a tu pregunta en el curso de Estrategia Empresarial.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    actionUrl: '/foro/business-strategy',
    actionLabel: 'Ver respuesta'
  },
];

// Contexto de notificaciones
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  settings: NotificationSettings;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
}

interface NotificationSettings {
  soundEnabled: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  courseUpdates: boolean;
  offers: boolean;
  reminders: boolean;
  social: boolean;
}

const defaultSettings: NotificationSettings = {
  soundEnabled: true,
  pushEnabled: true,
  emailEnabled: true,
  courseUpdates: true,
  offers: true,
  reminders: true,
  social: true,
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const stored = localStorage.getItem('ululato_notifications');
    return stored ? JSON.parse(stored) : sampleNotifications;
  });

  const [settings, setSettings] = useState<NotificationSettings>(() => {
    const stored = localStorage.getItem('ululato_notification_settings');
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('ululato_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ululato_notification_settings', JSON.stringify(settings));
  }, [settings]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Reproducir sonido si está habilitado
    if (settings.soundEnabled) {
      // Aquí se podría reproducir un sonido de notificación
    }
  }, [settings.soundEnabled]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAll,
      settings,
      updateSettings,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

// Componente de notificación individual
interface NotificationItemProps {
  notification: Notification;
  onRead: () => void;
  onRemove: () => void;
}

function NotificationItem({ notification, onRead, onRemove }: NotificationItemProps) {
  const Icon = notificationIcons[notification.type];
  const colors = notificationColors[notification.type];

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'Ahora';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Hace ${days}d`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`
        relative p-4 rounded-xl border-2
        ${colors.bg} ${colors.border}
        ${!notification.read ? 'bg-opacity-100' : 'bg-opacity-50'}
        transition-all duration-300 hover:scale-[1.02]
      `}
      onClick={onRead}
    >
      <div className="flex gap-4">
        {/* Icono o imagen */}
        {notification.image ? (
          <img 
            src={notification.image} 
            alt="" 
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
        )}

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
              {notification.title}
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {notification.message}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {timeAgo(notification.timestamp)}
            </span>
            {notification.actionUrl && (
              <a
                href={notification.actionUrl}
                className="text-xs font-medium text-[#FFD700] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {notification.actionLabel || 'Ver más'}
              </a>
            )}
          </div>
        </div>

        {/* Indicador de no leído */}
        {!notification.read && (
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#FFD700]" />
        )}
      </div>
    </motion.div>
  );
}

// Panel de notificaciones
export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    clearAll 
  } = useNotifications();

  const [showSettings, setShowSettings] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full right-0 mt-2 w-96 max-h-[500px] bg-card border-2 border-border rounded-xl shadow-2xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#FFD700]" />
          <h3 className="font-bold">Notificaciones</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-bold bg-[#DC143C] text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-[#FFD700] hover:underline"
            >
              Marcar todo como leído
            </button>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <NotificationSettingsPanel onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>

      {/* Lista de notificaciones */}
      <div className="max-h-[350px] overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={() => markAsRead(notification.id)}
                onRemove={() => removeNotification(notification.id)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No tienes notificaciones</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-border">
          <button
            onClick={clearAll}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Limpiar todas las notificaciones
          </button>
        </div>
      )}
    </motion.div>
  );
}

// Panel de configuración de notificaciones
function NotificationSettingsPanel({ onClose }: { onClose: () => void }) {
  const { settings, updateSettings } = useNotifications();

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="border-b border-border overflow-hidden"
    >
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Configuración</h4>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-sm">Sonido</span>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Actualizaciones de cursos</span>
            <Switch
              checked={settings.courseUpdates}
              onCheckedChange={(checked) => updateSettings({ courseUpdates: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Ofertas y promociones</span>
            <Switch
              checked={settings.offers}
              onCheckedChange={(checked) => updateSettings({ offers: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Recordatorios de estudio</span>
            <Switch
              checked={settings.reminders}
              onCheckedChange={(checked) => updateSettings({ reminders: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Actividad social</span>
            <Switch
              checked={settings.social}
              onCheckedChange={(checked) => updateSettings({ social: checked })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Toast de notificación emergente
interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
}

export function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const Icon = notificationIcons[notification.type];
  const colors = notificationColors[notification.type];

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className={`
        fixed bottom-4 right-4 z-[100]
        max-w-sm p-4 rounded-xl
        bg-card border-2 ${colors.border}
        shadow-2xl
      `}
    >
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{notification.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {notification.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// Botón de notificaciones para el header
export function NotificationButton() {
  const { unreadCount } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-white hover:text-[#FFD700] hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#DC143C] text-white text-xs font-bold rounded-full border-2 border-[#003366]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <NotificationPanel onClose={() => setIsOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
