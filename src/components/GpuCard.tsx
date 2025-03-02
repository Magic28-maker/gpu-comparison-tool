
import React, { useState } from 'react';
import { GPU } from '@/data/gpuData';
import { cn } from '@/lib/utils';
import { slideUp } from '@/lib/animations';

interface GpuCardProps {
  gpu: GPU;
  isSelected?: boolean;
  onSelect?: (gpu: GPU) => void;
  index?: number;
  className?: string;
}

const GpuCard = ({ 
  gpu, 
  isSelected = false, 
  onSelect, 
  index = 0, 
  className 
}: GpuCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleSelect = () => {
    if (onSelect) {
      onSelect(gpu);
    }
  };

  return (
    <div 
      className={cn(
        "group relative rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 flex flex-col",
        isSelected ? "ring-2 ring-primary shadow-lg scale-[1.02]" : "hover:shadow-md hover:scale-[1.01]",
        slideUp,
        className
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={handleSelect}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {/* Placeholder while image loads */}
        <div className={cn(
          "absolute inset-0 bg-muted transition-opacity duration-500 flex items-center justify-center",
          isLoaded ? "opacity-0" : "opacity-100"
        )}>
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
        
        <img 
          src={gpu.imageUrl} 
          alt={gpu.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
        
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-secondary/80 backdrop-blur-sm px-3 py-0.5 text-sm font-medium text-secondary-foreground">
            {gpu.manufacturer}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-5">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{gpu.name}</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Memory</span>
            <span className="font-medium">{gpu.memoryGB} GB {gpu.memoryType}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Boost Clock</span>
            <span className="font-medium">{gpu.boostClock} MHz</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">TDP</span>
            <span className="font-medium">{gpu.tdp} W</span>
          </div>
          
          <div className="pt-2">
            <div className="spec-bar">
              <div 
                className="spec-bar-fill" 
                style={{ width: `${gpu.benchmarkScore}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">Performance</span>
              <span className="text-xs font-medium">{gpu.benchmarkScore}/100</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5 pt-0 flex items-center justify-between border-t border-border mt-4">
        <span className="text-2xl font-bold">${gpu.price}</span>
        <button 
          onClick={handleSelect}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            isSelected 
              ? "bg-primary/20 text-primary" 
              : "bg-secondary hover:bg-secondary/70 text-secondary-foreground"
          )}
        >
          {isSelected ? 'Selected' : 'Compare'}
        </button>
      </div>
    </div>
  );
};

export default GpuCard;
