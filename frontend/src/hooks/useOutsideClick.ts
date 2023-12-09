import { useEffect, useRef } from 'react';

type callbackFunc = (event: MouseEvent | TouchEvent) => void;

const useOutsideClick = <T extends HTMLElement>(callback: callbackFunc) => {
  const ref = useRef<T>(null);

  function handleEvent(event: MouseEvent | TouchEvent) {
    if (ref && ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  }

  useEffect(() => {
    if (window.PointerEvent) {
      document.addEventListener('pointerdown', handleEvent);
    } else {
      document.addEventListener('mousedown', handleEvent);
      document.addEventListener('touchstart', handleEvent);
    }

    return () => {
      if (window.PointerEvent) {
        document.removeEventListener('pointerdown', handleEvent);
      } else {
        document.removeEventListener('mousedown', handleEvent);
        document.removeEventListener('touchstart', handleEvent);
      }
    };
  }, []);

  return ref;
};

export default useOutsideClick;
