/**
 * Ululato Premium - Reproductor de Video Interactivo
 * Con marcadores de tiempo, velocidad ajustable y transcripciones sincronizadas
 */
import { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Settings, 
  SkipBack, SkipForward, Bookmark, BookmarkCheck, 
  ChevronDown, Clock, FileText, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Marker {
  id: string;
  time: number;
  label: string;
}

interface TranscriptLine {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  title: string;
  duration: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

// Datos de ejemplo para transcripciones
const sampleTranscript: TranscriptLine[] = [
  { id: '1', startTime: 0, endTime: 5, text: 'Bienvenidos a esta lección. Hoy vamos a explorar conceptos fundamentales.' },
  { id: '2', startTime: 5, endTime: 12, text: 'Es importante entender que el aprendizaje es un proceso continuo.' },
  { id: '3', startTime: 12, endTime: 20, text: 'Vamos a comenzar con los fundamentos básicos antes de avanzar a temas más complejos.' },
  { id: '4', startTime: 20, endTime: 28, text: 'Recuerden tomar notas de los puntos clave que mencionaremos.' },
  { id: '5', startTime: 28, endTime: 35, text: 'Si tienen preguntas, pueden pausar el video y revisarlas en la sección de Q&A.' },
  { id: '6', startTime: 35, endTime: 45, text: 'Ahora, profundicemos en el primer tema de nuestra agenda de hoy.' },
];

export default function VideoPlayer({ 
  videoUrl, 
  posterUrl, 
  title, 
  duration,
  onProgress,
  onComplete 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeTranscriptId, setActiveTranscriptId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Simular duración basada en el string de duración
  useEffect(() => {
    const parts = duration.split(':');
    if (parts.length === 2) {
      const mins = parseInt(parts[0]);
      const secs = parseInt(parts[1]);
      setTotalDuration(mins * 60 + secs);
    }
  }, [duration]);

  // Actualizar transcripción activa
  useEffect(() => {
    const activeLine = sampleTranscript.find(
      line => currentTime >= line.startTime && currentTime < line.endTime
    );
    if (activeLine) {
      setActiveTranscriptId(activeLine.id);
    }
  }, [currentTime]);

  // Simular progreso del video
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && totalDuration > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + (playbackSpeed * 0.1);
          if (newTime >= totalDuration) {
            setIsPlaying(false);
            onComplete?.();
            return totalDuration;
          }
          onProgress?.(newTime / totalDuration * 100);
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration, playbackSpeed, onComplete, onProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && totalDuration > 0) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      setCurrentTime(pos * totalDuration);
    }
  };

  const addMarker = () => {
    const newMarker: Marker = {
      id: Date.now().toString(),
      time: currentTime,
      label: `Marcador ${markers.length + 1}`,
    };
    setMarkers([...markers, newMarker]);
  };

  const removeMarker = (id: string) => {
    setMarkers(markers.filter(m => m.id !== id));
  };

  const jumpToMarker = (time: number) => {
    setCurrentTime(time);
  };

  const skip = (seconds: number) => {
    setCurrentTime(prev => Math.max(0, Math.min(totalDuration, prev + seconds)));
  };

  const jumpToTranscript = (startTime: number) => {
    setCurrentTime(startTime);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className={cn(
      "relative bg-black rounded-xl overflow-hidden group",
      isFullscreen && "fixed inset-0 z-50 rounded-none"
    )}>
      {/* Video/Poster */}
      <div 
        className="relative aspect-video cursor-pointer"
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => !isPlaying && setShowControls(true)}
      >
        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#003366] to-[#001a33] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-[#FFD700] ml-2" />
              </div>
              <p className="text-white/60 text-sm">Video de demostración</p>
            </div>
          </div>
        )}

        {/* Play/Pause Overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-[#FFD700] flex items-center justify-center shadow-2xl"
              >
                <Play className="w-10 h-10 text-black ml-1" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12"
          >
            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className="relative h-2 bg-white/20 rounded-full cursor-pointer mb-4 group/progress"
              onClick={handleProgressClick}
            >
              {/* Markers */}
              {markers.map(marker => (
                <div
                  key={marker.id}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFD700] rounded-full cursor-pointer z-10 hover:scale-125 transition-transform"
                  style={{ left: `${(marker.time / totalDuration) * 100}%` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpToMarker(marker.time);
                  }}
                  title={`${marker.label} - ${formatTime(marker.time)}`}
                />
              ))}
              
              {/* Progress Fill */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#FFD700] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
              
              {/* Hover Preview */}
              <div 
                className="absolute top-0 left-0 h-full bg-white/30 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFD700] hover:text-black flex items-center justify-center transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                {/* Skip Buttons */}
                <button
                  onClick={() => skip(-10)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => skip(10)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <div className="w-20 hidden sm:block">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={([val]) => {
                        setVolume(val / 100);
                        setIsMuted(val === 0);
                      }}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* Time */}
                <span className="text-sm text-white/70 font-mono">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Add Marker */}
                <button
                  onClick={addMarker}
                  className="p-2 text-white/70 hover:text-[#FFD700] transition-colors"
                  title="Añadir marcador"
                >
                  <Bookmark className="w-5 h-5" />
                </button>

                {/* Transcript Toggle */}
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={cn(
                    "p-2 transition-colors",
                    showTranscript ? "text-[#FFD700]" : "text-white/70 hover:text-white"
                  )}
                  title="Transcripción"
                >
                  <FileText className="w-5 h-5" />
                </button>

                {/* Speed */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 px-2 py-1 text-sm text-white/70 hover:text-white transition-colors">
                      <Clock className="w-4 h-4" />
                      {playbackSpeed}x
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    {speedOptions.map(speed => (
                      <DropdownMenuItem
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={cn(
                          "cursor-pointer",
                          playbackSpeed === speed && "text-[#FFD700]"
                        )}
                      >
                        {speed}x {speed === 1 && '(Normal)'}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Settings */}
                <button className="p-2 text-white/70 hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Markers Panel */}
      {markers.length > 0 && (
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 max-w-xs">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-[#FFD700]" />
            Marcadores
          </h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {markers.map(marker => (
              <div
                key={marker.id}
                className="flex items-center justify-between gap-2 text-xs group/marker"
              >
                <button
                  onClick={() => jumpToMarker(marker.time)}
                  className="text-white/70 hover:text-[#FFD700] transition-colors"
                >
                  {formatTime(marker.time)} - {marker.label}
                </button>
                <button
                  onClick={() => removeMarker(marker.id)}
                  className="text-white/30 hover:text-red-500 opacity-0 group-hover/marker:opacity-100 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transcript Panel */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-0 right-0 bottom-0 w-80 bg-black/90 backdrop-blur-sm border-l border-white/10 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h4 className="font-semibold text-white">Transcripción</h4>
              <button
                onClick={() => setShowTranscript(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-60px)]">
              {sampleTranscript.map(line => (
                <button
                  key={line.id}
                  onClick={() => jumpToTranscript(line.startTime)}
                  className={cn(
                    "block w-full text-left p-3 rounded-lg transition-all",
                    activeTranscriptId === line.id
                      ? "bg-[#FFD700]/20 text-white border-l-2 border-[#FFD700]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="text-xs text-[#FFD700] font-mono block mb-1">
                    {formatTime(line.startTime)}
                  </span>
                  <span className="text-sm">{line.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Fullscreen Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 left-4 p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
