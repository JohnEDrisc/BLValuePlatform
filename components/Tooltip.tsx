
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface TooltipProps {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <div className="inline-flex items-center gap-3 mt-6 text-sm text-gray-300 bg-zinc-900 border border-zinc-800 py-3 px-6 rounded-lg shadow-xl max-w-xl mx-auto animate-fade-in">
      <div className="p-1.5 bg-blackline-yellow rounded-full text-black">
        <Lightbulb size={16} />
      </div>
      <span className="font-medium text-left">
        {text}
      </span>
    </div>
  );
};
