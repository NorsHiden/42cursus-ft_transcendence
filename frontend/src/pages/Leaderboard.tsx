import React from 'react';

const Leaderboard: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-section gap-x-5 gap-y-8 pt-4">
      <header className="cols-span-4 center">
				<h1>Leaderboard</h1>
				<p>Ranking of players by wins</p>
			</header>
    </div>
  );
};

export default Leaderboard;
