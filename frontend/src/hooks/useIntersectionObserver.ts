import { useRef, useCallback } from 'react';

const useIntersectionObserver = (callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const elementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return elementRef;
};

export default useIntersectionObserver;
