
import React, { useState, useEffect, useRef } from 'react';
import { gpus, GPU } from '@/data/gpuData';
import HeroSection from '@/components/HeroSection';
import GpuCard from '@/components/GpuCard';
import ComparisonView from '@/components/ComparisonView';
import { cn } from '@/lib/utils';

const Index = () => {
  const [leftGpu, setLeftGpu] = useState<GPU | null>(null);
  const [rightGpu, setRightGpu] = useState<GPU | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGpus, setFilteredGpus] = useState(gpus);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const gpusRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Filter GPUs based on search term
    const filtered = gpus.filter(gpu => 
      gpu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gpu.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGpus(filtered);
  }, [searchTerm]);

  const handleSelectGpu = (gpu: GPU) => {
    if (!leftGpu) {
      setLeftGpu(gpu);
    } else if (!rightGpu && leftGpu.id !== gpu.id) {
      setRightGpu(gpu);
      // Scroll to comparison section after a short delay
      setTimeout(() => {
        comparisonRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else if (leftGpu.id === gpu.id) {
      setLeftGpu(null);
    } else if (rightGpu?.id === gpu.id) {
      setRightGpu(null);
    }
  };

  const resetComparison = () => {
    setLeftGpu(null);
    setRightGpu(null);
  };

  const scrollToGpus = () => {
    gpusRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                <path d="M2 12h2M2 12a10 10 0 0 1 10-10C19 2 22 5 22 12s-3 10-10 10a10 10 0 0 1-10-10Z" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <span className="text-lg font-medium">GPU Compare</span>
          </div>
          
          <nav className="flex items-center space-x-4">
            <a 
              href="#comparison" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                comparisonRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Compare
            </a>
            <a 
              href="#gpus" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToGpus();
              }}
            >
              GPUs
            </a>
            <button 
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={resetComparison}
            >
              Reset
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-16" ref={comparisonRef} id="comparison">
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-3xl font-display font-bold text-center mb-6">GPU Comparison</h2>
            <p className="text-center text-muted-foreground max-w-2xl mb-8">
              Compare two graphics cards side by side to see which one best suits your needs.
            </p>
            
            <ComparisonView 
              gpuLeft={leftGpu} 
              gpuRight={rightGpu} 
              className="w-full max-w-5xl"
            />
          </div>
          
          <div ref={gpusRef} id="gpus" className="pt-8">
            <div className="flex flex-col items-center justify-center mb-10">
              <h2 className="text-3xl font-display font-bold text-center mb-6">Graphics Cards</h2>
              <p className="text-center text-muted-foreground max-w-2xl mb-8">
                Select two GPUs from the list below to compare their specifications.
              </p>
              
              <div className="w-full max-w-md mb-10">
                <div className="relative">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search GPUs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGpus.map((gpu, index) => (
                <GpuCard
                  key={gpu.id}
                  gpu={gpu}
                  isSelected={leftGpu?.id === gpu.id || rightGpu?.id === gpu.id}
                  onSelect={handleSelectGpu}
                  index={index}
                />
              ))}
              {filteredGpus.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No GPUs found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full border-t border-border py-6 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                  <path d="M2 12h2M2 12a10 10 0 0 1 10-10C19 2 22 5 22 12s-3 10-10 10a10 10 0 0 1-10-10Z" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <span className="text-sm font-medium">GPU Compare</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Created with attention to detail and pixel-perfect precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
