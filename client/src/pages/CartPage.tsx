/**
 * Ululato Premium - Página de Carrito de Compras
 * Diseño elegante con sistema de cupones de descuento
 */
import { useState } from 'react';
import { Trash2, ShoppingBag, Heart, Shield, Clock, Award } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import Header from '@/components/Header';
import CouponInput from '@/components/CouponInput';
import { CartItemSkeleton, CartSummarySkeleton } from '@/components/Skeletons';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { courses, Coupon } from '@/data/mocks';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function CartPage() {
  const [, navigate] = useLocation();
  const { cart, removeFromCart, toggleWishlist, wishlist, getCartTotal, isLoading } = useApp();
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  
  const cartItems = cart.map(id => courses.find(c => c.id === id)).filter((c): c is NonNullable<typeof c> => c !== undefined);
  const subtotal = getCartTotal();
  
  // Calcular descuento del cupón
  const couponDiscount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? (subtotal * appliedCoupon.discount) / 100 
      : appliedCoupon.discount
    : 0;
  
  const total = subtotal - couponDiscount;

  const handleCheckout = () => {
    toast.success('Función de pago próximamente', {
      description: 'Este es un prototipo. La integración de pagos será añadida.',
    });
  };

  const handleMoveToWishlist = (courseId: string) => {
    removeFromCart(courseId);
    if (!wishlist.includes(courseId)) {
      toggleWishlist(courseId);
    }
    toast.success('Movido a lista de deseos');
  };

  // Estado de carga con skeletons
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12">
          <div className="h-10 w-64 bg-muted/50 rounded-lg mb-8 animate-pulse" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-4 w-32 bg-muted/50 rounded mb-4 animate-pulse" />
              <CartItemSkeleton />
              <CartItemSkeleton />
            </div>
            <div className="lg:col-span-1">
              <CartSummarySkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-card border-2 border-border flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold font-display">Tu carrito está vacío</h1>
            <p className="text-lg text-muted-foreground">
              ¡Comienza a aprender hoy! Explora nuestros cursos y agrégalos a tu carrito.
            </p>
            <Button
              size="lg"
              className="btn-premium text-lg px-8 py-6 rounded-xl"
              onClick={() => navigate('/')}
            >
              Explorar Cursos
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold font-display mb-8"
        >
          Carrito de Compras
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Artículos del Carrito */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? 'curso' : 'cursos'} en tu carrito
            </p>

            {cartItems.map((course, index) => (
              <motion.div 
                key={course.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border-2 border-border rounded-xl p-6 flex gap-6 hover:border-[#FFD700]/50 transition-all group"
              >
                <div 
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-40 h-24 object-cover rounded-lg border border-border group-hover:border-[#FFD700]/50 transition-colors"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <span 
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="font-semibold text-lg hover:text-[#FFD700] transition-colors line-clamp-2 block cursor-pointer"
                  >
                    {course.title}
                  </span>
                  <p className="text-sm text-muted-foreground">Por {course.instructor.name}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[#FFD700]">{course.rating}</span>
                      <span className="text-[#FFD700]">★</span>
                    </div>
                    <span className="text-muted-foreground">({course.reviewCount.toLocaleString()} reseñas)</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleMoveToWishlist(course.id)}
                      className="text-sm text-muted-foreground hover:text-[#FFD700] transition-colors flex items-center gap-1"
                    >
                      <Heart className="w-4 h-4" />
                      Guardar para después
                    </button>
                    <span className="text-muted-foreground">•</span>
                    <button
                      onClick={() => {
                        removeFromCart(course.id);
                        toast.success('Eliminado del carrito');
                      }}
                      className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FFD700]">${course.price}</div>
                  {course.originalPrice > course.price && (
                    <div className="text-sm text-muted-foreground line-through">${course.originalPrice}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border-4 border-[#FFD700]/30 rounded-2xl p-6 space-y-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold font-display">Resumen del Pedido</h2>
              
              {/* Cupón de descuento */}
              <div className="border-b border-border pb-6">
                <CouponInput
                  subtotal={subtotal}
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={setAppliedCoupon}
                />
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descuento original:</span>
                  <span className="font-semibold text-green-500">
                    -${cartItems.reduce((acc, c) => acc + ((c?.originalPrice || 0) - (c?.price || 0)), 0).toFixed(2)}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-500">
                    <span>Cupón ({appliedCoupon.code}):</span>
                    <span className="font-semibold">-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-3xl font-bold gradient-text">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full btn-premium text-lg py-6 rounded-xl"
                onClick={handleCheckout}
              >
                Proceder al Pago
              </Button>

              {/* Garantías */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-5 h-5 text-[#FFD700]" />
                  <span>Garantía de devolución de 30 días</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-5 h-5 text-[#FFD700]" />
                  <span>Acceso de por vida</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Award className="w-5 h-5 text-[#FFD700]" />
                  <span>Certificado de finalización</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
