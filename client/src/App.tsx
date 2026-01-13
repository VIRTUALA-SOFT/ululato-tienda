import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NotificationProvider } from "./components/NotificationSystem";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import CartPage from "./pages/CartPage";
import MyLearning from "./pages/MyLearning";
import InstructorDashboard from "./pages/InstructorDashboard";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForumPage from "./pages/ForumPage";
import BlogPage from "./pages/BlogPage";
import ComparePage from "./pages/ComparePage";
import {
  EventosPage,
  EmbajadoresPage,
  AyudaPage,
  ContactoPage,
  TerminosPage,
  PrivacidadPage,
  CursosPage,
  CategoriasPage,
  InstructoresPage,
  CertificacionesPage,
  ForoGeneralPage,
} from "./pages/FooterPages";

function Router() {
  return (
    <Switch>
      {/* Páginas principales */}
      <Route path={"/"} component={Home} />
      <Route path={"/course/:id"} component={CoursePage} />
      <Route path={"/carrito"} component={CartPage} />
      <Route path={"/cart"} component={CartPage} />
      <Route path={"/mi-aprendizaje"} component={MyLearning} />
      <Route path={"/my-learning"} component={MyLearning} />
      <Route path={"/instructor/dashboard"} component={InstructorDashboard} />
      <Route path={"/categoria/:slug"} component={CategoryPage} />
      <Route path={"/buscar"} component={SearchPage} />
      <Route path={"/comparar"} component={ComparePage} />
      <Route path={"/compare"} component={ComparePage} />
      <Route path={"/perfil"} component={ProfilePage} />
      <Route path={"/profile"} component={ProfilePage} />
      
      {/* Auth */}
      <Route path={"/login"} component={LoginPage} />
      <Route path={"/iniciar-sesion"} component={LoginPage} />
      <Route path={"/registro"} component={RegisterPage} />
      <Route path={"/register"} component={RegisterPage} />
      
      {/* Foro */}
      <Route path={"/foro/:courseId"} component={ForumPage} />
      <Route path={"/foro-general"} component={ForoGeneralPage} />
      
      {/* Blog */}
      <Route path={"/blog"} component={BlogPage} />
      <Route path={"/blog/:id"} component={BlogPage} />
      
      {/* Páginas del Footer */}
      <Route path={"/eventos"} component={EventosPage} />
      <Route path={"/embajadores"} component={EmbajadoresPage} />
      <Route path={"/ayuda"} component={AyudaPage} />
      <Route path={"/contacto"} component={ContactoPage} />
      <Route path={"/terminos"} component={TerminosPage} />
      <Route path={"/privacidad"} component={PrivacidadPage} />
      <Route path={"/cursos"} component={CursosPage} />
      <Route path={"/categorias"} component={CategoriasPage} />
      <Route path={"/instructores"} component={InstructoresPage} />
      <Route path={"/certificaciones"} component={CertificacionesPage} />
      
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <LanguageProvider>
          <NotificationProvider>
          <AppProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </AppProvider>
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
