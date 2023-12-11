import { useEffect } from 'react';

type sseHandlers = {
  onMessage: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
};

const useSSE = (url: string, { onMessage, onError }: sseHandlers) => {
  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSource.onmessage = (event) => {
      onMessage(event);
    };
    if (onError) {
      eventSource.onerror = (event) => {
        onError(event);
      };
    }

    return () => {
      eventSource.close();
    };
  }, []);
};

export default useSSE;
