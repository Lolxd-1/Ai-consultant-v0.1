import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarSectionProps {
  id: string;
  name: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function SidebarSection({ id, name, icon: Icon, isActive, onClick }: SidebarSectionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-white/10 text-white' 
          : 'text-white/60 hover:text-white hover:bg-white/5'}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </button>
  );
}