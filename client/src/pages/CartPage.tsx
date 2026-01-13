/**
 * Neo-Brutalism Dark Edition: Página de carrito de compras
 * Muestra cursos en carrito con total y checkout
 */
import { Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { courses } from '@/data/mocks';
import { toast } from 'sonner';

export default function CartPage() {
  const { cart, removeFromCart, getCartTotal } = useApp();
  const cartItems = cart.map(id => courses.find(c => c.id === id)).filter((c): c is NonNullable<typeof c> => c !== undefined);
  const total = getCartTotal();

  const handleCheckout = () => {
    toast.success('Función de pago próximamente', {
      description: 'Este es un prototipo. La integración de pagos será añadida.',
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground" />
            <h1 className="text-4xl font-bold text-display">Tu carrito está vacío</h1>
            <p className="text-lg text-muted-foreground">
              ¡Comienza a aprender hoy! Explora nuestros cursos y agrégalos a tu carrito.
            </p>
            <Button
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold border-4 border-black glow-gold-hover"
              asChild
            >
              <Link href="/">
                <a>Explorar Cursos</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <h1 className="text-4xl font-bold text-display mb-8">Carrito de Compras</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Artículos del Carrito */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((course) => (
              <div key={course.id} className="bg-card border-2 border-border rounded-lg p-6 flex gap-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-32 h-20 object-cover rounded border-2 border-border"
                />
                <div className="flex-1 space-y-2">
                  <Link href={`/course/${course.id}`}>
                    <a className="font-semibold text-lg hover:text-[#FFD700] transition-colors">
                      {course.title}
                    </a>
                  </Link>
                  <p className="text-sm text-muted-foreground">Por {course.instructor.name}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold">{course.rating}</span>
                    <span className="text-[#FFD700]">★★★★★</span>
                    <span className="text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      removeFromCart(course.id);
                      toast.success('Eliminado del carrito');
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#FFD700]">${course.price}</div>
                    <div className="text-sm text-muted-foreground line-through">${course.originalPrice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-card border-4 border-[#FFD700] rounded-lg p-6 space-y-6 sticky top-24">
              <h2 className="text-2xl font-bold text-display">Resumen del Pedido</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descuento:</span>
                  <span className="font-semibold text-green-500">
                    -${cartItems.reduce((acc, c) => acc + ((c?.originalPrice || 0) - (c?.price || 0)), 0).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-3xl font-bold text-[#FFD700]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg border-4 border-black glow-gold-hover"
                onClick={handleCheckout}
              >
                Proceder al Pago
              </Button>

              <div className="text-xs text-center text-muted-foreground">
                Garantía de devolución de 30 días
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
