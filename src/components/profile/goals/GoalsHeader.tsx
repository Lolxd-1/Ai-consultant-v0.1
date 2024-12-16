import React from 'react';
import { Plus } from 'lucide-react';

interface GoalsHeaderProps {
  onAddClick: () => void;
  isAdding: boolean;
}

export function GoalsHeader({ onAddClick, isAdding }: GoalsHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <h2 className="text-xl font-medium text-white">Goals</h2>
      {!isAdding && (
        <button
          onClick={onAddClick}
          className="bg-white/10 hover:bg-white/20 text-white rounded-lg w-8 h-8
            flex items-center justify-center transition-all duration-300
            hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}