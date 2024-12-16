import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface AddGoalFormProps {
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export function AddGoalForm({ onSubmit, onCancel }: AddGoalFormProps) {
  const [newGoal, setNewGoal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      onSubmit(newGoal.trim());
      setNewGoal('');
      // Refocus input after submission
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-2">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new goal..."
          className="flex-1 bg-white/5 px-4 py-2 rounded-lg text-white placeholder-white/40 
            focus:outline-none focus:ring-1 focus:ring-white/20 border border-white/10
            hover:border-white/20 transition-colors"
        />
        <button
          type="button"
          onClick={onCancel}
          className="bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-lg w-10 h-10
            flex items-center justify-center transition-all duration-300
            hover:scale-105 active:scale-95 flex-shrink-0 border border-white/10
            hover:border-white/20"
        >
          <X className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!newGoal.trim()}
          className="bg-white/10 hover:bg-white/20 text-white rounded-lg w-10 h-10
            flex items-center justify-center transition-all duration-300
            hover:scale-105 active:scale-95 flex-shrink-0 border border-white/10
            hover:border-white/20 disabled:opacity-50 disabled:hover:scale-100
            disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}