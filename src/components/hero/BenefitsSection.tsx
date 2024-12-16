import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { IndianRupee, Target, TrendingUp } from 'lucide-react';
import { BenefitCard } from './BenefitCard';

interface BenefitsSectionProps {
  scrollProgress: MotionValue<number>;
}

export function BenefitsSection({ scrollProgress }: BenefitsSectionProps) {
  const benefitsParallax = useTransform(scrollProgress, [0.1, 0.5], [0, -30]);
  const benefitsScale = useTransform(scrollProgress, [0.1, 0.25], [0.95, 1]);
  const benefitsOpacity = useTransform(scrollProgress, [0.1, 0.25], [0.8, 1]);

  const benefits = [
    {
      icon: IndianRupee,
      title: "Save Money",
      description: "Don't waste your hard earned money on Expensive consultants",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    },
    {
      icon: Target,
      title: "Get Personalized Guidance",
      description: "Receive tailored business advice from advanced AI",
      gradient: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: TrendingUp,
      title: "Boost Revenue",
      description: "Increase your business earnings by up to 30% with AI-driven insights",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    }
  ];

  return (
    <motion.section 
      className="relative z-10 pb-32 px-4"
      style={{ 
        y: benefitsParallax,
        scale: benefitsScale,
        opacity: benefitsOpacity
      }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <BenefitCard 
            key={index}
            benefit={benefit}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}