import React from 'react';
import { CreditCard } from 'lucide-react';

export function PricingSection() {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl
      border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <CreditCard className="w-5 h-5 text-white/70" />
        <h3 className="text-sm font-medium text-white">Pricing</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white/70 text-sm">Free Trial</span>
          <span className="text-white font-medium">Active</span>
        </div>
        <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 
          text-white text-sm font-medium rounded-lg transition-colors">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}