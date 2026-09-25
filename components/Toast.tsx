import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  toast: { title: string; desc: string } | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  return (
    <div
      className={`fixed bottom-6 left-6 z-50 p-4 rounded-xl bg-[#14100e]/95 border border-[#d99b61]/35 shadow-2xl flex items-center gap-3.5 transition-all duration-300 backdrop-blur-md ${
        toast ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#d99b61] text-[#0c0908] flex items-center justify-center font-bold shrink-0 shadow-md">
        <Check className="w-4 h-4 stroke-[3]" />
      </div>
      <div>
        <div className="text-xs font-bold text-[#f6efe8] font-sans">
          {toast?.title || 'Notification'}
        </div>
        <div className="text-[11px] text-[#a89c90]">
          {toast?.desc || ''}
        </div>
      </div>
    </div>
  );
};
