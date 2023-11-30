import React from 'react';

import { getColorValue } from '@utils/getColorValue';
import { GAME_MODES } from '@globalTypes/gameModes';
import Card from '@components/Card';

const GameModes: React.FC = () => {
  return (
    <section className="col-span-2 flex flex-col items-start gap-y-6">
      <h1 className="font-serif text-xl text-white">Game Modes</h1>
      <div className="flex gap-x-3 gap-y-3 flex-wrap">
        {GAME_MODES.map((mode) => (
          <Card
            className={`center py-5 px-8 text-${mode.name}-dark`}
            cut={18}
            borderWidth={1}
            borderColor={getColorValue(mode.name, 'lightDark')}
            key={mode.name}
          >
            <mode.icon size={50} className={`text-${mode.name}-color`} />
          </Card>
        ))}
      </div>
      <Card cut={20} className="flex text-primary">
        <button className="text-white text-xl font-serif py-4 px-10 rounded z-10">PLAY</button>
      </Card>
    </section>
  );
};

export default GameModes;
