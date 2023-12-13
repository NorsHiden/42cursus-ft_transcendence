import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { getColorValue } from '@utils/getColorValue';
import twclsx from '@utils/twclsx';
import { GAME_MODES } from '@globalTypes/gameModes';
import Card from '@components/Card';
import { gameSocket } from '../../socket';
import PlayRectangleSolid from '@assets/novaIcons/solid/PlayRectangleSolid';
import CloseRectangleSolid from '@assets/novaIcons/solid/CloseRectangleSolid';

type Lobby = {
  state: string;
  game_id: string;
  message: string;
};

const GameModes: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const checkLobby = (lobby: Lobby) => {
    if (lobby.state === 'MATCH_FOUND') navigate(`/game/${lobby.game_id}`);
  };

  const handleButtonClick = () => {
    if (isSearching) {
      gameSocket.emit('lobby', { action: 'CANCEL' });
      setIsSearching(false);
    } else {
      gameSocket.emit('lobby', {
        action: 'SEARCH',
        game_mode: Object.keys(GAME_MODES)[selectedMode],
      });
      setIsSearching(true);
    }
  };

  useEffect(() => {
    gameSocket.on('lobby', checkLobby);
    gameSocket.on('error', () => {
      toast.dismiss();
      toast.error('You need at least 300pts to play Gold Rush');
      setIsSearching(false);
    });

    return () => {
      gameSocket.off('lobby', checkLobby);
      gameSocket.off('error');
    };
  }, []);

  return (
    <section className="col-span-2 flex flex-col items-start gap-y-6">
      <h1 className="font-serif text-xl text-white">Game Modes</h1>
      <div className="flex gap-x-4 gap-y-3 flex-wrap">
        {Object.values(GAME_MODES).map((mode, index) => (
          <Card
            className={twclsx(
              `center py-6 px-9 transition-all text-${mode.name}-dark cursor-pointer opacity-80 transition-all`,
              isSearching && 'cursor-not-allowed',
              selectedMode == index && `brightness-150 opacity-100`,
              selectedMode != index && !isSearching && `hover:scale-105 hover:opacity-100`,
            )}
            cut={20}
            borderWidth={selectedMode == index ? 2 : 1}
            borderColor={getColorValue(mode.name, 'lightDark')}
            key={mode.name}
            onClick={() => !isSearching && setSelectedMode(index)}
          >
            <mode.icon size={50} className={`text-${mode.name}-color`} />
          </Card>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Card
          cut={20}
          className={twclsx(
            'center transition-all',
            isSearching && 'text-gray hover:text-gray/90',
            !isSearching && 'text-primary hover:text-primary/90',
          )}
          onClick={handleButtonClick}
        >
          <button className="flex items-center gap-x-2 text-white text-xl font-serif py-4 px-9 z-10">
            {!isSearching && <PlayRectangleSolid size={24} className="text-white/40" />}
            {isSearching && <CloseRectangleSolid size={24} className="text-white/40" />}
            {isSearching ? 'CANCEL' : 'PLAY'}
          </button>
        </Card>
        {isSearching && (
          <div className="text-white font-semibold loading-dots">Looking for an opponent</div>
        )}
      </div>
    </section>
  );
};

export default GameModes;
