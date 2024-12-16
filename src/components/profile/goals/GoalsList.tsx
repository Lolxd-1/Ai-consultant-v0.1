import React from 'react';
import { GoalItem } from './GoalItem';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

interface GoalsListProps {
  goals: Goal[];
  onToggleGoal: (id: string) => void;
  onRemoveGoal: (id: string) => void;
}

export function GoalsList({ goals, onToggleGoal, onRemoveGoal }: GoalsListProps) {
  return (
    <div className="flex-1 overflow-y-auto min-h-0 space-y-2
      scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
      hover:scrollbar-thumb-white/20 pr-2">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          id={goal.id}
          text={goal.text}
          completed={goal.completed}
          onToggle={onToggleGoal}
          onRemove={onRemoveGoal}
        />
      ))}
    </div>
  );
}