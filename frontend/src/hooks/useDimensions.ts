import { useRef, useState, useLayoutEffect, useEffect } from 'react';

const useDimensions = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getDimensions = (node: T) => {
    const boundingRect = node.getBoundingClientRect();
    return { width: boundingRect.width, height: boundingRect.height };
  };

  useLayoutEffect(() => {
    if (ref.current) setDimensions(getDimensions(ref.current));
  }, []);

  useEffect(() => {
    const handleChange = () => {
      if (ref.current) setDimensions(getDimensions(ref.current));
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === ref.current) handleChange();
      }
    });

    resizeObserver.observe(ref.current as HTMLElement);
    window.addEventListener('resize', handleChange);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return { ref, dimensions };
};

export default useDimensions;