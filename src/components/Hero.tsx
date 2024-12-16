import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroContent } from './hero/HeroContent';
import { BenefitsSection } from './hero/BenefitsSection';
import { BackgroundVideo } from './hero/BackgroundVideo';

export function Hero() {
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.5,
    restDelta: 0.0001
  });

  const heroParallax = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const videoScale = useTransform(smoothProgress, [0, 0.3], [1, 1.05]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  return (
    <>
      <motion.section 
        className="relative min-h-screen flex flex-col items-center justify-center pt-12 overflow-hidden"
        style={{ y: heroParallax }}
      >
        <BackgroundVideo scale={videoScale} opacity={videoOpacity} />
        <HeroContent />
      </motion.section>

      <BenefitsSection scrollProgress={smoothProgress} />

      <footer className="relative z-10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center">
          <p className="text-white/60 text-sm">
            © AIConsultant.in 2024 - All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}