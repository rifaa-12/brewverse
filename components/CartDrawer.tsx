import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Coffee, ArrowRight, Lock, Trash2, Plus, Minus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onViewFullCart: () => void;
  onShowToast: (title: string, desc: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onViewFullCart,
  onShowToast,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * (discountPercent / 100);
  const tax = (subtotal - discount) * 0.06;
  const total = subtotal - discount + (subtotal > 0 ? tax : 0);

  const handleApplyPromo = () => {
    const trimmed = promoCode.trim().toUpperCase();
    if (trimmed === 'ATELIER15' || trimmed === 'BREW15' || trimmed === 'CURATOR') {
      setDiscountPercent(15);
      onShowToast('Curator Code Applied', '15% Atelier Privilege applied to subtotal.');
      setPromoCode('');
    } else if (trimmed === 'CREMA10') {
      setDiscountPercent(10);
      onShowToast('Privilege Code Applied', '10% Welcome gift applied.');
      setPromoCode('');
    } else if (trimmed.length > 0) {
      onShowToast('Invalid Code', 'Try ATELIER15 for 15% privilege allocation.');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#0c0908]/75 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#14100e]/95 backdrop-blur-2xl border-l border-[#d99b61]/20 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="h-20 px-6 flex items-center justify-between bg-[#1e1815] border-b border-stone-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#d99b61]" />
            <h2 className="text-sm font-bold text-[#f6efe8] uppercase tracking-widest font-sans">
              Your Ritual Cart
            </h2>
            <span className="text-xs px-2 py-0.5 rounded bg-[#d99b61]/20 text-[#caa06d] font-bold">
              {cartItems.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            aria-label="Close cart drawer"
            onClick={onClose}
            className="text-[#a89c90] hover:text-[#f6efe8] p-1.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 text-[#a89c90]">
              <Coffee className="w-12 h-12 text-[#caa06d]/40 stroke-[1.5]" />
              <p className="text-sm font-medium">Your ritual cart is waiting for its first bean.</p>
              <button
                onClick={() => {
                  onClose();
                  onViewFullCart();
                }}
                className="text-xs uppercase tracking-wider font-bold text-[#d99b61] hover:underline"
              >
                Browse The Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#161311] border border-stone-800/90 flex gap-3.5 items-start relative group"
              >
                <div className="w-14 h-14 rounded-lg bg-[#1e1815] border border-[#d99b61]/20 flex items-center justify-center shrink-0 overflow-hidden text-[#d99b61]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Coffee className="w-6 h-6" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#f6efe8] truncate font-sans">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#a89c90] hover:text-red-400 transition-colors p-1 cursor-pointer"
                      title="Remove from ritual"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#a89c90] truncate mt-0.5">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-800/60">
                    <span className="font-semibold text-sm text-[#caa06d] font-display tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-[#1e1815] border border-stone-800 rounded px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-[#a89c90] hover:text-[#f6efe8] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-[#f6efe8] w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-[#a89c90] hover:text-[#f6efe8] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-[#1e1815] border-t border-stone-800 space-y-4">
            {/* Promo code field */}
            <div className="flex gap-2">
              <input
                className="flex-1 px-3 py-2 rounded-lg bg-[#110d0c] border border-stone-800 text-xs text-[#f6efe8] placeholder-[#a89c90]/60 focus:outline-none focus:border-[#d99b61]"
                placeholder="Promo Code (try ATELIER15)..."
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                type="text"
              />
              <button
                className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-[#f6efe8] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                onClick={handleApplyPromo}
                type="button"
              >
                Apply
              </button>
            </div>

            {/* Calculations breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800/70 text-xs">
              <div className="flex justify-between items-center text-[#a89c90]">
                <span>Subtotal</span>
                <span className="font-mono text-[#f6efe8] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-[#caa06d]">
                  <span>Curator Privilege ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-[#a89c90]">
                <span>Estimated Atelier Shipping</span>
                <span className="text-[#caa06d] uppercase text-[10px] font-bold">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between items-center text-[#a89c90]">
                <span>Extraction Tax (6.0%)</span>
                <span className="font-mono text-[#f6efe8] tabular-nums">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-stone-800">
                <span className="font-bold text-[#f6efe8] font-sans">Total Amount</span>
                <span className="font-semibold text-xl text-[#d99b61] font-display tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#d99b61] via-[#e5b869] to-[#caa06d] hover:opacity-95 text-[#0c0908] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                type="button"
              >
                <span>Proceed to Secure Checkout</span>
                <Lock className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onViewFullCart();
                }}
                className="w-full py-2.5 bg-transparent hover:bg-stone-900/60 border border-stone-800 text-[#a89c90] hover:text-[#f6efe8] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                type="button"
              >
                <span>Review Sensory Allocation Screen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
