import React, { useState } from 'react';
import { CartItem, ScreenType, Companion } from '../types';
import { COMPANIONS } from '../data/mockData';
import {
  Truck,
  ShieldCheck,
  Heart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Lock,
  ChevronDown,
  Gift,
  Check,
  Coffee,
  Info,
} from 'lucide-react';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onAddCompanion: (companion: Companion) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (title: string, desc: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddCompanion,
  onNavigate,
  onShowToast,
}) => {
  const [curatorCodeOpen, setCuratorCodeOpen] = useState(false);
  const [curatorCode, setCuratorCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * (discountPercent / 100);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.06;
  const total = taxableAmount + (subtotal > 0 ? tax : 0);

  const freeShippingThreshold = 65.0;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressRatio = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCuratorCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = curatorCode.trim().toUpperCase();
    if (code === 'ATELIER15' || code === 'BREW15') {
      setDiscountPercent(15);
      onShowToast('Curator Privilege Activated', '15% allocation privilege applied.');
      setCuratorCode('');
    } else if (code === 'CREMA10') {
      setDiscountPercent(10);
      onShowToast('Privilege Code Applied', '10% privilege applied to tasting order.');
      setCuratorCode('');
    } else if (code) {
      onShowToast('Invalid Code', 'Try ATELIER15 or CREMA10.');
    }
  };

  const handleToggleSave = (id: string, name: string) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter((i) => i !== id));
      onShowToast('Removed from Saved', `${name} removed from saved reserve.`);
    } else {
      setSavedItems([...savedItems, id]);
      onShowToast('Saved to Reserve', `${name} saved to your private cellar.`);
    }
  };

  return (
    <div className="relative w-full pt-8 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#f6efe8]">
      {/* Top Provenance & Climate Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#d99b61]" />
            <span className="text-[11px] font-bold text-[#d99b61] uppercase tracking-[0.24em] font-sans">
              PROVENANCE RESERVE ALLOCATION / PHASE 01: SENSORY REVIEW
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#f6efe8] font-normal leading-tight">
            Your Tasting Ritual{' '}
            <span className="font-serif italic font-normal text-[#d99b61]">
              ({totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'})
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#a89c90] mt-1.5 max-w-2xl font-light">
            Curated extractions awaiting your moment. Hand-selected lots, rested for optimal extraction balance.
          </p>
        </div>

        {/* Climate-Neutral Courier Pill */}
        <div className="p-4 rounded-xl bg-stone-950/70 border border-[#d99b61]/20 flex items-center gap-3.5 max-w-md shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[#1e1815] border border-[#d99b61]/25 flex items-center justify-center text-[#d99b61] shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#f6efe8] tracking-wider uppercase font-sans">
                CLIMATE-NEUTRAL DELIVERY
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#e5b869]/20 text-[#e5b869] text-[9px] font-bold tracking-widest uppercase">
                UNLOCKED
              </span>
            </div>
            <p className="text-[11px] text-[#a89c90] mt-0.5">
              Complimentary zero-emission atelier courier applied.
            </p>
          </div>
        </div>
      </div>

      {/* Complimentary Courier Progress Bar */}
      <div className="mb-10 p-4 sm:p-5 rounded-xl bg-[#161311] border border-[#d99b61]/25 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-2.5">
          <div className="flex items-center gap-2 text-[#f6efe8] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#d99b61]" />
            <span>Complimentary Carbon-Neutral Courier Tier Reached</span>
          </div>
          <span className="font-mono text-[#caa06d] text-[11px] uppercase tracking-wider font-bold">
            ${subtotal.toFixed(2)} / ${freeShippingThreshold.toFixed(2)} THRESHOLD CLEARED
          </span>
        </div>
        {/* Progress track */}
        <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d99b61] via-[#e5b869] to-[#caa06d] transition-all duration-500 rounded-full"
            style={{ width: `${progressRatio}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Left Items + Right Summary Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Curated Items Table */}
        <div className="lg:col-span-8 space-y-4">
          {/* Table Header Row */}
          <div className="hidden sm:grid grid-cols-12 text-[10px] uppercase font-bold tracking-[0.2em] text-[#a89c90] pb-2 border-b border-stone-800 px-4">
            <span className="col-span-7">CURATED VESSEL &amp; LOT</span>
            <span className="col-span-3 text-center">RITUAL QUANTITY</span>
            <span className="col-span-2 text-right">ALLOCATION TOTAL</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="p-12 rounded-2xl bg-stone-950/70 border border-stone-800 text-center space-y-4">
              <Coffee className="w-12 h-12 text-[#caa06d]/40 mx-auto" />
              <h3 className="font-serif text-xl text-[#f6efe8]">No selections in this ritual</h3>
              <p className="text-xs text-[#a89c90]">
                Explore our micro-roast collection or choose companions below.
              </p>
              <button
                onClick={() => onNavigate('collection')}
                className="px-6 py-2.5 rounded-lg bg-[#d99b61] text-[#0c0908] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-stone-950/80 border border-[#d99b61]/15 hover:border-[#d99b61]/35 transition-all shadow-xl flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
              >
                {/* Vessel Thumbnail & Title & Metadata */}
                <div className="col-span-7 flex items-center gap-4 w-full">
                  <div className="relative w-20 h-20 rounded-xl bg-[#1e1815] border border-[#d99b61]/25 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {item.weightOrSize && (
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-[#caa06d] font-bold">
                        {item.weightOrSize}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    {item.categoryTag && (
                      <span className="text-[10px] text-[#d99b61] uppercase font-bold tracking-wider block font-sans truncate">
                        {item.categoryTag}
                      </span>
                    )}
                    <h3 className="font-bold text-sm sm:text-base text-[#f6efe8] font-sans truncate mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#a89c90] truncate mt-0.5">
                      {item.subtitle}
                    </p>
                    {item.notes && (
                      <div className="text-[10px] text-[#caa06d] tracking-wide font-medium mt-1 truncate">
                        ● {item.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-3 flex items-center justify-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-3 bg-[#1e1815] border border-stone-800 rounded-lg px-3 py-1.5 shadow-inner">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="text-[#a89c90] hover:text-[#f6efe8] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-bold text-sm text-[#f6efe8] w-6 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="text-[#a89c90] hover:text-[#f6efe8] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="col-span-2 flex flex-col items-end justify-center w-full sm:w-auto">
                  <span className="font-serif text-xl sm:text-2xl text-[#d99b61] font-semibold tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-[10px] text-[#a89c90] font-mono">
                      ${item.price.toFixed(2)} ea
                    </span>
                  )}
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-[#a89c90]">
                    <button
                      onClick={() => handleToggleSave(item.id, item.name)}
                      className={`hover:text-[#caa06d] transition-colors flex items-center gap-1 cursor-pointer text-[10px] uppercase font-bold tracking-wider ${
                        savedItems.includes(item.id) ? 'text-[#caa06d]' : ''
                      }`}
                    >
                      <Heart
                        className={`w-3 h-3 ${
                          savedItems.includes(item.id) ? 'fill-current' : ''
                        }`}
                      />
                      <span>SAVE</span>
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="hover:text-red-400 transition-colors p-0.5 cursor-pointer"
                      title="Remove allocation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Special Gift Tier Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-[#d99b61]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#1e1815] border border-[#d99b61]/25 flex items-center justify-center text-[#d99b61] shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#a89c90] uppercase tracking-wider font-semibold font-sans">
                    INCLUDED COURTESY OF ROASTERY
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#d99b61]/20 text-[#caa06d] text-[9px] font-bold uppercase tracking-wider">
                    GIFT TIER
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#f6efe8] font-sans mt-0.5">
                  Complimentary SCA Cupping Spoon &amp; Tasting Notes Journal
                </h4>
                <p className="text-[11px] text-[#a89c90] mt-0.5 font-light">
                  Automated gift pairing applied to all tasting orders exceeding $50.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#caa06d] shrink-0 font-sans uppercase tracking-wider">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>COMPLIMENTARY</span>
            </div>
          </div>

          {/* Under Items Actions */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-[#a89c90] hover:text-[#f6efe8] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Browsing Rituals</span>
            </button>

            <div className="flex items-center gap-4 text-[#a89c90] text-[11px]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d99b61]" />
                <span>256-Bit Sensory Checkout</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#caa06d]" />
                <span>Batch Roasting Freshness Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Summary Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-stone-950/85 border border-[#d99b61]/25 shadow-2xl backdrop-blur-md">
            <div className="space-y-1 pb-4 border-b border-stone-800">
              <span className="text-[10px] text-[#a89c90] uppercase font-bold tracking-[0.25em] font-sans block">
                SUMMARY BREAKDOWN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#f6efe8]">
                Ritual Allocation
              </h2>
            </div>

            {/* Calculations Breakdown */}
            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between items-center text-[#a89c90]">
                <span>Subtotal ({totalItemCount} selections)</span>
                <span className="font-mono text-[#f6efe8] text-sm tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between items-center text-[#caa06d]">
                  <span>Curator Privilege ({discountPercent}%)</span>
                  <span className="font-mono text-sm tabular-nums">
                    -${discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-[#a89c90]">
                <span className="flex items-center gap-1">
                  Roastery Prep &amp; Courier <Info className="w-3 h-3 text-[#a89c90]/60" />
                </span>
                <span className="font-semibold text-emerald-400 uppercase text-[11px]">
                  FREE
                </span>
              </div>

              <div className="flex justify-between items-center text-[#a89c90]">
                <span>Estimated Extraction Tax (6.0%)</span>
                <span className="font-mono text-[#f6efe8] tabular-nums">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-[#a89c90]">
                <span>SCA Sensory Journal Gift</span>
                <span className="font-semibold text-[#caa06d] uppercase text-[11px]">
                  INCLUDED
                </span>
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-stone-800 flex justify-between items-baseline">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#a89c90]">
                    TOTAL PAYABLE
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-normal text-[#d99b61] tabular-nums mt-0.5">
                    ${total.toFixed(2)}
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#a89c90] uppercase">
                  USD TOTAL
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('checkout')}
              disabled={cartItems.length === 0}
              className={`w-full py-4 bg-gradient-to-r from-[#d99b61] via-[#e5b869] to-[#caa06d] text-[#0c0908] font-sans text-xs font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-[#d99b61]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-[#a89c90] text-center mt-3 leading-relaxed">
              Secured with biometric tokenization &amp; immediate roasting queue placement.
            </p>

            {/* Curator Code Collapsible */}
            <div className="mt-4 pt-4 border-t border-stone-800/80">
              <button
                type="button"
                onClick={() => setCuratorCodeOpen(!curatorCodeOpen)}
                className="w-full flex items-center justify-between text-xs text-[#a89c90] hover:text-[#f6efe8] transition-colors py-1 cursor-pointer font-sans"
              >
                <span className="flex items-center gap-2">
                  <Gift className="w-3.5 h-3.5 text-[#caa06d]" />
                  <span>Have a Curator Code?</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    curatorCodeOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {curatorCodeOpen && (
                <form
                  onSubmit={handleApplyCuratorCode}
                  className="mt-3 flex gap-2 animate-in fade-in duration-200"
                >
                  <input
                    type="text"
                    placeholder="Enter code (ATELIER15)..."
                    value={curatorCode}
                    onChange={(e) => setCuratorCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#0c0908] border border-stone-800 text-xs text-[#f6efe8] placeholder-[#a89c90]/60 focus:outline-none focus:border-[#d99b61]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-bold text-[#f6efe8] uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Roast Purity Pledge Card */}
          <div className="p-6 rounded-2xl bg-stone-950/70 border border-[#d99b61]/20 space-y-2">
            <div className="flex items-center gap-2 text-[#caa06d] text-xs font-bold uppercase tracking-wider font-sans">
              <ShieldCheck className="w-4 h-4 text-[#d99b61]" />
              <span>THE BREWVERSE ROAST PURITY PLEDGE</span>
            </div>
            <p className="text-xs text-[#a89c90] leading-relaxed">
              Every green lot is sampled at origin, profile-roasted under digital micro-curve thermal control, and degassed with inert argon flushing for peak sensory bloom.
            </p>
          </div>
        </div>
      </div>

      {/* =======================================================================
          HARMONIOUS COMPANIONS: COMPLETE YOUR BREW RITUAL
          ======================================================================= */}
      <section className="mt-20 pt-16 border-t border-stone-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] text-[#caa06d] font-bold uppercase tracking-[0.25em] block mb-1 font-sans">
              HARMONIOUS COMPANIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f6efe8]">
              Complete Your Brew Ritual
            </h2>
          </div>
          <button
            onClick={() => onNavigate('collection')}
            className="text-xs text-[#caa06d] hover:text-[#f6efe8] uppercase tracking-wider font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>VIEW ALL ATELIER EQUIPMENT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Companion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMPANIONS.map((companion) => (
            <div
              key={companion.id}
              className="group relative rounded-2xl bg-stone-950/80 border border-[#d99b61]/15 hover:border-[#d99b61]/45 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              {/* Product Visual with Category Tag */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1e1815]">
                <img
                  src={companion.image}
                  alt={companion.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[#caa06d] text-[10px] font-bold uppercase tracking-widest font-mono">
                  {companion.categoryTag}
                </span>
              </div>

              {/* Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#d99b61] uppercase tracking-widest font-semibold block font-sans">
                    {companion.categoryTag === 'HARDWARE'
                      ? 'PRECISION EXTRACTION'
                      : companion.categoryTag === 'GLASSWARE'
                      ? 'SLOW DRIP DECANTER'
                      : 'SENSORY AMBIANCE'}
                  </span>
                  <h3 className="font-bold text-lg text-[#f6efe8] mt-1 font-sans">
                    {companion.name}
                  </h3>
                  <p className="text-xs text-[#a89c90] mt-2 leading-relaxed">
                    {companion.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="font-serif text-2xl text-[#d99b61] font-semibold tabular-nums">
                    ${companion.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onAddCompanion(companion)}
                    className="py-2 px-4 rounded-lg bg-[#1e1815] hover:bg-[#d99b61] hover:text-[#0c0908] text-[#f6efe8] border border-stone-800 hover:border-[#d99b61] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
