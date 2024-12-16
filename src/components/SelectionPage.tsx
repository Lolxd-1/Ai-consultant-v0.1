import React from 'react';
import { ArrowRight, Sparkles, ClipboardList } from 'lucide-react';

export function SelectionPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="object-cover w-full h-full opacity-40"
        >
          <source 
            src="https://www.apple.com/105/media/us/mac-pro/2019/466faaf3-8832-4c34-8178-59c4f1af8e5e/anim/hero/large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 lg:px-8 pt-32">
        <h1 className="text-4xl md:text-5xl font-semibold text-white text-center mb-4">
          Choose Your Analysis Path
        </h1>
        <p className="text-lg text-white/70 text-center mb-16 max-w-2xl mx-auto">
          Select the depth of analysis that best suits your business needs
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Quick Analysis Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl 
              blur-xl transition-all duration-500 group-hover:scale-105" />
            <div className="relative h-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10
              transition-all duration-500 hover:border-white/20
              hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)]">
              <div className="flex justify-between items-start mb-8">
                <Sparkles className="w-10 h-10 text-blue-400" />
                <span className="text-white/40 text-sm">5 min</span>
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Quick Analysis
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Analyze your business and receive generic solutions to common challenges
              </p>
              <a 
                href="/quick-analysis"
                className="inline-flex items-center text-white hover:text-blue-400 transition-colors"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>

          {/* Detailed Solution Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-3xl 
              blur-xl transition-all duration-500 group-hover:scale-105" />
            <div className="relative h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl 
              rounded-3xl p-8 border border-blue-500/30
              transition-all duration-500 hover:border-blue-400/50
              hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)]
              scale-105 -translate-y-2">
              <div className="absolute -top-3 -right-2">
                <div className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full">
                  Recommended
                </div>
              </div>
              <div className="flex justify-between items-start mb-8">
                <ClipboardList className="w-10 h-10 text-blue-400" />
                <span className="text-white/40 text-sm">15-20 min</span>
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Detailed Solution
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Get a comprehensive analysis with tailored solutions specific to your business
              </p>
              <a 
                href="/questionnaire"
                className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 
                  text-white rounded-full transition-all duration-300 group-hover:scale-105"
              >
                Start Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}