import { GameData } from '@globalTypes/game';
import { GAME_MODES } from '@globalTypes/gameModes';
import { UserType } from '@globalTypes/user';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

type Spectator = {
  id: string;
  display_name: string;
  avatar: string;
};

export const useGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<GameData>({} as GameData);
  const [me, setMe] = useState<UserType>({} as UserType);
  const [spectators, setSpectators] = useState<Spectator[]>([]);
  const [dot, setDot] = useState<string>('.');
  const [mode, setMode] = useState(GAME_MODES.REGULAR);

  const getMe = () => {
    axios
      .get('/api/users/@me')
      .then((res) => {
        setMe(res.data);
      })
      .catch();
  };

  const initGame = (gameSocket: Socket) => {
    gameSocket.emit('ingame', { action: 'JOIN', game_id: gameId });
    gameSocket.emit('spectators', { game_id: gameId });
    gameSocket.on('spectators', (data: { spectators: Spectator[] }) => {
      setSpectators(data.spectators);
    });
    gameSocket.on(`${gameId}`, (gameData: GameData) => {
      setGame(gameData);
      setMode(GAME_MODES[gameData.mode]);
    });
  };

  const waitingInterval = setInterval(() => {
    setDot((prev) => (prev === '...' ? '.' : prev + '.'));
    if (game.home?.is_ready && game.away?.is_ready) {
      clearInterval(waitingInterval);
    }
  }, 500);

  return {
    game,
    gameId,
    me,
    spectators,
    dot,
    mode,
    setDot,
    initGame,
    getMe,
    waitingInterval,
  };
};
