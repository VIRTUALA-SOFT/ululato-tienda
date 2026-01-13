// Datos mock para Ululato LMS - Español Latinoamericano

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  students: number;
  courses: number;
  rating: number;
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

export interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Question {
  id: string;
  userName: string;
  userAvatar: string;
  question: string;
  date: string;
  answers: {
    id: string;
    userName: string;
    userAvatar: string;
    answer: string;
    date: string;
    isInstructor: boolean;
  }[];
}

export interface Course {
  id: string;
  title: string;
  instructor: Instructor;
  thumbnail: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  level: string;
  category: string;
  isBestseller: boolean;
  isNew: boolean;
  isFeatured?: boolean;
  sections: Section[];
  reviews: Review[];
  questions: Question[];
  whatYouWillLearn: string[];
}

export interface CartItem {
  courseId: string;
  course: Course;
}

// Categorías disponibles
export const categories = [
  { id: 'desarrollo', name: 'Desarrollo', slug: 'desarrollo' },
  { id: 'negocios', name: 'Negocios', slug: 'negocios' },
  { id: 'diseno', name: 'Diseño', slug: 'diseno' },
  { id: 'marketing', name: 'Marketing', slug: 'marketing' },
  { id: 'ciencia-datos', name: 'Ciencia de Datos', slug: 'ciencia-datos' },
  { id: 'finanzas', name: 'Finanzas', slug: 'finanzas' },
  { id: 'idiomas', name: 'Idiomas', slug: 'idiomas' },
];

// Instructores
export const instructors: Instructor[] = [
  {
    id: "1",
    name: "Dra. Sara Martínez",
    title: "Experta en Estrategia Empresarial",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    bio: "Ex consultora de McKinsey con más de 15 años de experiencia en estrategia corporativa y transformación empresarial.",
    students: 125000,
    courses: 12,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Alejandro Chen",
    title: "Diseñador UX Senior",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    bio: "Diseñador líder en empresas tecnológicas de primer nivel. Especialista en diseño centrado en el usuario y sistemas de diseño.",
    students: 98000,
    courses: 8,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Prof. Miguel Johnson",
    title: "Profesor de Ciencia de Datos",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    bio: "Doctorado en Ciencias de la Computación. Enseña ciencia de datos y aprendizaje automático en la Universidad de Stanford.",
    students: 210000,
    courses: 15,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Emma Williams",
    title: "Estratega de Marketing Digital",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    bio: "Ha ayudado a más de 500 empresas a crecer su presencia en línea. Experta en SEO, marketing de contenidos y redes sociales.",
    students: 87000,
    courses: 10,
    rating: 4.8,
  },
  {
    id: "5",
    name: "María Pushaina Epieyu",
    title: "Maestra de Lengua Wayuunaiki",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
    bio: "Nativa Wayuu de La Guajira, Colombia. Lingüista y educadora dedicada a preservar y enseñar el idioma Wayuunaiki. Más de 20 años de experiencia en educación intercultural bilingüe.",
    students: 15000,
    courses: 3,
    rating: 4.9,
  },
];

