import { GameLobby } from '@globalTypes/game';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSocket } from '../socket';

type sseHandlers = {
  onMessage: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
};

const useSSE = (url: string, { onMessage, onError }: sseHandlers) => {
  const navigate = useNavigate();
  const checkLobby = (lobby: GameLobby) => {
    if (lobby.state === 'MATCH_FOUND') navigate(`/game/${lobby.game_id}`);
  };
  useEffect(() => {
    gameSocket.on('lobby', checkLobby);
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
      gameSocket.off('lobby', checkLobby);
    };
  }, []);
};

export default useSSE;
