import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface RitualFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RitualFilmModal: React.FC<RitualFilmModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0c0908]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl rounded-2xl bg-[#14100e] border border-[#d99b61]/25 shadow-2xl overflow-hidden p-5 text-[#f6efe8]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d99b61]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#f6efe8] font-sans">
              BrewVerse Extraction Philosophy Film
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#a89c90] hover:text-[#f6efe8] p-1 rounded hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video rounded-xl bg-[#0c0908] overflow-hidden flex items-center justify-center my-4 border border-stone-800/80 group">
          {/* Atmospheric background art */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(217,155,97,0.25)_0%,_rgba(12,9,8,0.95)_80%)]" />
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
            alt="Atelier Cupping Reel"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity filter contrast-125"
            referrerPolicy="no-referrer"
          />

          {/* Interactive Play/Pause button */}
          <div className="relative z-10 text-center space-y-3 px-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-[#d99b61] text-[#0c0908] flex items-center justify-center mx-auto hover:scale-110 transition-transform shadow-xl cursor-pointer"
              title={isPlaying ? 'Pause Reel' : 'Play Reel'}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </button>

            <p className="font-serif text-lg italic text-[#f6efe8] drop-shadow-md">
              “From 2,000 meters above sea level to velvety golden crema.”
            </p>
            <span className="text-[11px] text-[#caa06d] uppercase font-mono tracking-widest block">
              4K Atmospheric Cupping Reel • Kyoto &amp; Milan Roastery Guilds
            </span>
          </div>

          {/* Bottom Video Controls overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0c0908]/80 backdrop-blur-md text-xs text-[#a89c90] border border-stone-800/60 z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] text-[#f6efe8]">01:42 / 04:15</span>
              <span>·</span>
              <span className="text-[10px] uppercase tracking-wider text-[#caa06d]">HDR 60FPS</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#f6efe8] transition-colors p-1 cursor-pointer"
                title={isMuted ? 'Unmute Ambient Sound' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Narrative footer */}
        <p className="text-xs text-[#a89c90] leading-relaxed">
          Documenting the harvest at high-altitude volcanic soils in Ethiopia and Colombia, precision roasting inside atmospheric convection drums, and the sacred morning cupping ritual.
        </p>
      </div>
    </div>
  );
};
