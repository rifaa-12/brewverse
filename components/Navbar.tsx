import React from 'react';
import { ScreenType } from '../types';
import { BRAND_LOGO_URL } from '../data/mockData';
import { ShoppingBag, User, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  onToggleCartDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onToggleCartDrawer,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c0908]/90 backdrop-blur-xl border-b border-[#d99b61]/15 transition-all duration-300">
      <div className="h-20 w-full px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Brand Wordmark with Emblem */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 group cursor-pointer text-left focus:outline-none"
        >
          <img
            src={BRAND_LOGO_URL}
            alt="BrewVerse Emblem"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-[0.26em] text-[#f6efe8] uppercase font-sans">
              BREW<span className="text-[#d99b61]">VERSE</span>
            </span>
            <span className="text-[10px] tracking-[0.24em] text-[#caa06d] uppercase font-semibold">
              Artisanal Roastery
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer ${
              currentScreen === 'home'
                ? 'text-[#d99b61]'
                : 'text-[#a89c90] hover:text-[#f6efe8]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('collection')}
            className={`transition-colors cursor-pointer ${
              currentScreen === 'collection'
                ? 'text-[#d99b61]'
                : 'text-[#a89c90] hover:text-[#f6efe8]'
            }`}
          >
            Collection
          </button>
          <button
            onClick={() => onNavigate('product')}
            className={`transition-colors cursor-pointer ${
              currentScreen === 'product'
                ? 'text-[#d99b61]'
                : 'text-[#a89c90] hover:text-[#f6efe8]'
            }`}
          >
            Product
          </button>
          <button
            onClick={() => onNavigate('cart')}
            className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'cart'
                ? 'text-[#d99b61]'
                : 'text-[#a89c90] hover:text-[#f6efe8]'
            }`}
          >
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#d99b61]/20 text-[#caa06d]">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('checkout')}
            className={`transition-colors cursor-pointer ${
              currentScreen === 'checkout'
                ? 'text-[#d99b61]'
                : 'text-[#a89c90] hover:text-[#f6efe8]'
            }`}
          >
            Checkout
          </button>
        </nav>

        {/* Zone 3: Actions & Cart Trigger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('cart')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#d99b61] to-[#caa06d] text-[#0c0908] text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#d99b61]/15 hover:opacity-95 hover:shadow-[#d99b61]/30 transition-all duration-300 cursor-pointer"
          >
            <span>Explore Rituals</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Cart Drawer Trigger */}
          <button
            aria-label="Toggle Cart Drawer"
            onClick={onToggleCartDrawer}
            className="relative p-2.5 rounded-lg bg-[#1e1815]/90 border border-[#d99b61]/20 hover:border-[#d99b61]/40 hover:bg-[#231f1d] transition-all text-[#f6efe8] flex items-center justify-center cursor-pointer"
            type="button"
          >
            <ShoppingBag className="w-5 h-5 text-[#f6efe8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-[#d99b61] text-[#0c0908] text-[11px] font-bold flex items-center justify-center shadow-md tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Atelier Member Avatar */}
          <button
            onClick={() => onNavigate('checkout')}
            title="Atelier Roaster Profile"
            className="w-8 h-8 rounded-full bg-[#2d2928] border border-[#d99b61]/20 flex items-center justify-center text-[#caa06d] hover:border-[#d99b61]/50 transition-colors cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
