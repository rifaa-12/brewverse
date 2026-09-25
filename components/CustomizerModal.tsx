import React, { useState } from 'react';
import { Product } from '../types';
import { X, Check, Thermometer, Sparkles } from 'lucide-react';

interface CustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmAdd: (customizedItem: {
    product: Product;
    temp: string;
    milk: string;
    sweetness: string;
    shots: string;
    calculatedPrice: number;
  }) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirmAdd,
}) => {
  const [temp, setTemp] = useState('Hot (68°C Velvet)');
  const [milk, setMilk] = useState('Artisanal Oat');
  const [sweetness, setSweetness] = useState('Standard Demerara');
  const [shots, setShots] = useState('Double Shot');

  if (!isOpen || !product) return null;

  const extraShotCost = shots === 'Triple Extraction (+ $1.00)' ? 1.0 : 0;
  const calculatedPrice = product.price + extraShotCost;

  const handleConfirm = () => {
    onConfirmAdd({
      product,
      temp,
      milk,
      sweetness,
      shots,
      calculatedPrice,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0c0908]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-[#14100e] border border-[#d99b61]/25 shadow-2xl p-6 relative text-[#f6efe8]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <span className="text-[10px] text-[#d99b61] uppercase tracking-widest font-bold block">
              Atelier Customizer
            </span>
            <h3 className="font-serif text-xl text-[#f6efe8]">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#a89c90] hover:text-[#f6efe8] p-1.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="py-4 space-y-4">
          {/* Temperature */}
          <div>
            <label className="text-[11px] text-[#a89c90] uppercase block mb-1.5 font-semibold flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-[#d99b61]" />
              <span>Temperature Profile</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Hot (68°C Velvet)', 'Iced on Spheres'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTemp(option)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    temp === option
                      ? 'bg-[#d99b61] text-[#0c0908] font-bold shadow-md shadow-[#d99b61]/20'
                      : 'bg-[#1e1815] text-[#a89c90] hover:text-[#f6efe8] border border-stone-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Milk / Cloud formulation */}
          <div>
            <label className="text-[11px] text-[#a89c90] uppercase block mb-1.5 font-semibold">
              Milk &amp; Cloud Formulation
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Artisanal Oat', 'Organic Dairy', 'Pure (Black)'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMilk(option)}
                  className={`px-2 py-2 rounded-lg text-[11px] transition-all text-center cursor-pointer ${
                    milk === option
                      ? 'bg-[#d99b61] text-[#0c0908] font-bold shadow-md shadow-[#d99b61]/20'
                      : 'bg-[#1e1815] text-[#a89c90] hover:text-[#f6efe8] border border-stone-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness */}
          <div>
            <label className="text-[11px] text-[#a89c90] uppercase block mb-1.5 font-semibold">
              Sweetness &amp; Infusion
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Standard Demerara', 'Subtle Touch (50%)', 'Zero Sweetness'].map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSweetness(option)}
                    className={`px-2 py-2 rounded-lg text-[11px] transition-all text-center cursor-pointer ${
                      sweetness === option
                        ? 'bg-[#d99b61] text-[#0c0908] font-bold shadow-md shadow-[#d99b61]/20'
                        : 'bg-[#1e1815] text-[#a89c90] hover:text-[#f6efe8] border border-stone-800'
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Espresso Extraction Shots */}
          <div>
            <label className="text-[11px] text-[#a89c90] uppercase block mb-1.5 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#caa06d]" />
              <span>Extraction Dose</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Double Shot', 'Single Shot', 'Triple Extraction (+ $1.00)'].map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setShots(option)}
                    className={`px-2 py-2 rounded-lg text-[11px] transition-all text-center cursor-pointer ${
                      shots === option
                        ? 'bg-[#d99b61] text-[#0c0908] font-bold shadow-md shadow-[#d99b61]/20'
                        : 'bg-[#1e1815] text-[#a89c90] hover:text-[#f6efe8] border border-stone-800'
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#a89c90] uppercase font-mono block">
              Calculated Total
            </span>
            <span className="font-serif text-xl text-[#caa06d] font-bold tabular-nums">
              ${calculatedPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d99b61] to-[#caa06d] text-[#0c0908] text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-95 flex items-center gap-2 shadow-lg cursor-pointer"
            type="button"
          >
            <span>Add Custom Ritual</span>
            <Check className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
