import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import CartPage from "./pages/CartPage";
import MyLearning from "./pages/MyLearning";
import InstructorDashboard from "./pages/InstructorDashboard";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/course/:id"} component={CoursePage} />
      <Route path={"/carrito"} component={CartPage} />
      <Route path={"/cart"} component={CartPage} />
      <Route path={"/mi-aprendizaje"} component={MyLearning} />
      <Route path={"/my-learning"} component={MyLearning} />
      <Route path={"/instructor/dashboard"} component={InstructorDashboard} />
      <Route path={"/categoria/:slug"} component={CategoryPage} />
      <Route path={"/buscar"} component={SearchPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
