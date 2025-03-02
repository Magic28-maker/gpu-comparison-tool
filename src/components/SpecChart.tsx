
import React, { useEffect, useRef, useState } from 'react';
import { GPU } from '@/data/gpuData';
import { cn } from '@/lib/utils';

interface SpecChartProps {
  gpuLeft: GPU | null;
  gpuRight: GPU | null;
  specKey: keyof GPU;
  specName: string;
  unit?: string;
  higherIsBetter?: boolean;
  className?: string;
}

const SpecChart = ({ 
  gpuLeft, 
  gpuRight, 
  specKey, 
  specName, 
  unit = '', 
  higherIsBetter = true,
  className 
}: SpecChartProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(chartRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  if (!gpuLeft && !gpuRight) return null;

  // Check if the spec is a number
  const leftValue = typeof gpuLeft?.[specKey] === 'number' ? gpuLeft?.[specKey] as number : 0;
  const rightValue = typeof gpuRight?.[specKey] === 'number' ? gpuRight?.[specKey] as number : 0;
  
  // Find the maximum value between the two GPUs
  const maxValue = Math.max(leftValue || 0, rightValue || 0);
  
  // Calculate percentages
  const leftPercentage = maxValue ? ((leftValue || 0) / maxValue) * 100 : 0;
  const rightPercentage = maxValue ? ((rightValue || 0) / maxValue) * 100 : 0;
  
  // Determine which value is better (higher or lower depending on higherIsBetter)
  const leftIsBetter = higherIsBetter 
    ? leftValue > rightValue 
    : leftValue < rightValue;
  const rightIsBetter = higherIsBetter 
    ? rightValue > leftValue 
    : rightValue < leftValue;
  
  // Special case for boolean values
  const isBooleanSpec = typeof gpuLeft?.[specKey] === 'boolean';
  
  return (
    <div ref={chartRef} className={cn("mb-8", className)}>
      <h3 className="text-sm font-medium mb-2">{specName}</h3>
      
      {isBooleanSpec ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className={cn(
              "p-3 rounded-lg", 
              gpuLeft?.[specKey] 
                ? "bg-emerald-100 text-emerald-700" 
                : "bg-red-100 text-red-700"
            )}>
              {gpuLeft?.[specKey] ? 'Supported' : 'Not Supported'}
            </div>
          </div>
          <div className="text-center">
            <div className={cn(
              "p-3 rounded-lg", 
              gpuRight?.[specKey] 
                ? "bg-emerald-100 text-emerald-700" 
                : "bg-red-100 text-red-700"
            )}>
              {gpuRight?.[specKey] ? 'Supported' : 'Not Supported'}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {/* Left GPU Bar */}
          <div className="space-y-2">
            <div className="relative h-8 bg-secondary rounded-lg overflow-hidden">
              <div 
                className={cn(
                  "absolute right-0 top-0 h-full transition-all duration-1000 ease-out flex items-center justify-end pr-2",
                  leftIsBetter ? "bg-blue-500" : "bg-blue-400"
                )}
                style={{ 
                  width: isVisible ? `${leftPercentage}%` : '0%',
                }}
              >
                {leftPercentage > 30 && (
                  <span className="text-white text-sm font-medium">
                    {leftValue}{unit}
                  </span>
                )}
              </div>
              {leftPercentage <= 30 && (
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-foreground text-sm font-medium">
                  {leftValue}{unit}
                </span>
              )}
            </div>
            <div className="text-center text-sm font-medium">
              {gpuLeft?.name || 'Select GPU'}
            </div>
          </div>
          
          {/* Right GPU Bar */}
          <div className="space-y-2">
            <div className="relative h-8 bg-secondary rounded-lg overflow-hidden">
              <div 
                className={cn(
                  "absolute left-0 top-0 h-full transition-all duration-1000 ease-out flex items-center pl-2",
                  rightIsBetter ? "bg-blue-500" : "bg-blue-400"
                )}
                style={{ 
                  width: isVisible ? `${rightPercentage}%` : '0%',
                }}
              >
                {rightPercentage > 30 && (
                  <span className="text-white text-sm font-medium">
                    {rightValue}{unit}
                  </span>
                )}
              </div>
              {rightPercentage <= 30 && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-foreground text-sm font-medium">
                  {rightValue}{unit}
                </span>
              )}
            </div>
            <div className="text-center text-sm font-medium">
              {gpuRight?.name || 'Select GPU'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecChart;
