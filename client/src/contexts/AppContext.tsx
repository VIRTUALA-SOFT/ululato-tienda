import React, { createContext, useContext, useState, ReactNode } from 'react';
import { courses, currentUser } from '@/data/mocks';

interface Note {
  courseId: string;
  lectureId: string;
  timestamp: string;
  content: string;
}

interface AppContextType {
  cart: string[];
  wishlist: string[];
  notes: Note[];
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  toggleWishlist: (courseId: string) => void;
  addNote: (note: Note) => void;
  getCartTotal: () => number;
  getCartItems: () => any[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>(currentUser.cart);
  const [wishlist, setWishlist] = useState<string[]>(currentUser.wishlist);
  const [notes, setNotes] = useState<Note[]>([]);

  const addToCart = (courseId: string) => {
    if (!cart.includes(courseId)) {
      setCart([...cart, courseId]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCart(cart.filter(id => id !== courseId));
  };

  const toggleWishlist = (courseId: string) => {
    if (wishlist.includes(courseId)) {
      setWishlist(wishlist.filter(id => id !== courseId));
    } else {
      setWishlist([...wishlist, courseId]);
    }
  };

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
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

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        notes,
        addToCart,
        removeFromCart,
        toggleWishlist,
        addNote,
        getCartTotal,
        getCartItems,
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
