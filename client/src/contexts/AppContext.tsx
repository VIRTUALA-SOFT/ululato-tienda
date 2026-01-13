/**
 * Ululato Premium - Contexto de Aplicación
 * Manejo de carrito, wishlist y notas con persistencia en localStorage
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { courses, currentUser } from '@/data/mocks';

// Claves de localStorage
const STORAGE_KEYS = {
  CART: 'ululato_cart',
  WISHLIST: 'ululato_wishlist',
  NOTES: 'ululato_notes',
};

interface Note {
  id: string;
  courseId: string;
  lectureId: string;
  timestamp: string;
  content: string;
  createdAt: string;
}

interface AppContextType {
  cart: string[];
  wishlist: string[];
  notes: Note[];
  isLoading: boolean;
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  toggleWishlist: (courseId: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  deleteNote: (noteId: string) => void;
  updateNote: (noteId: string, content: string) => void;
  getCartTotal: () => number;
  getCartItems: () => any[];
  isInCart: (courseId: string) => boolean;
  isInWishlist: (courseId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Funciones de utilidad para localStorage
function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Cargar datos desde localStorage al montar
  useEffect(() => {
    const savedCart = loadFromStorage<string[]>(STORAGE_KEYS.CART, currentUser.cart);
    const savedWishlist = loadFromStorage<string[]>(STORAGE_KEYS.WISHLIST, currentUser.wishlist);
    const savedNotes = loadFromStorage<Note[]>(STORAGE_KEYS.NOTES, []);
    
    setCart(savedCart);
    setWishlist(savedWishlist);
    setNotes(savedNotes);
    setIsLoading(false);
  }, []);

  // Persistir carrito en localStorage
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.CART, cart);
    }
  }, [cart, isLoading]);

  // Persistir wishlist en localStorage
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.WISHLIST, wishlist);
    }
  }, [wishlist, isLoading]);

  // Persistir notas en localStorage
  useEffect(() => {
    if (!isLoading) {
      saveToStorage(STORAGE_KEYS.NOTES, notes);
    }
  }, [notes, isLoading]);

  const addToCart = (courseId: string) => {
    if (!cart.includes(courseId)) {
      setCart(prev => [...prev, courseId]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCart(prev => prev.filter(id => id !== courseId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (courseId: string) => {
    setWishlist(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...note,
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [...prev, newNote]);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const updateNote = (noteId: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, content } : note
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, courseId) => {
      const course = courses.find(c => c.id === courseId);
      return total + (course?.price || 0);
    }, 0);
  };

  const getCartItems = () => {
    return cart.map(courseId => courses.find(c => c.id === courseId)).filter(Boolean);
  };

  const isInCart = (courseId: string) => cart.includes(courseId);
  
  const isInWishlist = (courseId: string) => wishlist.includes(courseId);

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        notes,
        isLoading,
        addToCart,
        removeFromCart,
        clearCart,
        toggleWishlist,
        addNote,
        deleteNote,
        updateNote,
        getCartTotal,
        getCartItems,
        isInCart,
        isInWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
