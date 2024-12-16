import React, { useState } from 'react';
import { 
  LineChart, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Brain,
  FileText,
  Newspaper
} from 'lucide-react';

const profiles = [
  { id: 'finance', name: 'Finance', icon: LineChart },
  { id: 'sales', name: 'Sales', icon: TrendingUp },
  { id: 'hr', name: 'HR', icon: Users },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'strategy', name: 'Strategy', icon: Brain },
  { id: 'report', name: 'Report', icon: FileText },
  { id: 'news', name: 'News', icon: Newspaper }
];

interface ProfileSelectorProps {
  activeProfile: string;
  onSelect: (profile: string) => void;
}

export function ProfileSelector({ activeProfile, onSelect }: ProfileSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative space-y-2 py-2">
      {profiles.map(({ id, name, icon: Icon }, index) => {
        const isHovered = hoveredIndex === index;
        const distance = hoveredIndex === null ? 0 : Math.abs(hoveredIndex - index);
        const scale = isHovered ? 1.2 : 1 - distance * 0.1;
        const opacity = isHovered ? 1 : 1 - distance * 0.15;

        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`w-full p-3 rounded-xl transition-all duration-300 relative
              ${activeProfile === id 
                ? 'bg-white/10 text-white' 
                : 'text-white/60 hover:text-white'
              }`}
            style={{
              transform: `scale(${scale}) translateY(${isHovered ? -4 : 0}px)`,
              opacity,
              zIndex: isHovered ? 10 : 1,
            }}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 transition-transform duration-300 
                ${isHovered ? 'scale-110' : ''}`} 
              />
              <span className={`text-sm font-medium transition-all duration-300
                ${isHovered ? 'translate-x-1' : ''}`}>
                {name}
              </span>
            </div>
            {isHovered && (
              <div className="absolute inset-0 bg-white/5 rounded-xl 
                animate-pulse pointer-events-none" 
              />
            )}
          </button>
        );
      })}
    </div>
  );
}