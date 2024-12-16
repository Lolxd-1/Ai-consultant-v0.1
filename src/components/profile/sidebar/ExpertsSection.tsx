import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, TrendingUp, Briefcase, Brain, LineChart } from 'lucide-react';

const experts = [
  { id: 'hr', name: 'HR', icon: Users },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'sales', name: 'Sales', icon: TrendingUp },
  { id: 'strategy', name: 'Strategy', icon: Brain },
  { id: 'finance', name: 'Finance', icon: LineChart }
];

interface ExpertsSectionProps {
  activeProfile: string;
  onSelect: (profile: string) => void;
}

export function ExpertsSection({ activeProfile, onSelect }: ExpertsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="space-y-3">
      <button
        onClick={toggleExpanded}
        className="w-full p-3 rounded-xl text-white/90 hover:text-white
          hover:bg-white/5 transition-all duration-300 flex items-center justify-between"
      >
        <span className="text-sm font-medium">Experts</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-white/50" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/50" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 space-y-2 flex flex-col items-center overflow-visible">
          {experts.map(({ id, name, icon: Icon }, index) => {
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
                className={`w-[85%] p-3.5 rounded-xl transition-all duration-300 relative
                  ${activeProfile === id 
                    ? 'bg-white/10 text-white shadow-lg shadow-white/5' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                style={{
                  transform: `scale(${scale}) translateY(${isHovered ? -4 : 0}px)`,
                  opacity,
                  zIndex: isHovered ? 10 : 1,
                }}
              >
                <div className="flex items-center justify-center gap-3.5">
                  <Icon className={`w-5 h-5 transition-transform duration-300 flex-shrink-0
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
      )}
    </div>
  );
}