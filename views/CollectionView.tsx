import React, { useState } from 'react';
import { Product, ScreenType } from '../types';
import { PRODUCTS } from '../data/mockData';
import { Star, SlidersHorizontal, ArrowRight, Search, Sparkles } from 'lucide-react';

interface CollectionViewProps {
  onNavigate: (screen: ScreenType) => void;
  onQuickAdd: (product: Product) => void;
  onOpenCustomizer: (product: Product) => void;
  onShowToast: (title: string, desc: string) => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  onNavigate,
  onQuickAdd,
  onOpenCustomizer,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flavorNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full pt-8 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#f6efe8]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-6 bg-[#d99b61]" />
            <span className="text-xs text-[#caa06d] uppercase tracking-[0.25em] font-semibold font-sans">
              ATELIER ROAST COLLECTION
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f6efe8] leading-tight">
            The Complete<br />
            <span className="italic text-[#caa06d]">Extraction Repertoire.</span>
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search notes, varietals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#161311] border border-stone-800 text-xs text-[#f6efe8] placeholder-[#a89c90]/50 focus:outline-none focus:border-[#d99b61]"
          />
          <Search className="w-4 h-4 text-[#a89c90] absolute left-3 top-3" />
        </div>
      </div>

      {/* Category Segmented Control */}
      <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-xl bg-[#1e1815] border border-stone-800 max-w-fit">
        {[
          { id: 'all', label: 'All Expressions' },
          { id: 'signature', label: 'Signature Brews' },
          { id: 'milk', label: 'Velvet Crema' },
          { id: 'cold', label: 'Cold Rituals' },
          { id: 'hardware', label: 'Hardware & Vessels' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-[#d99b61] text-[#0c0908] shadow-md shadow-[#d99b61]/25'
                : 'text-[#a89c90] hover:text-[#f6efe8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-2xl bg-stone-950/80 border border-[#d99b61]/15 hover:border-[#d99b61]/45 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl backdrop-blur-md"
          >
            <div className="p-6 pb-2">
              {/* Image banner */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#1e1815] mb-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#caa06d] text-[10px] font-bold uppercase tracking-widest font-mono">
                  {product.categoryLabel}
                </span>
                {product.scaScore && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#e5b869]/20 backdrop-blur-md text-[#e5b869] text-[10px] font-bold font-mono">
                    {product.scaScore} SCA
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <button
                  onClick={() => onNavigate('product')}
                  className="font-serif text-2xl text-[#f6efe8] group-hover:text-[#caa06d] transition-colors text-left cursor-pointer"
                >
                  {product.name}
                </button>
                <span className="font-serif text-2xl text-[#d99b61] font-semibold tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="text-xs text-[#caa06d]/90 font-medium tracking-wide mt-1">
                {product.flavorNotes}
              </div>

              <p className="text-xs text-[#a89c90] mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Roast level indicator */}
              <div className="mt-5 flex items-center justify-between text-xs border-t border-stone-800/80 pt-3">
                <span className="text-[#a89c90] text-[11px] uppercase tracking-wider">
                  Roast Profile
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`w-2 h-2 rounded-full ${
                        lvl <= product.roastLevel ? 'bg-[#d99b61]' : 'bg-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-3 flex items-center gap-2">
              <button
                onClick={() => onQuickAdd(product)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#d99b61] to-[#caa06d] hover:opacity-95 text-[#0c0908] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                type="button"
              >
                <span>Quick Add +</span>
              </button>
              <button
                onClick={() => onOpenCustomizer(product)}
                className="p-3 rounded-xl bg-[#1e1815] hover:bg-[#231f1d] text-[#f6efe8] transition-colors border border-stone-800 cursor-pointer"
                title="Customize cup"
                type="button"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
