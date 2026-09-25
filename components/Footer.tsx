import React, { useState } from 'react';
import { ScreenType } from '../types';
import { BRAND_LOGO_URL } from '../data/mockData';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (title: string, desc: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    onShowToast('Subscribed to Ritual', 'Welcome to the inner brew guild reserve.');
    setEmail('');
  };

  return (
    <footer className="relative z-20 w-full bg-[#14100e] border-t border-[#d99b61]/15 pt-16 pb-12 text-[#f6efe8]">
      <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_LOGO_URL}
                alt="BrewVerse Brand Logo"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-sans font-bold text-sm tracking-[0.28em] text-[#f6efe8] uppercase">
                BREW<span className="text-[#d99b61]">VERSE</span>
              </span>
            </div>
            <p className="font-serif text-lg text-[#caa06d] italic max-w-md">
              A little coffee. A lot of feeling. Made for the moments that make a day.
            </p>
            <p className="text-xs text-[#a89c90] max-w-sm leading-relaxed">
              Handcrafted single-origin extractions and micro-lot roast rituals engineered for discerning palates and mindful mornings.
            </p>
          </div>

          {/* Explore Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs text-[#d99b61] uppercase tracking-widest font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#a89c90]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#caa06d] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-[#caa06d] transition-colors cursor-pointer text-left"
                >
                  The Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product')}
                  className="hover:text-[#caa06d] transition-colors cursor-pointer text-left"
                >
                  Single Origins
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cart')}
                  className="hover:text-[#caa06d] transition-colors cursor-pointer text-left"
                >
                  Tasting Ritual
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('checkout')}
                  className="hover:text-[#caa06d] transition-colors cursor-pointer text-left"
                >
                  Courier Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs text-[#d99b61] uppercase tracking-widest font-semibold">
              Connect
            </h4>
            <ul className="space-y-2 text-xs text-[#a89c90]">
              <li>
                <a
                  href="#story-section"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#caa06d] transition-colors cursor-pointer"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#inquiry-section"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#caa06d] transition-colors cursor-pointer"
                >
                  Atelier Concierge
                </a>
              </li>
              <li>
                <span className="text-[#a89c90]/80">Instagram: @brewverse</span>
              </li>
              <li>
                <span className="text-[#a89c90]/80">Dispatch: Atelier No. 4</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs text-[#d99b61] uppercase tracking-widest font-semibold">
              Join the Ritual
            </h4>
            <p className="text-xs text-[#a89c90]">
              Receive private release tasting allocations, seasonal harvest alerts, and espresso notes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center rounded-lg bg-[#0c0908] border border-stone-800 p-1 focus-within:border-[#d99b61]">
                <input
                  className="w-full bg-transparent px-3 py-2 text-xs text-[#f6efe8] placeholder-[#a89c90]/60 focus:outline-none"
                  placeholder="Your email ritual..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                />
                <button
                  className="px-4 py-2 bg-gradient-to-r from-[#d99b61] to-[#caa06d] text-[#0c0908] text-xs font-bold rounded-md hover:opacity-95 transition-opacity cursor-pointer shrink-0"
                  type="submit"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] text-[#a89c90]/70 block">
                Curated micro-releases only. Unsubscribe at leisure.
              </span>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a89c90]">
          <div className="flex items-center gap-2">
            <span className="text-[#e5b869] font-medium">© 2025 BrewVerse Atelier.</span>
            <span>All rights reserved. Single Origin Roasting Guild.</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider font-mono">
            <span className="hover:text-[#caa06d] transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#caa06d] transition-colors cursor-pointer">
              Terms of Extraction
            </span>
            <span className="hover:text-[#caa06d] transition-colors cursor-pointer">
              Provenance Registry
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
