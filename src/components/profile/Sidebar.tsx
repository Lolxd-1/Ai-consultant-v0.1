import React from 'react';
import { Newspaper, FileText, PlayCircle, Upload } from 'lucide-react';
import { ExpertsSection } from './sidebar/ExpertsSection';
import { SidebarSection } from './sidebar/SidebarSection';
import { PricingSection } from './sidebar/PricingSection';

interface SidebarProps {
  activeProfile: string;
  onSelect: (profile: string) => void;
}

export function Sidebar({ activeProfile, onSelect }: SidebarProps) {
  const sections = [
    { id: 'news', name: 'News', icon: Newspaper },
    { id: 'report', name: 'Report', icon: FileText },
    { id: 'simulation', name: 'Simulation', icon: PlayCircle },
    { id: 'upload', name: 'Upload', icon: Upload }
  ];

  return (
    <div className="w-64 flex-shrink-0 flex flex-col h-full">
      <a href="/" className="text-xl font-semibold text-white mb-6 hover:text-white/90 transition-colors">
        AI Consultant
      </a>
      
      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin 
        scrollbar-thumb-white/10 scrollbar-track-transparent
        hover:scrollbar-thumb-white/20">
        <ExpertsSection 
          activeProfile={activeProfile}
          onSelect={onSelect}
        />

        {sections.map(section => (
          <SidebarSection
            key={section.id}
            {...section}
            isActive={activeProfile === section.id}
            onClick={() => onSelect(section.id)}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <PricingSection />
      </div>
    </div>
  );
}