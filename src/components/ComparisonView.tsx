
import React, { useState, useEffect } from 'react';
import { GPU } from '@/data/gpuData';
import SpecChart from './SpecChart';
import { cn } from '@/lib/utils';

interface ComparisonViewProps {
  gpuLeft: GPU | null;
  gpuRight: GPU | null;
  className?: string;
}

const ComparisonView = ({ 
  gpuLeft, 
  gpuRight,
  className 
}: ComparisonViewProps) => {
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (gpuLeft && gpuRight) {
      // Add a small delay to trigger animation
      const timer = setTimeout(() => {
        setShowComparison(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setShowComparison(false);
    }
  }, [gpuLeft, gpuRight]);
  
  if (!gpuLeft && !gpuRight) {
    return (
      <div className={cn("w-full p-10 text-center bg-card rounded-xl border border-border", className)}>
        <h2 className="text-2xl font-display font-semibold mb-4">GPU Comparison</h2>
        <p className="text-muted-foreground">
          Select two GPUs from the list below to compare their specifications.
        </p>
      </div>
    );
  }

  if (!gpuLeft || !gpuRight) {
    return (
      <div className={cn("w-full p-10 text-center bg-card rounded-xl border border-border", className)}>
        <h2 className="text-2xl font-display font-semibold mb-4">GPU Comparison</h2>
        <p className="text-muted-foreground">
          {!gpuLeft ? 'Select the first GPU' : 'Select the second GPU'} to compare.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full bg-card rounded-xl border border-border overflow-hidden transition-all duration-500",
      showComparison ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10",
      className
    )}>
      <div className="grid grid-cols-2 gap-4 bg-secondary/50 p-6">
        <div className="text-center">
          <div className="h-32 w-32 mx-auto relative mb-4">
            <img
              src={gpuLeft.imageUrl}
              alt={gpuLeft.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h2 className="text-xl font-semibold mb-1">{gpuLeft.name}</h2>
          <p className="text-sm text-muted-foreground">{gpuLeft.manufacturer} · {gpuLeft.architecture}</p>
        </div>
        
        <div className="text-center">
          <div className="h-32 w-32 mx-auto relative mb-4">
            <img
              src={gpuRight.imageUrl}
              alt={gpuRight.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h2 className="text-xl font-semibold mb-1">{gpuRight.name}</h2>
          <p className="text-sm text-muted-foreground">{gpuRight.manufacturer} · {gpuRight.architecture}</p>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-lg font-semibold mb-6">Specifications Comparison</h3>
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="benchmarkScore" 
          specName="Overall Performance" 
          unit=" pts"
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="price" 
          specName="Price" 
          unit=" USD"
          higherIsBetter={false}
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="memoryGB" 
          specName="Memory Size" 
          unit=" GB"
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="memoryClock" 
          specName="Memory Clock" 
          unit=" MHz"
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="boostClock" 
          specName="Boost Clock" 
          unit=" MHz"
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="cores" 
          specName="CUDA/Stream Processors" 
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="tdp" 
          specName="Power Consumption (TDP)" 
          unit=" W"
          higherIsBetter={false}
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="processNode" 
          specName="Process Node" 
          unit=" nm"
          higherIsBetter={false}
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="rayTracingSupport" 
          specName="Ray Tracing Support" 
        />
        
        <SpecChart 
          gpuLeft={gpuLeft} 
          gpuRight={gpuRight} 
          specKey="dLSSSupport" 
          specName="DLSS Support" 
        />
      </div>
    </div>
  );
};

export default ComparisonView;
