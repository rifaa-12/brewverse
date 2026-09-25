import React, { useState } from 'react';
import { Product, ScreenType } from '../types';
import { PRODUCTS } from '../data/mockData';
import {
  ArrowRight,
  PlayCircle,
  SlidersHorizontal,
  Star,
  Send,
  Sparkles,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  Flame,
  Hourglass,
  Leaf,
  CheckCircle2,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  onQuickAdd: (product: Product) => void;
  onOpenCustomizer: (product: Product) => void;
  onOpenFilmModal: () => void;
  onShowToast: (title: string, desc: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onQuickAdd,
  onOpenCustomizer,
  onOpenFilmModal,
  onShowToast,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Private Cupping Tasting Ritual');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    onShowToast('Dispatch Confirmed', 'Our Lead Cupper will contact you within 24 hours.');
    setInquiryName('');
    setInquiryEmail('');
    setInquiryMessage('');
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <div className="relative w-full">
      {/* =======================================================================
          HERO SECTION: CINEMATIC COMMERCIAL STAGE
          ======================================================================= */}
      <section className="relative min-h-[92vh] flex items-center w-full px-6 md:px-12 max-w-7xl mx-auto py-12 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: High-Fashion Luxury Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 z-20">
            {/* Micro Tagline Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1e1815]/90 border border-[#d99b61]/25 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#d99b61] animate-ping" />
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#caa06d] uppercase font-sans">
                BREWVERSE • ARTISANAL ROASTERY
              </span>
            </div>

            {/* Bold Luxury Serif Headline */}
            <div className="space-y-1">
              <span className="font-bold text-xs uppercase tracking-[0.32em] text-[#d99b61] block font-sans">
                The Essence of Cupping
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-[4.75rem] font-normal tracking-tight text-[#f6efe8] leading-[1.04]">
                Crafted for
                <br />
                <span className="italic font-normal text-[#caa06d] drop-shadow-[0_2px_24px_rgba(217,155,97,0.35)]">
                  the Moment.
                </span>
              </h1>
            </div>

            {/* Editorial Body Pitch */}
            <p className="text-[#a89c90] text-base sm:text-lg max-w-lg leading-relaxed font-light">
              An intentional pause in every sip. Micro-roasted single-origin extractions transformed into tactile luxury for the early risers, late thinkers, and the discerning palate.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const elem = document.getElementById('collection-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('collection');
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#d99b61] via-[#e5b869] to-[#caa06d] text-[#0c0908] text-sm font-bold tracking-wide uppercase rounded-lg shadow-xl shadow-[#d99b61]/20 hover:scale-[1.02] transition-transform duration-300 group cursor-pointer"
              >
                <span>Order Coffee Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenFilmModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-stone-950/60 border border-[#d99b61]/25 hover:border-[#d99b61]/50 text-[#f6efe8] text-sm font-semibold tracking-wide backdrop-blur-md transition-colors cursor-pointer"
                type="button"
              >
                <PlayCircle className="w-5 h-5 text-[#caa06d]" />
                <span>Explore the Ritual</span>
              </button>
            </div>

            {/* Cupping Score & Provenance */}
            <div className="pt-6 border-t border-[#d99b61]/15 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#e5b869] font-bold tabular-nums">
                  98.4
                </div>
                <div className="text-[10px] text-[#a89c90] uppercase tracking-wider font-semibold">
                  SCA Cupping
                  <br />
                  Score Peak
                </div>
              </div>
              <div className="border-l border-stone-800 pl-4">
                <div className="font-serif text-2xl sm:text-3xl text-[#caa06d] font-bold">
                  100%
                </div>
                <div className="text-[10px] text-[#a89c90] uppercase tracking-wider font-semibold">
                  Traceable
                  <br />
                  Single Origin
                </div>
              </div>
              <div className="border-l border-stone-800 pl-4">
                <div className="font-serif text-2xl sm:text-3xl text-[#f6efe8] font-bold">
                  Micro
                </div>
                <div className="text-[10px] text-[#d99b61] uppercase tracking-wider font-semibold">
                  Atmospheric
                  <br />
                  Roast Drum
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated 3D Stage Space with Spotlight & Interactive Indicator */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] lg:min-h-[580px]">
            {/* Radial Halo Spotlight on 3D Cup */}
            <div className="pointer-events-none absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(217,155,97,0.22)_0%,_rgba(140,74,30,0.08)_45%,_transparent_72%)] blur-3xl animate-ambient-glow" />

            {/* Concentric Orbit Ring Graphic Accent Behind 3D Scene */}
            <div className="pointer-events-none absolute w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] rounded-full border border-[#d99b61]/15 border-dashed animate-spin-slow" />

            {/* Bottom Floating Interactive Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-20">
              <div className="px-4 py-2.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-[#d99b61]/25 shadow-2xl flex items-center justify-between text-xs text-[#a89c90]">
                <div className="flex items-center gap-2">
                  <span className="text-[#d99b61] text-sm">✦</span>
                  <span className="tracking-wider uppercase text-[11px] text-[#f6efe8]/90 font-medium">
                    Drag to Rotate • Scroll to Explore
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#d99b61]/20 text-[#caa06d] text-[10px] font-bold uppercase tracking-widest">
                  3D Real-Time
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          MARQUEE TICKER: TACTILE GOLDEN ACCENT RIBBON
          ======================================================================= */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#d99b61] via-[#e5b869] to-[#caa06d] text-[#0c0908] py-3 shadow-inner font-sans font-bold text-xs tracking-[0.25em] uppercase select-none">
        <div className="flex whitespace-nowrap items-center gap-8 animate-marquee">
          <div className="flex items-center gap-8 shrink-0">
            <span>Thoughtfully Sourced</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Made to Slow You Down</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Single-Origin Extractions</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Crafted for the Extraordinary</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Micro-Roast Atelier</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </div>
          <div aria-hidden="true" className="flex items-center gap-8 shrink-0">
            <span>Thoughtfully Sourced</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Made to Slow You Down</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Single-Origin Extractions</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Crafted for the Extraordinary</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Micro-Roast Atelier</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>
      </div>

      {/* =======================================================================
          SECTION 01: THREE PILLARS (PHILOSOPHY & SOURCING)
          ======================================================================= */}
      <section
        className="relative w-full py-24 bg-[#14100e]/95 border-t border-stone-800/60"
        id="story-section"
      >
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#d99b61]" />
                <span className="text-xs text-[#caa06d] uppercase tracking-[0.25em] font-semibold">
                  01 / Our Story
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f6efe8] leading-tight">
                From Bean
                <br />
                <span className="italic text-[#caa06d]">to Moment.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[#a89c90] leading-relaxed pl-4 border-l-2 border-[#d99b61]/30 text-sm sm:text-base">
                We believe great coffee is never just about what is inside the cup. It is about every hand, every choice, and every quiet moment that brings it to you.
              </p>
            </div>
          </div>

          {/* 3 Pillars Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="group relative p-8 rounded-2xl bg-stone-950/75 backdrop-blur-md border border-[#d99b61]/15 hover:border-[#d99b61]/45 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#d99b61]/5 blur-2xl group-hover:bg-[#d99b61]/15 transition-all" />
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-[#a89c90] tracking-widest uppercase">
                    01 / 03
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#1e1815] border border-[#d99b61]/20 flex items-center justify-center text-[#caa06d]">
                    <Leaf className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-[11px] text-[#d99b61] uppercase tracking-widest mb-1.5 font-bold">
                  Origin / The Beginning
                </div>
                <h3 className="font-serif text-2xl text-[#f6efe8] mb-3 font-medium">
                  Sourced with Soul
                </h3>
                <p className="text-sm text-[#a89c90] leading-relaxed">
                  It begins at origin. We seek exceptional micro-lots from regenerative growers who care as deeply about soil biology as they do about flavor clarity.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-800/80 flex items-center gap-2 text-xs font-semibold text-[#caa06d]">
                <span>Direct Fair Trade Guild</span>
                <ShieldCheck className="w-4 h-4 text-[#d99b61]" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group relative p-8 rounded-2xl bg-stone-950/75 backdrop-blur-md border border-[#d99b61]/15 hover:border-[#d99b61]/45 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#8c4a1e]/15 blur-2xl group-hover:bg-[#8c4a1e]/30 transition-all" />
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-[#a89c90] tracking-widest uppercase">
                    02 / 03
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#1e1815] border border-[#d99b61]/20 flex items-center justify-center text-[#caa06d]">
                    <Flame className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-[11px] text-[#d99b61] uppercase tracking-widest mb-1.5 font-bold">
                  Craft / The Alchemy
                </div>
                <h3 className="font-serif text-2xl text-[#f6efe8] mb-3 font-medium">
                  Roasted with Intention
                </h3>
                <p className="text-sm text-[#a89c90] leading-relaxed">
                  Every roast is an intentional act of alchemy—monitored by density and humidity curves to fully develop natural floral sugars without bitter overtones.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-800/80 flex items-center gap-2 text-xs font-semibold text-[#caa06d]">
                <span>Precision Convection Drums</span>
                <Sparkles className="w-4 h-4 text-[#d99b61]" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group relative p-8 rounded-2xl bg-stone-950/75 backdrop-blur-md border border-[#d99b61]/15 hover:border-[#d99b61]/45 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#e5b869]/5 blur-2xl group-hover:bg-[#e5b869]/20 transition-all" />
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-[#a89c90] tracking-widest uppercase">
                    03 / 03
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#1e1815] border border-[#d99b61]/20 flex items-center justify-center text-[#caa06d]">
                    <Hourglass className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-[11px] text-[#d99b61] uppercase tracking-widest mb-1.5 font-bold">
                  Ritual / The Reward
                </div>
                <h3 className="font-serif text-2xl text-[#f6efe8] mb-3 font-medium">
                  Made for Your Moment
                </h3>
                <p className="text-sm text-[#a89c90] leading-relaxed">
                  Thoughtfully extracted, temperature balanced, and poured in signature vessels. The final, essential ingredient is the mindful pause you take for yourself.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-800/80 flex items-center gap-2 text-xs font-semibold text-[#caa06d]">
                <span>Mindful Sensory Pacing</span>
                <Sparkles className="w-4 h-4 text-[#d99b61]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 02: THE COLLECTION & SPECIALTY MENU
          ======================================================================= */}
      <section className="relative w-full py-24 bg-[#0c0908]" id="collection-section">
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#d99b61]" />
                <span className="text-xs text-[#caa06d] uppercase tracking-[0.25em] font-semibold">
                  02 / The Collection
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f6efe8] leading-tight">
                Find Your
                <br />
                <span className="italic text-[#caa06d]">Kind of Coffee.</span>
              </h2>
            </div>
            <div className="max-w-md space-y-2">
              <p className="text-[#a89c90] text-sm">
                Distinct expressions. One shared obsession with making every sip worth savoring.
              </p>
              <span className="inline-flex items-center gap-1 text-[#caa06d] text-xs uppercase tracking-wider font-semibold">
                Crafted to be Craved
              </span>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-xl bg-[#1e1815] border border-stone-800 max-w-fit">
            {[
              { id: 'all', label: 'All Expressions' },
              { id: 'signature', label: 'Signature Brews' },
              { id: 'milk', label: 'Velvet Crema' },
              { id: 'cold', label: 'Cold Rituals' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterCategory(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-[#d99b61] text-[#0c0908] shadow-md shadow-[#d99b61]/20'
                    : 'text-[#a89c90] hover:text-[#f6efe8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-stone-950/80 border border-[#d99b61]/15 hover:border-[#d99b61]/45 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl backdrop-blur-md"
              >
                <div className="p-6 pb-2">
                  <div className="flex items-center justify-between text-xs text-[#a89c90] font-mono mb-3">
                    <span className="px-2 py-0.5 rounded bg-[#1e1815] border border-stone-800 text-[#caa06d] uppercase text-[10px]">
                      {product.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[#e5b869]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {product.rating.toFixed(1)}
                    </span>
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

                  <p className="text-xs text-[#a89c90] mt-3 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Roast Profile Gauge */}
                  <div className="mt-6 flex items-center justify-between text-xs border-t border-stone-800/80 pt-3">
                    <span className="text-[#a89c90] text-[11px] uppercase tracking-wider">
                      Roast Profile
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`w-2.5 h-2.5 rounded-full ${
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
                    title="Customize cup extraction"
                    type="button"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View Complete Menu CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('collection')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#caa06d] hover:text-[#f6efe8] transition-colors font-semibold cursor-pointer border-b border-[#caa06d]/40 pb-1"
            >
              <span>Explore All Reserve Lots &amp; Atelier Equipment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =======================================================================
          EDITORIAL INTERLUDE: CELESTIAL MEDITATION PAUSE
          ======================================================================= */}
      <section
        className="relative w-full py-28 overflow-hidden bg-[#14100e]/85 border-y border-stone-800/50"
        id="ritual-anchor"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
          <svg
            className="w-[580px] h-[580px] text-[#d99b61] animate-spin-slow"
            fill="none"
            viewBox="0 0 400 400"
          >
            <circle
              cx="200"
              cy="200"
              r="190"
              stroke="currentColor"
              strokeDasharray="4 4"
              strokeWidth="0.75"
            />
            <circle cx="200" cy="200" r="135" stroke="currentColor" strokeWidth="0.5" />
            <circle
              cx="200"
              cy="200"
              r="85"
              stroke="currentColor"
              strokeDasharray="2 6"
              strokeWidth="0.75"
            />
          </svg>
        </div>

        <div className="relative w-full px-6 md:px-12 max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#d99b61]" />
            <span className="text-xs text-[#caa06d] tracking-[0.25em] uppercase font-semibold">
              A Note From Us
            </span>
            <span className="h-px w-8 bg-[#d99b61]" />
          </div>

          <blockquote className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#f6efe8] leading-tight font-normal">
            Life moves fast.
            <br />
            <span className="italic text-[#caa06d]">Good coffee</span> asks you to pause.
          </blockquote>

          <p className="text-xs text-[#a89c90] tracking-[0.28em] uppercase pt-2">
            Take a moment. Make it yours.
          </p>

          <div className="pt-6 flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1e1815] border border-[#d99b61]/30 flex items-center justify-center text-[#caa06d] font-serif italic text-xl font-bold">
              B.
            </div>
            <div className="text-left text-xs">
              <div className="font-bold text-[#f6efe8]">BrewVerse Master Roaster</div>
              <div className="text-[#a89c90]">Kyoto &amp; Milan Roast Guilds</div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          SECTION 03: TASTING CONCIERGE & INQUIRIES
          ======================================================================= */}
      <section className="relative w-full py-24 bg-[#0c0908]" id="inquiry-section">
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Atelier Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-6 bg-[#d99b61]" />
                  <span className="text-xs text-[#caa06d] uppercase tracking-[0.25em] font-semibold">
                    03 / Get In Touch
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f6efe8] leading-tight">
                  Let’s Talk
                  <br />
                  <span className="italic text-[#caa06d]">Coffee.</span>
                </h2>
              </div>
              <p className="text-[#a89c90] leading-relaxed text-sm">
                Good conversations start here. Whether you seek bespoke roasting consultations, private sensory tastings, or wholesale atelier partnerships, our lead cuppers are at your service.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d99b61] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[#f6efe8] text-sm font-semibold">
                      The Atelier &amp; Tasting Lab
                    </div>
                    <div className="text-xs text-[#a89c90]">
                      482 Roast Guild Lane, Arts District, Atelier No. 4
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#d99b61] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[#f6efe8] text-sm font-semibold">Tasting Hours</div>
                    <div className="text-xs text-[#a89c90]">
                      Tuesday — Sunday: 07:00 — 18:00
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#d99b61] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[#f6efe8] text-sm font-semibold">Direct Dispatch</div>
                    <div className="text-xs text-[#a89c90]">concierge@brewverse-atelier.com</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-950/70 border border-[#d99b61]/15 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1e1815] border border-[#d99b61]/25 flex items-center justify-center text-[#caa06d] font-serif italic text-lg font-bold shrink-0">
                  B.
                </div>
                <div className="text-xs text-[#a89c90]">
                  “Good conversations start here. Sip slowly, think clearly.”
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-[#d99b61]/25 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#caa06d] uppercase tracking-widest font-semibold">
                    Drop Us a Line
                  </span>
                  <Send className="w-4 h-4 text-[#a89c90]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f6efe8] mb-2">
                  What’s on your mind?
                </h3>
                <p className="text-xs text-[#a89c90] mb-6">
                  Send us a note and our brew guild concierge will get back to you within 24 hours.
                </p>

                {inquirySent ? (
                  <div className="p-6 rounded-xl bg-[#1e1815] border border-[#d99b61]/40 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-[#d99b61] mx-auto" />
                    <h4 className="text-sm font-bold text-[#f6efe8]">Inquiry Received</h4>
                    <p className="text-xs text-[#a89c90]">
                      Your sensory query has reached our lead cupper. We look forward to connecting with you.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleInquirySubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-[#a89c90] uppercase block font-semibold">
                          Your Name
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] placeholder-[#a89c90]/50 text-xs focus:outline-none focus:border-[#d99b61]"
                          placeholder="How should we call you?"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          required
                          type="text"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-[#a89c90] uppercase block font-semibold">
                          Email Address
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] placeholder-[#a89c90]/50 text-xs focus:outline-none focus:border-[#d99b61]"
                          placeholder="you@domain.com"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          required
                          type="email"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#a89c90] uppercase block font-semibold">
                        Inquiry Type
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] text-xs focus:outline-none focus:border-[#d99b61]"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                      >
                        <option>Private Cupping Tasting Ritual</option>
                        <option>Specialty Espresso Beans Wholesale</option>
                        <option>Private Atelier Event / Catering</option>
                        <option>General Note to Roasters</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#a89c90] uppercase block font-semibold">
                        Your Message
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg bg-[#0c0908] border border-stone-800 text-[#f6efe8] placeholder-[#a89c90]/50 text-xs focus:outline-none focus:border-[#d99b61] resize-none"
                        placeholder="Tell us about your palate preferences or event..."
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        required
                        rows={4}
                      />
                    </div>

                    <button
                      className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#d99b61] via-[#e5b869] to-[#caa06d] hover:opacity-95 text-[#0c0908] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      type="submit"
                    >
                      <span>Send a Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
