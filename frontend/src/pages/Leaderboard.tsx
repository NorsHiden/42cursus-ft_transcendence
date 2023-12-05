import React from 'react';
import { Link } from 'react-router-dom';

type LeaderboardCardProps = {
  rank: number;
  username: string;
  display_name: string;
  matches: number;
  wins: number;
};

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  rank,
  username,
  display_name,
  matches,
  wins,
}) => {
  const rankColor =
    rank === 1 ? '#523E0B' : rank === 2 ? '#353639' : rank === 3 ? '#4C2B20' : '#1E1F23';
  const displayedRank = rank <= 9 ? `00${rank}` : rank <= 99 ? `0${rank}` : rank;

  return (
    <div
      className="w-full flex items-center justify-between py-4 pl-10 pr-28"
      style={{ backgroundColor: rankColor }}
    >
      <div className="flex items-center gap-x-16">
        <h1 className="font-bold text-lg text-white">{displayedRank}</h1>
        <Link className="flex items-center gap-x-2" to={`/${username}/overview`}>
          <div className="w-16 h-16 rounded-full empty"></div>
          <div className="text-left">
            <p className="font-sans font-medium text-white">{display_name}</p>
            <p className="font-sans font-medium text-gray text-sm">@{username}</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-x-16">
        <p className="text-white">
          {matches} Match{matches > 1 ? 'es' : ''}
        </p>
        <p className="text-white">
          {wins} Win{wins > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

const Leaderboard: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-4 grid-rows-section gap-x-5 gap-y-8 pt-4">
      <header className="col-span-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-white">Ranking of players by wins</p>
      </header>
      <section className="col-span-4 flex flex-col gap-y-5 overflow-y-auto scrollbar-none pb-5">
        <LeaderboardCard rank={1} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={2} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={3} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
        <LeaderboardCard rank={4} username="test" display_name="test" matches={1} wins={1} />
      </section>
    </div>
  );
};

export default Leaderboard;
