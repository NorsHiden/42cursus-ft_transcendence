import React, { useEffect, useState } from 'react';
import { getColorValue } from '@utils/getColorValue';
import { GAME_MODES } from '@globalTypes/gameModes';
import Card from '@components/Card';
import { socket } from '../../socket';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CursedIcon, GoldRushIcon, RegularIcon, VanishIcon } from '@assets/gameIcons';

const selectMode = {
  regular: 'REGULAR',
  vanish: 'VANISH',
  cursed: 'CURSED',
  goldRush: 'GOLD_RUSH',
};

const GameModes: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>(GAME_MODES.REGULAR.name);
  const [searching, setSearching] = useState<boolean>(false);
  const [dot, setDot] = useState<string>('.');
  const navigate = useNavigate();

  const GameModesCards = [
    { name: 'regular', icon: RegularIcon },
    { name: 'cursed', icon: CursedIcon },
    { name: 'vanish', icon: VanishIcon },
    { name: 'goldRush', icon: GoldRushIcon },
  ];

  const checkLobby = (lobby: { state: string; game_id: string; message: string }) => {
    if (lobby.state === 'MATCH_FOUND') {
      navigate(`/game/${lobby.game_id}`);
    }
  };

  const findGame = () => {
    if (searching) {
      socket.emit('lobby', {
        action: 'CANCEL',
      });
      setSearching(false);
    } else {
      socket.emit('lobby', {
        action: 'SEARCH',
        game_mode: selectMode[selectedMode as keyof typeof selectMode],
      });
      setSearching(true);
    }
  };

  useEffect(() => {
    socket.on('lobby', checkLobby);
    socket.on('error', () => {
      toast.dismiss();
      toast.error('You need atleast 300pts to play Gold Rush');
      setSearching(false);
    });

    const interval = setInterval(() => {
      setDot((prev) => (prev === '...' ? '.' : prev + '.'));
    }, 500);
    return () => {
      clearInterval(interval);
      socket.off('lobby', checkLobby);
      socket.off('error');
    };
  }, []);

  return (
    <section className="col-span-2 flex flex-col items-start gap-y-6">
      <h1 className="font-serif text-xl text-white">Game Modes</h1>
      <div className="flex gap-x-3 gap-y-3 flex-wrap">
        {GameModesCards.map((mode) => (
          <Card
            className={`center py-5 px-8 transition-all text-${mode.name}-dark ${
              selectedMode != mode.name || searching
                ? searching
                  ? 'cursor-not-allowed opacity-50'
                  : 'opacity-50 hover:scale-110 hover:opacity-100 cursor-pointer'
                : 'brightness-150'
            }`}
            cut={18}
            borderWidth={1}
            borderColor={getColorValue(mode.name, 'lightDark')}
            key={mode.name}
            onClick={() => !searching && setSelectedMode(mode.name)}
          >
            <mode.icon size={50} className={`text-${mode.name}-color`} />
          </Card>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Card
          cut={20}
          className={`flex ${
            searching ? 'text-gray' : 'text-primary'
          } transition-all hover:brightness-125`}
          onClick={findGame}
        >
          <button className="text-white text-xl font-serif py-4 px-10 rounded z-10">
            {searching ? 'CANCEL' : 'PLAY'}
          </button>
        </Card>
        {searching && <div className="flex text-white font-bold">Looking for an opponent{dot}</div>}
      </div>
    </section>
  );
};

export default GameModes;
