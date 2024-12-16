import React, { useState } from 'react';
import { GoalsHeader } from './goals/GoalsHeader';
import { AddGoalForm } from './goals/AddGoalForm';
import { GoalsList } from './goals/GoalsList';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

interface GoalsSectionProps {
  goals: Goal[];
  onAddGoal: (text: string) => void;
  onRemoveGoal: (id: string) => void;
  onToggleGoal: (id: string) => void;
}

export function GoalsSection({ goals, onAddGoal, onRemoveGoal, onToggleGoal }: GoalsSectionProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddGoal = (text: string) => {
    onAddGoal(text);
    // Don't close the form after adding a goal to allow for multiple additions
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/5 to-white/[0.02] 
      backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden
      hover:border-white/20 transition-colors shadow-lg shadow-black/20">
      <div className="flex-shrink-0 px-4 pt-4">
        <GoalsHeader 
          onAddClick={() => setIsAdding(true)}
          isAdding={isAdding}
        />
        {isAdding && (
          <AddGoalForm 
            onSubmit={handleAddGoal}
            onCancel={handleCancel}
          />
        )}
      </div>
      <div className="flex-1 px-4 pb-4 pt-2 min-h-0">
        <GoalsList
          goals={goals}
          onToggleGoal={onToggleGoal}
          onRemoveGoal={onRemoveGoal}
        />
      </div>
    </div>
  );
}