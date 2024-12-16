import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface BackgroundVideoProps {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}

export function BackgroundVideo({ scale, opacity }: BackgroundVideoProps) {
  return (
    <motion.div className="absolute inset-0 bg-black">
      <motion.video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="object-cover w-full h-full opacity-40"
        style={{ scale, opacity }}
      >
        <source 
          src="https://www.apple.com/105/media/us/mac-pro/2019/466faaf3-8832-4c34-8178-59c4f1af8e5e/anim/hero/large.mp4" 
          type="video/mp4" 
        />
      </motion.video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />
    </motion.div>
  );
}