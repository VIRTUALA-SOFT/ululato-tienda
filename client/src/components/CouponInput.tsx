/**
 * Ululato Premium - Componente de Cupón de Descuento
 * Input elegante para aplicar códigos promocionales
 */
import { useState } from 'react';
import { Tag, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { coupons, Coupon } from '@/data/mocks';
import { cn } from '@/lib/utils';

interface CouponInputProps {
  subtotal: number;
  onApplyCoupon: (coupon: Coupon | null) => void;
  appliedCoupon: Coupon | null;
}

export default function CouponInput({ subtotal, onApplyCoupon, appliedCoupon }: CouponInputProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleApplyCoupon = async () => {
    if (!code.trim()) {
      setError('Ingresa un código de cupón');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Simular delay de validación
    await new Promise(resolve => setTimeout(resolve, 800));

    const coupon = coupons.find(c => c.code.toLowerCase() === code.trim().toLowerCase());

    if (!coupon) {
      setError('Código de cupón inválido');
      setIsLoading(false);
      return;
    }

    // Verificar fecha de expiración
    if (new Date(coupon.expiresAt) < new Date()) {
      setError('Este cupón ha expirado');
      setIsLoading(false);
      return;
    }

    // Verificar compra mínima
    if (subtotal < coupon.minPurchase) {
      setError(`Compra mínima de $${coupon.minPurchase} requerida`);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
    onApplyCoupon(coupon);
  };

  const handleRemoveCoupon = () => {
    setCode('');
    setError(null);
    setSuccess(false);
    onApplyCoupon(null);
  };

  const calculateDiscount = (coupon: Coupon) => {
    if (coupon.type === 'percentage') {
      return (subtotal * coupon.discount) / 100;
    }
    return coupon.discount;
  };

  if (appliedCoupon) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-semibold text-green-500">{appliedCoupon.code}</p>
              <p className="text-sm text-muted-foreground">{appliedCoupon.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCoupon}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-between text-green-500 font-semibold">
          <span>Descuento aplicado:</span>
          <span>-${calculateDiscount(appliedCoupon).toFixed(2)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Código de cupón"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError(null);
            }}
            className={cn(
              "pl-10 input-premium",
              error && "border-destructive focus:border-destructive",
              success && "border-green-500 focus:border-green-500"
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleApplyCoupon();
              }
            }}
          />
        </div>
        <Button
          onClick={handleApplyCoupon}
          disabled={isLoading || !code.trim()}
          className="btn-premium px-6"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Aplicar'
          )}
        </Button>
      </div>
      
      {error && (
        <p className="text-sm text-destructive flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </p>
      )}

      {/* Cupones sugeridos */}
      <div className="pt-2">
        <p className="text-xs text-muted-foreground mb-2">Cupones disponibles:</p>
        <div className="flex flex-wrap gap-2">
          {coupons.slice(0, 2).map((coupon) => (
            <button
              key={coupon.code}
              onClick={() => setCode(coupon.code)}
              className="text-xs px-3 py-1.5 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 hover:bg-[#FFD700]/20 transition-colors"
            >
              {coupon.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
