import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin } from 'lucide-react';

export function HeroContent() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black pointer-events-none" />

      {/* Main content */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 z-50">
          <a href="#contact" className="px-6 py-2 rounded-full bg-[#4A9DFF]/20 text-white hover:bg-[#4A9DFF]/30 transition-colors">
            Contact Us
          </a>
          <div className="flex items-center gap-4">
            <a href="/signin" className="text-white hover:text-white/80 transition-colors">Sign in</a>
            <a href="/signup" className="px-6 py-2 rounded-full bg-[#4A9DFF]/20 text-white hover:bg-[#4A9DFF]/30 transition-colors">
              Sign up
            </a>
          </div>
        </nav>

        {/* Main heading */}
        <h1 className="text-[8.5rem] font-bold text-white leading-none tracking-tight mb-6">
          AI Consultant
        </h1>

        {/* Subheading */}
        <h2 className="text-4xl text-white/90 font-medium leading-tight mb-32">
          Your end-to-end personal<br />
          business <span className="text-[#FF4545]">ai</span> consultant
        </h2>

        {/* CTA Section */}
        <div className="space-y-8">
          <p className="text-4xl text-white font-medium">
            Ready to Improve your business in{' '}
            <span className="text-[#4A9DFF]">20 mins</span> ?
          </p>

          <motion.a 
            href="/select"
            className="inline-block px-12 py-4 text-xl font-medium text-black bg-white rounded-full
              hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's Dive in
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="fixed bottom-8 right-8 flex items-center gap-4">
          <a 
            href="https://twitter.com/aiconsultant" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a 
            href="https://linkedin.com/company/aiconsultant" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}