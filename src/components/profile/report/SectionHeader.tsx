import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="sticky top-0 z-10 -mx-6 px-6 py-4 bg-black/80 backdrop-blur-lg">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-white/70 mt-1">{description}</p>
    </div>
  );
}