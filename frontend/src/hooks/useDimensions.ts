import { useRef, useState, useLayoutEffect, useEffect } from 'react';

const useDimensions = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getDimensions = (node: T) => {
    const { width, height } = node.getBoundingClientRect();
    return { width, height };
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setDimensions(getDimensions(ref.current));
      console.log(
        'width: ',
        dimensions.width,
        ' | height: ',
        dimensions.height,
      );
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      if (ref.current) setDimensions(getDimensions(ref.current));
    };

    window.addEventListener('resize', handleChange);

    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return { ref, dimensions };
};

export default useDimensions;
