
import React from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps) => {
  return (
    <section className={cn("w-full py-24 px-6 relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background z-0"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-slide-up">
        <div className="inline-flex items-center justify-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
          GPU Comparison Tool
        </div>
        
        <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
          Compare GPUs with
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 px-2">precision</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          A simple, elegant tool to compare graphics cards side by side.
          Make informed decisions with accurate specifications and performance metrics.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="w-full sm:w-auto">
            <a 
              href="#comparison" 
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-base font-medium shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full"
            >
              Start Comparing
            </a>
          </div>
          <div className="w-full sm:w-auto">
            <a 
              href="#gpus" 
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-secondary/80 px-6 py-3 text-base font-medium shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full"
            >
              Browse GPUs
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
