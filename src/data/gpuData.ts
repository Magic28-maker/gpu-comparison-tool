
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

export const gpus: GPU[] = [
  {
    id: "rtx4090",
    name: "GeForce RTX 4090",
    manufacturer: "NVIDIA",
    releaseYear: 2022,
    memoryGB: 24,
    memoryClock: 21000,
    memoryType: "GDDR6X",
    clockSpeed: 2235,
    boostClock: 2520,
    cores: 16384,
    tdp: 450,
    price: 1599,
    benchmarkScore: 100,
    rayTracingSupport: true,
    dLSSSupport: true,
    architecture: "Ada Lovelace",
    processNode: 4,
    imageUrl: "https://images.unsplash.com/photo-1679931974862-64d8359c7308?q=80&w=400"
  },
  {
    id: "rtx4080",
    name: "GeForce RTX 4080",
    manufacturer: "NVIDIA",
    releaseYear: 2022,
    memoryGB: 16,
    memoryClock: 22400,
    memoryType: "GDDR6X",
    clockSpeed: 2205,
    boostClock: 2505,
    cores: 9728,
    tdp: 320,
    price: 1199,
    benchmarkScore: 88,
    rayTracingSupport: true,
    dLSSSupport: true,
    architecture: "Ada Lovelace",
    processNode: 4,
    imageUrl: "https://images.unsplash.com/photo-1678300577512-a5cbe4718e59?q=80&w=400"
  },
  {
    id: "rtx3090",
    name: "GeForce RTX 3090",
    manufacturer: "NVIDIA",
    releaseYear: 2020,
    memoryGB: 24,
    memoryClock: 19500,
    memoryType: "GDDR6X",
    clockSpeed: 1395,
    boostClock: 1695,
    cores: 10496,
    tdp: 350,
    price: 1499,
    benchmarkScore: 80,
    rayTracingSupport: true,
    dLSSSupport: true,
    architecture: "Ampere",
    processNode: 8,
    imageUrl: "https://images.unsplash.com/photo-1627546966066-c75d5bdfc947?q=80&w=400"
  },
  {
    id: "rx7900xtx",
    name: "Radeon RX 7900 XTX",
    manufacturer: "AMD",
    releaseYear: 2022,
    memoryGB: 24,
    memoryClock: 20000,
    memoryType: "GDDR6",
    clockSpeed: 1855,
    boostClock: 2300,
    cores: 12288,
    tdp: 355,
    price: 999,
    benchmarkScore: 90,
    rayTracingSupport: true,
    dLSSSupport: false,
    architecture: "RDNA 3",
    processNode: 5,
    imageUrl: "https://images.unsplash.com/photo-1661254875912-3d9e250c00ed?q=80&w=400"
  },
  {
    id: "rx6900xt",
    name: "Radeon RX 6900 XT",
    manufacturer: "AMD",
    releaseYear: 2020,
    memoryGB: 16,
    memoryClock: 16000,
    memoryType: "GDDR6",
    clockSpeed: 1825,
    boostClock: 2250,
    cores: 5120,
    tdp: 300,
    price: 999,
    benchmarkScore: 76,
    rayTracingSupport: true,
    dLSSSupport: false,
    architecture: "RDNA 2",
    processNode: 7,
    imageUrl: "https://images.unsplash.com/photo-1662637957522-617d194b9f0e?q=80&w=400"
  },
  {
    id: "arc770",
    name: "Intel Arc A770",
    manufacturer: "Intel",
    releaseYear: 2022,
    memoryGB: 16,
    memoryClock: 17500,
    memoryType: "GDDR6",
    clockSpeed: 2100,
    boostClock: 2400,
    cores: 4096,
    tdp: 225,
    price: 349,
    benchmarkScore: 58,
    rayTracingSupport: true,
    dLSSSupport: false,
    architecture: "Alchemist",
    processNode: 6,
    imageUrl: "https://images.unsplash.com/photo-1676907257642-9c458acf76c7?q=80&w=400"
  }
];

export const getGpuById = (id: string): GPU | undefined => {
  return gpus.find(gpu => gpu.id === id);
};

export const getSpecValue = (gpu: GPU, spec: keyof GPU): number | boolean | string => {
  return gpu[spec];
};

export const getSpecPercentage = (value: number, max: number): number => {
  return (value / max) * 100;
};
