/**
 * Ululato Premium - Panel de Notas Personales
 * Sistema para guardar apuntes vinculados a momentos específicos de cada lección
 */
import { useState, useEffect } from 'react';
import { 
  StickyNote, Plus, Trash2, Edit3, Save, X, Clock, 
  Search, Tag, ChevronDown, ChevronUp, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Note {
  id: string;
  lectureId: string;
  lectureName: string;
  timestamp: number; // segundos
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NotesPanelProps {
  courseId: string;
  currentLectureId: string;
  currentLectureName: string;
  currentTimestamp?: number;
}

// Notas de ejemplo
const sampleNotes: Note[] = [
  {
    id: '1',
    lectureId: 'l1',
    lectureName: 'Bienvenida al Curso',
    timestamp: 120,
    content: 'Importante: El instructor menciona que la práctica constante es clave para el éxito. Dedicar al menos 30 minutos diarios.',
    tags: ['importante', 'práctica'],
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: '2',
    lectureId: 'l2',
    lectureName: '¿Qué es la Estrategia Empresarial?',
    timestamp: 450,
    content: 'Definición clave: La estrategia empresarial es el plan de acción diseñado para alcanzar los objetivos a largo plazo de una organización.',
    tags: ['definición', 'concepto'],
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-11'),
  },
];

export default function NotesPanel({ 
  courseId, 
  currentLectureId, 
  currentLectureName,
  currentTimestamp = 0 
}: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

  // Obtener todas las etiquetas únicas
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

  // Filtrar notas
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.lectureName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === null || note.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim()) {
      toast.error('El contenido de la nota no puede estar vacío');
      return;
    }

    const tags = newNoteTags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const newNote: Note = {
      id: Date.now().toString(),
      lectureId: currentLectureId,
      lectureName: currentLectureName,
      timestamp: currentTimestamp,
      content: newNoteContent,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    setNewNoteContent('');
    setNewNoteTags('');
    setIsAddingNote(false);
    toast.success('Nota guardada exitosamente');
  };

  const handleUpdateNote = (noteId: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, content, updatedAt: new Date() }
        : note
    ));
    setEditingNoteId(null);
    toast.success('Nota actualizada');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
    toast.success('Nota eliminada');
  };

  const toggleNoteExpanded = (noteId: string) => {
    const newExpanded = new Set(expandedNotes);
    if (newExpanded.has(noteId)) {
      newExpanded.delete(noteId);
    } else {
      newExpanded.add(noteId);
    }
    setExpandedNotes(newExpanded);
  };

  const exportNotes = () => {
    const content = filteredNotes.map(note => 
      `## ${note.lectureName} (${formatTimestamp(note.timestamp)})\n\n${note.content}\n\nEtiquetas: ${note.tags.join(', ')}\n\n---\n`
    ).join('\n');

    const blob = new Blob([`# Mis Notas del Curso\n\n${content}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mis-notas-ululato.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Notas exportadas');
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border-2 border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-[#003366]/20 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold font-display flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-[#FFD700]" />
            Mis Notas
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportNotes}
              className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
            >
              <Download className="w-4 h-4 mr-1" />
              Exportar
            </Button>
            <Button
              size="sm"
              onClick={() => setIsAddingNote(true)}
              className="btn-premium"
            >
              <Plus className="w-4 h-4 mr-1" />
              Nueva Nota
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar notas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 input-premium text-sm"
            />
          </div>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setFilterTag(null)}
              className={cn(
                "text-xs px-2 py-1 rounded-full transition-colors",
                filterTag === null 
                  ? "bg-[#FFD700] text-black" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Todas
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag === filterTag ? null : tag)}
                className={cn(
                  "text-xs px-2 py-1 rounded-full transition-colors",
                  filterTag === tag 
                    ? "bg-[#FFD700] text-black" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add Note Form */}
      <AnimatePresence>
        {isAddingNote && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border overflow-hidden"
          >
            <div className="p-4 space-y-3 bg-[#FFD700]/5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{currentLectureName}</span>
                <span>•</span>
                <span className="font-mono text-[#FFD700]">{formatTimestamp(currentTimestamp)}</span>
              </div>
              <Textarea
                placeholder="Escribe tu nota aquí..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="input-premium min-h-[100px]"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Etiquetas (separadas por coma)"
                  value={newNoteTags}
                  onChange={(e) => setNewNoteTags(e.target.value)}
                  className="input-premium text-sm"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddingNote(false);
                    setNewNoteContent('');
                    setNewNoteTags('');
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddNote}
                  className="btn-premium"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Guardar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <StickyNote className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">No hay notas</p>
            <p className="text-sm">Comienza a tomar apuntes durante las lecciones</p>
          </div>
        ) : (
          filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-background border border-border rounded-lg overflow-hidden hover:border-[#FFD700]/30 transition-colors"
            >
              {/* Note Header */}
              <div 
                className="p-3 flex items-start justify-between cursor-pointer"
                onClick={() => toggleNoteExpanded(note.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-foreground">{note.lectureName}</span>
                    <span>•</span>
                    <span className="font-mono text-[#FFD700]">{formatTimestamp(note.timestamp)}</span>
                  </div>
                  <p className={cn(
                    "text-sm",
                    !expandedNotes.has(note.id) && "line-clamp-2"
                  )}>
                    {editingNoteId === note.id ? (
                      <Textarea
                        defaultValue={note.content}
                        className="input-premium text-sm"
                        onClick={(e) => e.stopPropagation()}
                        onBlur={(e) => handleUpdateNote(note.id, e.target.value)}
                        autoFocus
                      />
                    ) : (
                      note.content
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {expandedNotes.has(note.id) ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedNotes.has(note.id) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 pt-0 border-t border-border">
                      {/* Tags */}
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map(tag => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {note.updatedAt.toLocaleDateString('es-ES', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingNoteId(note.id);
                            }}
                            className="p-1.5 text-muted-foreground hover:text-[#FFD700] transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNote(note.id);
                            }}
                            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-3 border-t border-border bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
        <span>{filteredNotes.length} nota{filteredNotes.length !== 1 ? 's' : ''}</span>
        <span>{allTags.length} etiqueta{allTags.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