// Cursos
export const courses: Course[] = [
  {
    id: "1",
    title: "Masterclass de Estrategia Empresarial: De Cero a Líder del Mercado",
    instructor: instructors[0],
    thumbnail: "/images/course-thumb-business.png",
    description: "Domina el arte de la estrategia empresarial con marcos probados utilizados por empresas Fortune 500. Aprende a analizar mercados, identificar oportunidades y crear estrategias ganadoras que impulsen el crecimiento sostenible.",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 12453,
    studentCount: 125000,
    duration: "24 horas",
    level: "Intermedio",
    category: "negocios",
    isBestseller: true,
    isNew: false,
    whatYouWillLearn: [
      "Desarrollar estrategias empresariales integrales usando marcos probados",
      "Analizar paisajes competitivos e identificar oportunidades de mercado",
      "Crear planes estratégicos accionables para el crecimiento sostenible",
      "Dominar las Cinco Fuerzas de Porter, FODA y Estrategia del Océano Azul",
      "Liderar iniciativas estratégicas e impulsar el cambio organizacional",
    ],
    sections: [
      {
        id: "s1",
        title: "Introducción al Pensamiento Estratégico",
        lectures: [
          { id: "l1", title: "Bienvenida al Curso", duration: "5:30", completed: true },
          { id: "l2", title: "¿Qué es la Estrategia Empresarial?", duration: "12:45", completed: true },
          { id: "l3", title: "El Proceso de Planificación Estratégica", duration: "18:20", completed: false },
        ],
      },
      {
        id: "s2",
        title: "Análisis de Mercado e Inteligencia Competitiva",
        lectures: [
          { id: "l4", title: "Entendiendo Tu Mercado", duration: "22:15", completed: false },
          { id: "l5", title: "Marco de las Cinco Fuerzas de Porter", duration: "25:40", completed: false },
          { id: "l6", title: "Técnicas de Análisis Competitivo", duration: "19:30", completed: false },
        ],
      },
      {
        id: "s3",
        title: "Marcos y Herramientas Estratégicas",
        lectures: [
          { id: "l7", title: "Análisis FODA a Profundidad", duration: "16:50", completed: false },
          { id: "l8", title: "Estrategia del Océano Azul", duration: "28:15", completed: false },
          { id: "l9", title: "Matriz BCG y Gestión de Portafolio", duration: "21:00", completed: false },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Juan García",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-15",
        comment: "Este curso transformó completamente mi enfoque hacia la estrategia empresarial. La Dra. Martínez explica conceptos complejos de manera clara y accionable. ¡Altamente recomendado!",
      },
      {
        id: "r2",
        userName: "Laura Thompson",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-10",
        comment: "El mejor curso de estrategia empresarial que he tomado. Los marcos son inmediatamente aplicables a escenarios del mundo real.",
      },
    ],
    questions: [
      {
        id: "q1",
        userName: "Marcos Wilson",
        userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
        question: "¿Cómo aplico las Cinco Fuerzas de Porter en un entorno de startup?",
        date: "2024-01-18",
        answers: [
          {
            id: "a1",
            userName: "Dra. Sara Martínez",
            userAvatar: instructors[0].avatar,
            answer: "¡Excelente pregunta! Para startups, enfócate en la amenaza de nuevos entrantes y el poder de negociación de los clientes. Estas son típicamente las fuerzas más relevantes en empresas en etapa temprana. Cubriré esto en detalle en el próximo módulo.",
            date: "2024-01-18",
            isInstructor: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Dominio Completo de Diseño UI/UX: De Figma a Producción",
    instructor: instructors[1],
    thumbnail: "/images/course-thumb-design.png",
    description: "Conviértete en un diseñador UI/UX profesional. Aprende investigación de usuarios, wireframing, prototipado y sistemas de diseño. Domina Figma y crea interfaces impresionantes que los usuarios aman.",
    price: 79.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviewCount: 8932,
    studentCount: 98000,
    duration: "32 horas",
    level: "Todos los Niveles",
    category: "diseno",
    isBestseller: true,
    isNew: true,
    whatYouWillLearn: [
      "Dominar Figma y herramientas de diseño profesional",
      "Realizar investigación de usuarios y crear personas de usuario",
      "Diseñar interfaces de usuario hermosas y funcionales",
      "Construir sistemas de diseño completos",
      "Crear prototipos interactivos y animaciones",
    ],
    sections: [
      {
        id: "s1",
        title: "Fundamentos del Diseño UX",
        lectures: [
          { id: "l1", title: "Introducción al Diseño UX", duration: "8:15", completed: false },
          { id: "l2", title: "Métodos de Investigación de Usuarios", duration: "15:30", completed: false },
          { id: "l3", title: "Creando Personas de Usuario", duration: "12:45", completed: false },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Sofía Rodríguez",
        userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-20",
        comment: "¡Alejandro es un instructor increíble! El curso está bien estructurado y lleno de ejemplos prácticos.",
      },
    ],
    questions: [],
  },
  {
    id: "3",
    title: "Ciencia de Datos y Machine Learning A-Z: Edición Python",
    instructor: instructors[2],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    description: "Bootcamp completo de ciencia de datos. Aprende Python, estadística, aprendizaje automático, deep learning y despliega modelos de IA en el mundo real.",
    price: 94.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 15678,
    studentCount: 210000,
    duration: "45 horas",
    level: "Principiante",
    category: "ciencia-datos",
    isBestseller: true,
    isNew: false,
    whatYouWillLearn: [
      "Dominar Python para ciencia de datos",
      "Construir modelos de machine learning desde cero",
      "Trabajar con conjuntos de datos reales y resolver problemas empresariales",
      "Desplegar modelos de IA en producción",
    ],
    sections: [],
    reviews: [],
    questions: [],
  },
  {
    id: "4",
    title: "Dominio del Marketing Digital: SEO, Redes Sociales y Contenido",
    instructor: instructors[3],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    description: "Curso completo de marketing digital que cubre SEO, marketing de contenidos, redes sociales, email marketing y analítica.",
    price: 69.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewCount: 6543,
    studentCount: 87000,
    duration: "28 horas",
    level: "Principiante",
    category: "marketing",
    isBestseller: false,
    isNew: true,
    whatYouWillLearn: [
      "Dominar SEO y posicionarte en Google",
      "Crear campañas virales en redes sociales",
      "Construir estrategias efectivas de marketing de contenidos",
      "Analizar y optimizar el rendimiento del marketing",
    ],
    sections: [],
    reviews: [],
    questions: [],
  },
  {
    id: "5",
    title: "Desarrollo Web Full-Stack: React, Node.js y MongoDB",
    instructor: instructors[1],
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    description: "Construye aplicaciones web modernas desde cero. Aprende React, Node.js, Express, MongoDB y despliega en producción.",
    price: 84.99,
    originalPrice: 189.99,
    rating: 4.8,
    reviewCount: 9876,
    studentCount: 105000,
    duration: "38 horas",
    level: "Intermedio",
    category: "desarrollo",
    isBestseller: true,
    isNew: false,
    whatYouWillLearn: [
      "Construir aplicaciones full-stack con React y Node.js",
      "Dominar MongoDB y diseño de bases de datos",
      "Implementar autenticación y autorización",
      "Desplegar aplicaciones en plataformas cloud",
    ],
    sections: [],
    reviews: [],
    questions: [],
  },
  {
    id: "6",
    title: "Análisis Financiero y Banca de Inversión",
    instructor: instructors[0],
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
    description: "Domina el modelado financiero, valuación y banca de inversión. Aprende Excel, modelos DCF, LBO y análisis de M&A.",
    price: 99.99,
    originalPrice: 219.99,
    rating: 4.9,
    reviewCount: 4321,
    studentCount: 62000,
    duration: "35 horas",
    level: "Avanzado",
    category: "finanzas",
    isBestseller: false,
    isNew: false,
    whatYouWillLearn: [
      "Construir modelos financieros sofisticados",
      "Realizar valuaciones de empresas usando DCF y análisis de comparables",
      "Entender transacciones de M&A y modelado LBO",
      "Dominar Excel para análisis financiero",
    ],
    sections: [],
    reviews: [],
    questions: [],
  },
  {
    id: "7",
    title: "Aprende Wayuunaiki: El Idioma del Pueblo Wayuu",
    instructor: instructors[4],
    thumbnail: "/images/course-thumb-wayuu.png",
    description: "Sumérgete en el fascinante idioma Wayuunaiki, lengua ancestral del pueblo Wayuu de La Guajira, Colombia y Venezuela. Aprende desde los saludos básicos hasta conversaciones completas, mientras descubres la rica cultura, tradiciones y cosmovisión de esta milenaria comunidad indígena.",
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviewCount: 2156,
    studentCount: 15000,
    duration: "20 horas",
    level: "Principiante",
    category: "idiomas",
    isBestseller: false,
    isNew: true,
    isFeatured: true,
    whatYouWillLearn: [
      "Dominar la pronunciación y fonética del Wayuunaiki",
      "Mantener conversaciones básicas y cotidianas en Wayuunaiki",
      "Comprender la estructura gramatical única del idioma",
      "Conocer el vocabulario relacionado con la cultura y tradiciones Wayuu",
      "Aprender sobre la cosmovisión y valores del pueblo Wayuu",
      "Leer y escribir en Wayuunaiki usando el alfabeto oficial",
    ],
    sections: [
      {
        id: "s1",
        title: "Introducción al Mundo Wayuu",
        lectures: [
          { id: "l1", title: "Bienvenida: Anasü (Hola)", duration: "8:00", completed: false },
          { id: "l2", title: "El Pueblo Wayuu y La Guajira", duration: "15:30", completed: false },
          { id: "l3", title: "Historia y Origen del Wayuunaiki", duration: "12:45", completed: false },
          { id: "l4", title: "El Alfabeto Wayuunaiki", duration: "20:00", completed: false },
        ],
      },
      {
        id: "s2",
        title: "Saludos y Presentaciones",
        lectures: [
          { id: "l5", title: "Saludos Básicos: Jamaya, Anasü, Anaataa", duration: "18:15", completed: false },
          { id: "l6", title: "Presentándote: Taya (Yo soy...)", duration: "22:30", completed: false },
          { id: "l7", title: "Preguntar el Nombre: ¿Jaralü pia?", duration: "15:00", completed: false },
          { id: "l8", title: "Despedidas y Cortesías", duration: "14:20", completed: false },
        ],
      },
      {
        id: "s3",
        title: "La Familia Wayuu (Apüshi)",
        lectures: [
          { id: "l9", title: "Miembros de la Familia", duration: "25:00", completed: false },
          { id: "l10", title: "El Sistema de Clanes Wayuu", duration: "18:45", completed: false },
          { id: "l11", title: "Relaciones Familiares en Wayuunaiki", duration: "20:30", completed: false },
        ],
      },
      {
        id: "s4",
        title: "Números y Colores",
        lectures: [
          { id: "l12", title: "Números del 1 al 20", duration: "22:00", completed: false },
          { id: "l13", title: "Números Grandes y Conteo", duration: "16:30", completed: false },
          { id: "l14", title: "Los Colores en Wayuunaiki", duration: "18:00", completed: false },
        ],
      },
      {
        id: "s5",
        title: "Cultura y Tradiciones",
        lectures: [
          { id: "l15", title: "El Arte del Tejido: Las Mochilas Wayuu", duration: "28:00", completed: false },
          { id: "l16", title: "La Yonna: Danza Tradicional", duration: "20:15", completed: false },
          { id: "l17", title: "Mitos y Leyendas Wayuu", duration: "25:30", completed: false },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Carlos Mendoza",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-25",
        comment: "Increíble curso. María es una maestra excepcional que no solo enseña el idioma sino toda la riqueza cultural del pueblo Wayuu. Aprendí mucho sobre mis raíces colombianas.",
      },
      {
        id: "r2",
        userName: "Ana Lucía Pérez",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-22",
        comment: "Como lingüista, estoy fascinada con la estructura del Wayuunaiki. Este curso es una joya para preservar lenguas indígenas. ¡Gracias por este aporte cultural!",
      },
      {
        id: "r3",
        userName: "Roberto Ipuana",
        userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
        rating: 5,
        date: "2024-01-20",
        comment: "Soy Wayuu y este curso me ayudó a reconectar con mi idioma ancestral que había olvidado. Waneepia (Gracias) María por este hermoso trabajo.",
      },
    ],
    questions: [
      {
        id: "q1",
        userName: "Diana Gómez",
        userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop",
        question: "¿Es muy diferente el Wayuunaiki que se habla en Colombia del que se habla en Venezuela?",
        date: "2024-01-28",
        answers: [
          {
            id: "a1",
            userName: "María Pushaina Epieyu",
            userAvatar: instructors[4].avatar,
            answer: "¡Excelente pregunta! El Wayuunaiki es esencialmente el mismo en ambos países, ya que el territorio Wayuu no reconoce fronteras políticas. Hay algunas variaciones dialectales menores, pero los hablantes de ambos lados se entienden perfectamente. En el curso enseño el Wayuunaiki estándar que se usa en toda La Guajira.",
            date: "2024-01-28",
            isInstructor: true,
          },
        ],
      },
    ],
  },
];

// Datos del usuario
export const currentUser = {
  id: "user1",
  name: "Carlos Rodríguez",
  email: "carlos@ejemplo.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  enrolledCourses: ["1", "2"],
  wishlist: ["3", "4"],
  cart: [] as string[],
};

// Datos de ganancias del instructor (para dashboard)
export const instructorEarnings = {
  total: 125430,
  thisMonth: 12540,
  lastMonth: 11230,
  chartData: [
    { month: "Ene", earnings: 8500 },
    { month: "Feb", earnings: 9200 },
    { month: "Mar", earnings: 10100 },
    { month: "Abr", earnings: 11230 },
    { month: "May", earnings: 12540 },
  ],
};

// Filtros disponibles
export const filterOptions = {
  ratings: [
    { value: "4.5", label: "4.5 y más" },
    { value: "4.0", label: "4.0 y más" },
    { value: "3.5", label: "3.5 y más" },
    { value: "3.0", label: "3.0 y más" },
  ],
  durations: [
    { value: "0-10", label: "0-10 horas" },
    { value: "10-20", label: "10-20 horas" },
    { value: "20-40", label: "20-40 horas" },
    { value: "40+", label: "40+ horas" },
  ],
  prices: [
    { value: "free", label: "Gratis" },
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100+", label: "$100+" },
  ],
  levels: [
    { value: "Principiante", label: "Principiante" },
    { value: "Intermedio", label: "Intermedio" },
    { value: "Avanzado", label: "Avanzado" },
    { value: "Todos los Niveles", label: "Todos los Niveles" },
  ],
};
