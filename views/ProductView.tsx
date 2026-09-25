import React, { useState } from 'react';
import { ScreenType } from '../types';
import {
  Star,
  ShieldCheck,
  Flame,
  Award,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Layers,
  Thermometer,
  Clock,
  Compass,
} from 'lucide-react';

interface ProductViewProps {
  onAddToCart: (item: {
    name: string;
    subtitle: string;
    categoryTag: string;
    price: number;
    quantity: number;
    weightOrSize: string;
    grind: string;
    roast: string;
    notes: string;
    image: string;
  }) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (title: string, desc: string) => void;
}

export const ProductView: React.FC<ProductViewProps> = ({
  onAddToCart,
  onNavigate,
  onShowToast,
}) => {
  const [selectedGrind, setSelectedGrind] = useState('Espresso Fine');
  const [selectedRoast, setSelectedRoast] = useState('French Noir (Dark)');
  const [selectedSize, setSelectedSize] = useState('250g Atelier Tin');
  const [quantity, setQuantity] = useState(1);

  const basePrice = 24.0;
  const sizeMultiplier =
    selectedSize === '500g Reserve Box'
      ? 1.85
      : selectedSize === '1kg Roastery Sack'
      ? 3.4
      : 1.0;
  const unitPrice = basePrice * sizeMultiplier;
  const totalPrice = unitPrice * quantity;

  const handleAddAllocation = () => {
    onAddToCart({
      name: `Midnight Roast — ${selectedSize.split(' ')[0]}`,
      subtitle: `Grind: ${selectedGrind} • Roast: ${selectedRoast.split(' ')[0]}`,
      categoryTag: 'LOT #089 • ETHIOPIAN YIRGACHEFFE',
      price: unitPrice,
      quantity,
      weightOrSize: selectedSize.split(' ')[0],
      grind: selectedGrind,
      roast: selectedRoast,
      notes: 'DARK COCOA • DRIED FIG • BERGAMOT',
      image:
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    });
    onShowToast(
      'Allocation Calibrated',
      `Added ${quantity}x Midnight Roast (${selectedSize.split(' ')[0]}) to tasting ritual.`
    );
  };

  return (
    <div className="relative w-full pt-8 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#f6efe8]">
      {/* Breadcrumb Eyebrow */}
      <div className="flex items-center gap-2 text-xs text-[#a89c90] mb-6 font-sans">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#caa06d] transition-colors cursor-pointer"
        >
          Atelier
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('collection')}
          className="hover:text-[#caa06d] transition-colors cursor-pointer"
        >
          Single Origins
        </button>
        <span>/</span>
        <span className="text-[#d99b61] font-semibold">Lot #089 Ethiopian Yirgacheffe</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Visual Showcase & Sensory Flavor Radar */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Visual Frame */}
          <div className="relative aspect-[4/3] rounded-3xl bg-[#161311] border border-[#d99b61]/25 overflow-hidden shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80"
              alt="Midnight Roast Ethiopian Yirgacheffe"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0908]/90 via-transparent to-transparent pointer-events-none" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-[#d99b61]/30 text-[#e5b869] text-xs font-bold font-mono">
                SCA 98.4 SCORE
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 text-[#caa06d] text-xs font-semibold">
                MICRO-LOT #089
              </span>
            </div>

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#a89c90]">
              <span className="font-mono">Altitude: 1,950m ASL</span>
              <span className="font-mono">Heirloom Varietals</span>
              <span className="text-[#d99b61] font-bold uppercase tracking-wider">
                Direct Guild Trade
              </span>
            </div>
          </div>

          {/* Cupping Flavor Profile Analysis */}
          <div className="p-7 rounded-2xl bg-stone-950/80 border border-[#d99b61]/20 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#d99b61] font-bold uppercase tracking-widest block font-sans">
                  SENSORY SPECTRUM
                </span>
                <h3 className="font-serif text-xl text-[#f6efe8]">Cupping Flavor Notes</h3>
              </div>
              <div className="flex items-center gap-1 text-[#e5b869] text-sm font-bold">
                <Award className="w-4 h-4" />
                <span>98.4 SCA Certified</span>
              </div>
            </div>

            {/* Cupping Radar Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-[#1e1815] border border-stone-800/80 text-center">
                <div className="text-[11px] text-[#a89c90] uppercase font-bold">Acidity</div>
                <div className="font-serif text-xl text-[#caa06d] mt-1 font-semibold">
                  Meyer Lemon
                </div>
                <div className="text-[10px] text-[#a89c90] mt-0.5">Bright &amp; Crisp</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1e1815] border border-stone-800/80 text-center">
                <div className="text-[11px] text-[#a89c90] uppercase font-bold">Body</div>
                <div className="font-serif text-xl text-[#caa06d] mt-1 font-semibold">
                  Velvet Cream
                </div>
                <div className="text-[10px] text-[#a89c90] mt-0.5">Thick &amp; Lingering</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1e1815] border border-stone-800/80 text-center">
                <div className="text-[11px] text-[#a89c90] uppercase font-bold">Aroma</div>
                <div className="font-serif text-xl text-[#caa06d] mt-1 font-semibold">
                  Bergamot Fig
                </div>
                <div className="text-[10px] text-[#a89c90] mt-0.5">Complex Florals</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1e1815] border border-stone-800/80 text-center">
                <div className="text-[11px] text-[#a89c90] uppercase font-bold">Finish</div>
                <div className="font-serif text-xl text-[#caa06d] mt-1 font-semibold">
                  Dark Cocoa
                </div>
                <div className="text-[10px] text-[#a89c90] mt-0.5">Sweet Smoked Wood</div>
              </div>
            </div>

            {/* Provenance Details List */}
            <div className="space-y-3 pt-3 text-xs border-t border-stone-800">
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-[#a89c90]">Producer &amp; Region</span>
                <span className="text-[#f6efe8] font-medium">Gedeo Zone, Yirgacheffe, Southern Nations</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-[#a89c90]">Processing Method</span>
                <span className="text-[#f6efe8] font-medium">Anaerobic Washed + 48h Inert Tank Rest</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-[#a89c90]">Roast Atmosphere</span>
                <span className="text-[#f6efe8] font-medium">Loring Smart Roaster (Convection Gas)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 sm:p-8 rounded-2xl bg-stone-950/85 border border-[#d99b61]/25 shadow-2xl backdrop-blur-md space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-[#d99b61] uppercase tracking-[0.2em] font-sans">
                  PROVENANCE RESERVE LOT #089
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#f6efe8]">
                Midnight Roast — Whole Bean
              </h1>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1 text-[#e5b869]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="font-bold ml-1 text-[#f6efe8]">4.9</span>
                </div>
                <span className="text-[#a89c90]">·</span>
                <span className="text-[#caa06d] font-semibold">124 Cupping Reviews</span>
                <span className="text-[#a89c90]">·</span>
                <span className="text-emerald-400 font-medium">Fresh Crop in Roasting Queue</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="py-3 border-y border-stone-800 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-[#a89c90] uppercase font-mono block">
                  Per Tin / Allocation
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#d99b61] font-semibold tabular-nums">
                  ${unitPrice.toFixed(2)}
                </span>
              </div>
              <span className="text-xs text-[#caa06d] uppercase font-bold tracking-wider">
                In Stock • Fresh Roast
              </span>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-xs text-[#a89c90] uppercase font-bold tracking-wider block">
                Selection Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['250g Atelier Tin', '500g Reserve Box', '1kg Roastery Sack'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#d99b61] text-[#0c0908] font-bold shadow-md shadow-[#d99b61]/25'
                        : 'bg-[#1e1815] text-[#a89c90] hover:text-[#f6efe8] border border-stone-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Grind Profile */}
            <div className="space-y-2">
              <label className="text-xs text-[#a89c90] uppercase font-bold tracking-wider block">
                Grind Calibration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Whole Bean (Unbroken)',
                  'Espresso Fine',
                  'Chemex / V60 Medium',
                  'French Press Coarse',
                ].map((grind) => (
                  <button
                    key={grind}
                    type="button"
                    onClick={() => setSelectedGrind(grind)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-left truncate cursor-pointer ${
                      selectedGrind === grind
                        ? 'bg-[#d99b61] text-[#0c0908] font-bold shadow-sm'
                        : 'bg-[#1e1815] text-[#a89c90] hover:text-[#f6efe8] border border-stone-800'
                    }`}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>

            {/* Roast Profile */}
            <div className="space-y-2">
              <label className="text-xs text-[#a89c90] uppercase font-bold tracking-wider block flex items-center justify-between">
                <span>Roast Degree</span>
                <span className="text-[#caa06d] font-normal">{selectedRoast}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  'Nordic Light (Cinnamon)',
                  'Medium City (Balanced)',
                  'French Noir (Dark)',
                ].map((roast) => (
                  <button
                    key={roast}
                    type="button"
                    onClick={() => setSelectedRoast(roast)}
                    className={`py-2 px-2 rounded-lg text-[11px] font-semibold transition-all text-center cursor-pointer ${
                      selectedRoast === roast
                        ? 'bg-[#d99b61] text-[#0c0908] font-bold'
                        : 'bg-[#1e1815] text-[#a89c90] hover:text-[#f6efe8] border border-stone-800'
                    }`}
                  >
                    {roast.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#a89c90] uppercase font-bold">Quantity</span>
                <div className="flex items-center gap-3 bg-[#1e1815] border border-stone-800 rounded-lg px-3 py-1.5 shadow-inner">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#a89c90] hover:text-[#f6efe8] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono font-bold text-sm text-[#f6efe8] w-6 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#a89c90] hover:text-[#f6efe8] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleAddAllocation}
                className="w-full py-4 bg-gradient-to-r from-[#d99b61] via-[#e5b869] to-[#caa06d] text-[#0c0908] font-sans text-xs font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-[#d99b61]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add to Tasting Ritual (${totalPrice.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('cart')}
                className="w-full py-2.5 bg-transparent hover:bg-stone-900 border border-stone-800 text-[#caa06d] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center cursor-pointer"
              >
                View Current Allocation Review
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#110d0c] border border-stone-800 text-[11px] text-[#a89c90] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d99b61] shrink-0" />
              <span>Next micro-roast drum fires in 4h 12m. Orders dispatch warm.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
