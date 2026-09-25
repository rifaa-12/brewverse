import React, { useState } from 'react';
import { CartItem, ScreenType } from '../types';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  ArrowLeft,
  Coffee,
  CreditCard,
  QrCode,
  Sparkles,
} from 'lucide-react';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (title: string, desc: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  onClearCart,
  onNavigate,
  onShowToast,
}) => {
  const [formData, setFormData] = useState({
    fullName: 'Rifa Roaster',
    email: 'rifa12062007@gmail.com',
    phone: '+1 (555) 234-8900',
    address: '482 Roast Guild Lane, Atelier No. 4',
    city: 'San Francisco',
    postalCode: '94107',
    deliveryMethod: 'courier',
    notes: 'Please flush with argon before sealing. Leave with reception concierge.',
    cardNumber: '•••• •••• •••• 4289',
    cardExp: '08/28',
    cardCvc: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.06;
  const courierFee = formData.deliveryMethod === 'express' ? 12.0 : 0.0;
  const total = subtotal + (subtotal > 0 ? tax : 0) + courierFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      onShowToast('Empty Ritual', 'Please add coffee allocations to proceed.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderConfirmed(true);
      const generatedId = `BV-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      onShowToast('Allocation Secured', `Order ${generatedId} placed in roasting queue.`);
    }, 1500);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderConfirmed(false);
    onNavigate('home');
  };

  if (orderConfirmed) {
    return (
      <div className="relative w-full pt-10 pb-24 px-6 md:px-12 max-w-4xl mx-auto text-[#f6efe8]">
        {/* Certificate of Provenance Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-stone-950/90 border border-[#d99b61]/35 shadow-2xl space-y-8 backdrop-blur-md relative overflow-hidden">
          {/* Subtle watermark background seal */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border border-[#d99b61]/10 flex items-center justify-center pointer-events-none">
            <span className="font-serif italic text-8xl text-[#d99b61]/5 font-bold">B.</span>
          </div>

          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#d99b61]/20 border border-[#d99b61]/40 flex items-center justify-center text-[#d99b61] mx-auto mb-3 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] text-[#caa06d] font-bold uppercase tracking-[0.28em] font-sans block">
              OFFICIAL CERTIFICATE OF ALLOCATION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#f6efe8]">
              Your Ritual is Secured
            </h1>
            <p className="text-xs text-[#a89c90] max-w-md mx-auto">
              Your single-origin lots have entered the Atelier Roasting Queue. Degassing in argon-flushed vessels prior to dispatch.
            </p>
          </div>

          {/* Allocation Identifier Banner */}
          <div className="p-4 rounded-xl bg-[#1e1815] border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#a89c90] uppercase font-mono block">
                ROAST REGISTRY ALLOCATION ID
              </span>
              <span className="font-mono text-xl sm:text-2xl text-[#d99b61] font-bold tracking-wider">
                #{orderId}
              </span>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-[10px] text-[#a89c90] uppercase font-mono block">
                ESTIMATED EXTRACTION BLOOM
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                Warm Hand Delivery in 24 Hours
              </span>
            </div>
          </div>

          {/* Itemized Order Recap */}
          <div className="space-y-3 border-t border-stone-800 pt-6">
            <h3 className="text-xs text-[#a89c90] uppercase font-bold tracking-widest font-sans">
              Allocated Lots &amp; Vessels
            </h3>
            <div className="divide-y divide-stone-800/60">
              {cartItems.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-[#caa06d] font-mono font-bold">
                      {item.quantity}x
                    </span>
                    <div>
                      <span className="text-[#f6efe8] font-bold">{item.name}</span>
                      <span className="text-[#a89c90] text-[11px] block">{item.subtitle}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[#f6efe8] tabular-nums font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-800 space-y-1.5 text-xs text-[#a89c90]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#f6efe8]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Carbon-Neutral Courier</span>
                <span className="text-emerald-400 font-semibold uppercase text-[11px]">
                  {courierFee === 0 ? 'Complimentary' : `$${courierFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Extraction Tax (6.0%)</span>
                <span className="font-mono text-[#f6efe8]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#f6efe8] pt-2 border-t border-stone-800">
                <span>Total Settled</span>
                <span className="font-serif text-2xl text-[#d99b61] font-normal">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Coordinates Confirmation */}
          <div className="p-4 rounded-xl bg-[#161311] border border-stone-800/80 text-xs text-[#a89c90] space-y-1">
            <span className="text-[10px] text-[#caa06d] font-bold uppercase tracking-wider block font-sans">
              DISPATCH DESTINATION
            </span>
            <div className="text-[#f6efe8] font-semibold">{formData.fullName}</div>
            <div>{formData.address}, {formData.city}, {formData.postalCode}</div>
            <div className="text-[#a89c90]/80 mt-1 italic">“{formData.notes}”</div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleFinish}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d99b61] to-[#caa06d] text-[#0c0908] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-[1.01] cursor-pointer"
            >
              Return to Atelier Monograph
            </button>
            <div className="flex items-center gap-2 text-xs text-[#a89c90]">
              <QrCode className="w-4 h-4 text-[#d99b61]" />
              <span>Digital Roastery Pass Injected to Wallet</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full pt-8 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#f6efe8]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#d99b61]" />
          <span className="text-[11px] font-bold text-[#d99b61] uppercase tracking-[0.24em] font-sans">
            PHASE 02: COURIER &amp; SECURE ALLOCATION
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#f6efe8]">
          Atelier Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#a89c90] mt-1.5 font-light">
          Calibrate delivery coordinates and settle allocation tokens securely.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Palate Identity & Delivery */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Curator Coordinates */}
          <div className="p-6 sm:p-7 rounded-2xl bg-stone-950/80 border border-[#d99b61]/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-bold text-[#caa06d] uppercase tracking-wider font-sans">
                01 / Curator Identity &amp; Destination
              </span>
              <span className="text-[11px] text-[#a89c90]">Verified Member</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] text-[#a89c90] uppercase font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] focus:outline-none focus:border-[#d99b61]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#a89c90] uppercase font-semibold">Email Dispatch</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] focus:outline-none focus:border-[#d99b61]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] text-[#a89c90] uppercase font-semibold">
                  Concierge Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] focus:outline-none focus:border-[#d99b61]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#a89c90] uppercase font-semibold">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] focus:outline-none focus:border-[#d99b61]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#a89c90] uppercase font-semibold">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] focus:outline-none focus:border-[#d99b61]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] text-[#a89c90] uppercase font-semibold">
                  Roasting &amp; Dispatch Instructions
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] text-xs focus:outline-none focus:border-[#d99b61] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Dispatch Method */}
          <div className="p-6 sm:p-7 rounded-2xl bg-stone-950/80 border border-[#d99b61]/20 shadow-xl space-y-4">
            <span className="text-xs font-bold text-[#caa06d] uppercase tracking-wider font-sans block pb-2 border-b border-stone-800">
              02 / Dispatch Method
            </span>

            <div className="space-y-2.5">
              {[
                {
                  id: 'courier',
                  title: 'Complimentary Zero-Emission Courier',
                  desc: 'Delivered in temperature-stable chilled dispatch vehicle within 24-48 hours.',
                  price: 'FREE',
                },
                {
                  id: 'express',
                  title: 'Priority Warm Roastery Dispatch',
                  desc: 'Dispatched immediately following roast profile cooling cycle.',
                  price: '+$12.00',
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    formData.deliveryMethod === opt.id
                      ? 'bg-[#1e1815] border-[#d99b61]'
                      : 'bg-[#161311] border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={formData.deliveryMethod === opt.id}
                      onChange={() => setFormData({ ...formData, deliveryMethod: opt.id })}
                      className="accent-[#d99b61]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#f6efe8] font-sans">
                        {opt.title}
                      </div>
                      <div className="text-[11px] text-[#a89c90] mt-0.5">{opt.desc}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#caa06d]">
                    {opt.price}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Payment Tokenization */}
          <div className="p-6 sm:p-7 rounded-2xl bg-stone-950/80 border border-[#d99b61]/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-bold text-[#caa06d] uppercase tracking-wider font-sans">
                03 / Payment Tokenization
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit Encrypted</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] text-[#a89c90] uppercase font-semibold">
                  Card Token Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] font-mono focus:outline-none focus:border-[#d99b61]"
                  />
                  <CreditCard className="w-4 h-4 text-[#a89c90] absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-[#a89c90] uppercase font-semibold">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] font-mono focus:outline-none focus:border-[#d99b61]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-[#a89c90] uppercase font-semibold">CVC</label>
                  <input
                    type="password"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] font-mono focus:outline-none focus:border-[#d99b61]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Sticky Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-2xl bg-stone-950/85 border border-[#d99b61]/25 shadow-2xl backdrop-blur-md space-y-4">
            <h2 className="font-serif text-2xl text-[#f6efe8] pb-3 border-b border-stone-800">
              Allocation Overview
            </h2>

            {/* List of items */}
            <div className="divide-y divide-stone-800/60 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="truncate mr-2">
                    <span className="text-[#f6efe8] font-semibold">{item.name}</span>
                    <span className="text-[#a89c90] text-[11px] block">
                      Qty: {item.quantity} · {item.subtitle}
                    </span>
                  </div>
                  <span className="font-mono text-[#caa06d] tabular-nums font-semibold shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary lines */}
            <div className="space-y-2 pt-3 border-t border-stone-800 text-xs text-[#a89c90]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#f6efe8] tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Courier Dispatch</span>
                <span className="text-emerald-400 font-semibold uppercase text-[11px]">
                  {courierFee === 0 ? 'Complimentary' : `$${courierFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Extraction Tax (6.0%)</span>
                <span className="font-mono text-[#f6efe8] tabular-nums">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#f6efe8] pt-2 border-t border-stone-800">
                <span>Total Amount</span>
                <span className="font-serif text-2xl text-[#d99b61] font-normal tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || cartItems.length === 0}
              className={`w-full py-4 bg-gradient-to-r from-[#d99b61] via-[#e5b869] to-[#caa06d] text-[#0c0908] font-sans text-xs font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-[#d99b61]/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isProcessing ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {isProcessing ? (
                <span>Securing Allocation...</span>
              ) : (
                <>
                  <span>Authorize &amp; Dispatch (${total.toFixed(2)})</span>
                  <Lock className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className="w-full py-2 text-xs text-[#a89c90] hover:text-[#f6efe8] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sensory Review</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
