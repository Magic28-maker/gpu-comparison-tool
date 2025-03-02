
import { nvidiaGpus } from './gpus/nvidia';
import { amdGpus } from './gpus/amd';
import { intelGpus } from './gpus/intel';

export interface GPU {
  id: string;
  name: string;
  manufacturer: string;
  releaseYear: number;
  memoryGB: number;
  memoryClock: number; // MHz
  memoryType: string;
  clockSpeed: number; // MHz
  boostClock: number; // MHz
  cores: number;
  tdp: number; // Watts
  price: number; // USD
  benchmarkScore: number; // 1-100 normalized score
  rayTracingSupport: boolean;
  dLSSSupport: boolean;
  architecture: string;
  processNode: number; // nm
  imageUrl: string;
}

// Combine all GPUs into a single array for backward compatibility
export const gpus: GPU[] = [
  ...nvidiaGpus,
  ...amdGpus,
  ...intelGpus
];
