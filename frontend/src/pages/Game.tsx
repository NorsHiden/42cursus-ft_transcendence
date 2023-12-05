import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { NavLink } from 'react-router-dom';
import EyeSolid from '@assets/novaIcons/solid/EyeSolid';
import Card from '@components/Card';
import { useGame } from '@components/Game/useGame';
import { GameCanvas } from '@components/Game/GameCanvas';

const gameSocket = io('ws://localhost:3001/game', {
  withCredentials: true,
});

const GamePage: React.FC = () => {
  const { game, gameId, me, spectators, dot, mode, initGame, getMe, waitingInterval } = useGame();

  useEffect(() => {
    getMe();
    initGame(gameSocket);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'w') {
        gameSocket.emit('ingame', { action: 'UP', game_id: gameId });
      } else if (event.key === 's') {
        gameSocket.emit('ingame', { action: 'DOWN', game_id: gameId });
      }
    });

    return () => {
      document.removeEventListener('keydown', () => {});
      clearInterval(waitingInterval);
    };
  }, []);

  return (
    <div className="flex relative max-w-screen-lg mx-auto h-full justify-start items-center flex-col gap-y-8">
      {(!game.home || !game.home?.is_ready || !game.away?.is_ready) && (
        <div className="flex items-center justify-center fixed top-0 w-screen h-screen z-20 backdrop-blur-sm">
          <div className="flex items-center justify-center  pl-4 w-[35rem] h-24 bg-darkGray rounded-xl">
            <p className="text-white font-bold text-xl">Waiting for the opponent to join{dot}</p>
          </div>
        </div>
      )}
      {game.is_finished && (
        <div className="flex items-center justify-center fixed top-0 w-screen h-screen z-20 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center pl-4 w-[35rem] h-48 bg-darkGray rounded-xl gap-4">
            {(game.score.home == 5 && game.home.display_name == me.display_name) ||
            (game.score.away == 5 && game.away.display_name == me.display_name) ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-white font-bold text-4xl">Victory</h1>
                <p className="text-white">You are the Winner!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-white font-bold text-4xl">Defeat</h1>
                <p className="text-white">Never lose hope; you can always try again.</p>
              </div>
            )}
            <Card
              fill="#FE5821"
              borderColor="#FF8C66"
              borderWidth={2}
              cut={32}
              className="flex items-center justify-center w-24 h-12 text-white font-serif"
            >
              <NavLink title="Home" to="/">
                Home
              </NavLink>
            </Card>
          </div>
        </div>
      )}
      <div className="flex items-center gap-x-4 text-white">
        {game.home ? (
          <img
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
            src={game.home.avatar}
            alt={`${game.home.display_name} avatar`}
          />
        ) : (
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-darkGray" />
        )}
        <span className="lg:text-lg font-semibold">
          {game.home ? game.home.display_name : 'Home'}
        </span>
        <p className="font-serif font-semibold text-xl md:text-3xl lg:text-5xl mx-10 max-lg:w-24">
          {game.score ? game.score.home : 0} : {game.score ? game.score.away : 0}
        </p>
        <span className="lg:text-lg font-semibold">
          {game.away ? game.away.display_name : 'Away'}
        </span>
        {game.away ? (
          <img
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
            src={game.away.avatar}
            alt={`${game.away.display_name} avatar`}
          />
        ) : (
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-darkGray" />
        )}
      </div>

      <div className="relative max-w-full aspect-video center text-white bg-lightBlack border-4 border-darkGray rounded-2xl">
        <GameCanvas
          width="1920"
          height="1080"
          className={`w-full h-full px-4 ${game.will_reverse && 'animate-pulse'}`}
          homePlayer={game.home}
          awayPlayer={game.away}
          ball={game.ball}
          me={me}
        />
        <div
          className={`w-10 h-10 center bg-${mode.name}-color absolute bottom-0 translate-y-1/2 rounded-full`}
        >
          {<mode.icon size={24} className={`text-${mode.name}-dark`} />}
        </div>
      </div>
      <div className="absolute bottom-14 text-3xl text-white font-bold">
        {game.ready_timer > 0 && game.ready_timer}
      </div>
      {spectators.length > 0 && (
        <div className="flex items-center gap-x-2 self-start">
          <EyeSolid size={24} className="text-white" />
          <div className="flex items-center -space-x-3">
            {spectators.slice(0, 4).map((spectator) => (
              <img
                key={spectator.id}
                className="w-10 h-10 rounded-full border-2 border-black"
                src={spectator.avatar}
                alt={`${spectator.display_name} avatar`}
              />
            ))}
          </div>
          <span className="text-gray text-sm">
            {spectators.length > 4 && `+${spectators.length - 4}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default GamePage;
