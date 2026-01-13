/**
 * Ululato Premium - Contexto de Idioma
 * Sistema multilenguaje: Español, Inglés, Wayuunaiki
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en' | 'way';

interface Translations {
  [key: string]: {
    es: string;
    en: string;
    way: string;
  };
}

// Traducciones principales
export const translations: Translations = {
  // Header
  'nav.home': { es: 'Inicio', en: 'Home', way: 'Eere' },
  'nav.courses': { es: 'Cursos', en: 'Courses', way: 'Ekirajaaya' },
  'nav.categories': { es: 'Categorías', en: 'Categories', way: 'Akuwaipa' },
  'nav.myLearning': { es: 'Mi Aprendizaje', en: 'My Learning', way: 'Takirajaa' },
  'nav.cart': { es: 'Carrito', en: 'Cart', way: 'Amüchi' },
  'nav.search': { es: 'Buscar cursos...', en: 'Search courses...', way: 'Achajaa ekirajaaya...' },
  'nav.login': { es: 'Iniciar Sesión', en: 'Log In', way: 'Antaa' },
  'nav.register': { es: 'Registrarse', en: 'Sign Up', way: 'Ashajaa' },
  'nav.profile': { es: 'Mi Perfil', en: 'My Profile', way: 'Taa' },
  'nav.instructor': { es: 'Panel de Instructor', en: 'Instructor Dashboard', way: 'Ekirajüi' },
  'nav.logout': { es: 'Cerrar Sesión', en: 'Log Out', way: 'Ojuitaa' },

  // Hero
  'hero.title': { es: 'El tejido que nos une', en: 'The weave that unites us', way: 'Süsüin wanüiki' },
  'hero.subtitle': { es: 'Aprende, crece y conecta con una comunidad global', en: 'Learn, grow and connect with a global community', way: 'Ekirajaa, ayataa otta wayuu süpüla mmakat' },
  'hero.cta': { es: 'Explorar Cursos', en: 'Explore Courses', way: 'Alataa ekirajaaya' },
  'hero.secondary': { es: 'Ver Demo', en: 'Watch Demo', way: 'Aapaa' },

  // Courses
  'course.addToCart': { es: 'Añadir al Carrito', en: 'Add to Cart', way: 'Akumajaa amüchimüin' },
  'course.buyNow': { es: 'Comprar Ahora', en: 'Buy Now', way: 'Ayaawataa joolu' },
  'course.preview': { es: 'Vista Previa', en: 'Preview', way: 'Aapaa palajana' },
  'course.students': { es: 'estudiantes', en: 'students', way: 'ekirajünüü' },
  'course.reviews': { es: 'reseñas', en: 'reviews', way: 'pütchi' },
  'course.hours': { es: 'horas', en: 'hours', way: 'joora' },
  'course.level': { es: 'Nivel', en: 'Level', way: 'Akuwaipa' },
  'course.beginner': { es: 'Principiante', en: 'Beginner', way: 'Palajana' },
  'course.intermediate': { es: 'Intermedio', en: 'Intermediate', way: 'Apünüin' },
  'course.advanced': { es: 'Avanzado', en: 'Advanced', way: 'Müliashi' },
  'course.bestseller': { es: 'Más Vendido', en: 'Bestseller', way: 'Kojutüsü' },
  'course.new': { es: 'Nuevo', en: 'New', way: 'Jeketü' },
  'course.whatYouWillLearn': { es: 'Lo que aprenderás', en: 'What you will learn', way: 'Kasain pekirajüinjatüin' },
  'course.curriculum': { es: 'Contenido del Curso', en: 'Course Content', way: 'Süchiki ekirajaaya' },
  'course.instructor': { es: 'Instructor', en: 'Instructor', way: 'Ekirajüi' },
  'course.overview': { es: 'Descripción', en: 'Overview', way: 'Süchiki' },
  'course.qa': { es: 'Preguntas', en: 'Q&A', way: 'Achajawaa' },
  'course.notes': { es: 'Notas', en: 'Notes', way: 'Ashajaa' },
  'course.forum': { es: 'Foro', en: 'Forum', way: 'Pütchimaajatü' },

  // Cart
  'cart.title': { es: 'Carrito de Compras', en: 'Shopping Cart', way: 'Amüchi ayaawataa' },
  'cart.empty': { es: 'Tu carrito está vacío', en: 'Your cart is empty', way: 'Nnojotsü amüchi' },
  'cart.subtotal': { es: 'Subtotal', en: 'Subtotal', way: 'Süpüla' },
  'cart.total': { es: 'Total', en: 'Total', way: 'Süpüshua' },
  'cart.checkout': { es: 'Proceder al Pago', en: 'Proceed to Checkout', way: 'Ayaawataa' },
  'cart.coupon': { es: 'Código de cupón', en: 'Coupon code', way: 'Pütchi ayaawataa' },
  'cart.apply': { es: 'Aplicar', en: 'Apply', way: 'Akumajaa' },
  'cart.remove': { es: 'Eliminar', en: 'Remove', way: 'Ojuitaa' },
  'cart.saveForLater': { es: 'Guardar para después', en: 'Save for later', way: 'Anaajaa' },

  // Auth
  'auth.welcome': { es: 'Bienvenido de vuelta', en: 'Welcome back', way: 'Anashi pia antüin' },
  'auth.createAccount': { es: 'Crea tu cuenta', en: 'Create your account', way: 'Akumajaa paa' },
  'auth.email': { es: 'Correo electrónico', en: 'Email', way: 'Karalouta' },
  'auth.password': { es: 'Contraseña', en: 'Password', way: 'Pütchi anaajünüsü' },
  'auth.name': { es: 'Nombre completo', en: 'Full name', way: 'Panülia' },
  'auth.forgotPassword': { es: '¿Olvidaste tu contraseña?', en: 'Forgot password?', way: '¿Mojusü pütchi?' },
  'auth.rememberMe': { es: 'Recordarme', en: 'Remember me', way: 'Sotüin taa' },
  'auth.noAccount': { es: '¿No tienes una cuenta?', en: "Don't have an account?", way: '¿Nnojotsü paa?' },
  'auth.hasAccount': { es: '¿Ya tienes una cuenta?', en: 'Already have an account?', way: '¿Eesü paa?' },

  // Footer
  'footer.explore': { es: 'Explorar', en: 'Explore', way: 'Alataa' },
  'footer.community': { es: 'Comunidad', en: 'Community', way: 'Wayuukana' },
  'footer.support': { es: 'Soporte', en: 'Support', way: 'Akaaliinjaa' },
  'footer.contact': { es: 'Contacto', en: 'Contact', way: 'Pütchi' },
  'footer.rights': { es: 'Todos los derechos reservados', en: 'All rights reserved', way: 'Süpüshua anaajünüsü' },
  'footer.madeWith': { es: 'Hecho con', en: 'Made with', way: 'Akumajünüsü sümaa' },
  'footer.inColombia': { es: 'en Colombia', en: 'in Colombia', way: 'Kolompiamüin' },

  // General
  'general.loading': { es: 'Cargando...', en: 'Loading...', way: 'Eejünüsü...' },
  'general.error': { es: 'Error', en: 'Error', way: 'Mojusü' },
  'general.success': { es: 'Éxito', en: 'Success', way: 'Anasü' },
  'general.save': { es: 'Guardar', en: 'Save', way: 'Anaajaa' },
  'general.cancel': { es: 'Cancelar', en: 'Cancel', way: 'Ojuitaa' },
  'general.edit': { es: 'Editar', en: 'Edit', way: 'Akumajaa' },
  'general.delete': { es: 'Eliminar', en: 'Delete', way: 'Ojuitaa' },
  'general.search': { es: 'Buscar', en: 'Search', way: 'Achajaa' },
  'general.filter': { es: 'Filtrar', en: 'Filter', way: 'Alatiraa' },
  'general.all': { es: 'Todos', en: 'All', way: 'Süpüshua' },
  'general.more': { es: 'Ver más', en: 'See more', way: 'Aapaa wanee' },
  'general.less': { es: 'Ver menos', en: 'See less', way: 'Aapaa meenüsü' },

  // Categories
  'category.development': { es: 'Desarrollo', en: 'Development', way: 'Akumajaa' },
  'category.business': { es: 'Negocios', en: 'Business', way: 'Ayaawataa' },
  'category.design': { es: 'Diseño', en: 'Design', way: 'Akumajaa' },
  'category.marketing': { es: 'Marketing', en: 'Marketing', way: 'Ayaawataa' },
  'category.dataScience': { es: 'Ciencia de Datos', en: 'Data Science', way: 'Ekirajaa pütchi' },
  'category.finance': { es: 'Finanzas', en: 'Finance', way: 'Nneerü' },
  'category.languages': { es: 'Idiomas', en: 'Languages', way: 'Anüikii' },

  // Wayuu specific
  'wayuu.greeting': { es: '¡Jamaya!', en: 'Hello!', way: 'Jamaya!' },
  'wayuu.thanks': { es: 'Gracias', en: 'Thank you', way: 'Anashi' },
  'wayuu.welcome': { es: 'Bienvenido', en: 'Welcome', way: 'Anashi pia antüin' },
  'wayuu.goodbye': { es: 'Hasta luego', en: 'Goodbye', way: 'Ayaawata' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageName: string;
  languageFlag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageNames: Record<Language, string> = {
  es: 'Español',
  en: 'English',
  way: 'Wayuunaiki',
};

const languageFlags: Record<Language, string> = {
  es: '🇨🇴',
  en: '🇺🇸',
  way: '🏜️',
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('ululato-language') as Language;
    if (savedLang && ['es', 'en', 'way'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ululato-language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.es || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      languageName: languageNames[language],
      languageFlag: languageFlags[language],
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
