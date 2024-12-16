import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BenefitProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

interface BenefitCardProps {
  benefit: BenefitProps;
  index: number;
}

export function BenefitCard({ benefit, index }: BenefitCardProps) {
  const { icon: Icon, title, description, gradient, iconColor } = benefit;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: 0.1 + index * 0.08,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <div className={`absolute inset-0 ${gradient} rounded-3xl 
        blur-2xl opacity-60 transition-transform duration-300 
        group-hover:scale-105 group-hover:opacity-80`} 
      />
      <motion.div 
        className="relative h-full bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 
          border border-white/10 transition-all duration-200
          hover:bg-white/[0.06] hover:border-white/20"
        whileHover={{ 
          y: -4,
          transition: { duration: 0.15 }
        }}
      >
        <Icon className={`w-12 h-12 ${iconColor} mb-6`} />
        <h3 className="text-2xl font-semibold text-white mb-4">
          {title}
        </h3>
        <p className="text-white/70 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}