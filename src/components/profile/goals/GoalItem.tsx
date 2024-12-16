import React from 'react';
import { Check, X } from 'lucide-react';

interface GoalItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function GoalItem({ id, text, completed, onToggle, onRemove }: GoalItemProps) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg
      hover:bg-white/5 transition-all duration-300">
      <button
        onClick={() => onToggle(id)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
          transition-all duration-300 flex-shrink-0
          ${completed 
            ? 'bg-blue-500 border-blue-500' 
            : 'border-white/30 hover:border-white/50'}`}
      >
        {completed && <Check className="w-3 h-3 text-white" />}
      </button>
      <span
        className={`flex-1 text-white/90 transition-all duration-300 break-words
          ${completed ? 'line-through opacity-50' : ''}`}
      >
        {text}
      </span>
      <button
        onClick={() => onRemove(id)}
        className="opacity-0 group-hover:opacity-100 text-white/50 hover:text-white
          transition-all duration-300 hover:scale-110 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}