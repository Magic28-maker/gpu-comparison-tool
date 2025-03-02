
import { cn } from './utils';

// Animation class utilities
export const fadeIn = "animate-fade-in";
export const fadeOut = "animate-fade-out";
export const slideUp = "animate-slide-up";
export const slideDown = "animate-slide-down";

// Animation delay utilities
export const getAnimationDelay = (index: number, baseDelay: number = 50): string => {
  return `${index * baseDelay}ms`;
};

// Animation class with delay
export const getAnimationClass = (
  animation: string, 
  index: number, 
  baseDelay: number = 50,
  additionalClasses: string = ""
): string => {
  return cn(
    animation,
    additionalClasses,
    "opacity-0"
  );
};

// Intersection Observer hook for animations
export const observeElement = (
  element: HTMLElement | null,
  onIntersect: () => void,
  threshold: number = 0.1
): IntersectionObserver | null => {
  if (!element) return null;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect();
          observer.unobserve(element);
        }
      });
    },
    { threshold }
  );
  
  observer.observe(element);
  return observer;
};
