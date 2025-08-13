import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '100px',
  enabled = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsIntersecting(false);
      disconnect();
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Reset state when re-enabling
    setIsIntersecting(false);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Find the scrollable container by ID or use window
      const scrollContainer = document.getElementById('scroll-container');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Only trigger if actually intersecting and has reasonable intersection ratio
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              setIsIntersecting(true);
            } else {
              setIsIntersecting(false);
            }
          });
        },
        { 
          threshold, 
          rootMargin,
          root: scrollContainer || null 
        }
      );

      observer.observe(element);
      observerRef.current = observer;
    }, 200);

    return () => {
      clearTimeout(timer);
      disconnect();
    };
  }, [enabled, threshold, rootMargin, disconnect]);

  return { ref, isIntersecting };
}