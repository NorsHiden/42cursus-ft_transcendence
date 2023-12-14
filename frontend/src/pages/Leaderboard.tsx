import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserType } from '@globalTypes/user';
import axios from 'axios';

interface LeaderboardRecordProps {
  record: UserType;
  color: string;
  index: number;
}

const LeaderboardRecord: React.FC<LeaderboardRecordProps> = ({ record, color, index }) => {
  return (
    <div
      className="flex items-center w-full min-h-[6rem] justify-between rounded-xl overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center gap-8 md:gap-16 pl-10">
        <p className="text-xl font-bold">{index + 1}</p>
        <div className="flex items-center gap-4">
          <img src={record.profile.avatar} alt="avatar" className="w-16 h-16 rounded-full" />
          <div className="w-16 lg:w-24 xl:w-64 overflow-hidden">
            <p className="text-sm font-bold truncate">@{record.username}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-12 xl:gap-28 pr-8 md:pr-20 xl:pr-40">
        <div>{record.wins + record.loses} Matches</div>
        <div>{record.wins} Wins</div>
      </div>
    </div>
  );
};

const Leaderboard: React.FC = () => {
  const [records, setRecords] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const ranks = ['#523E0B', '#5F5E615C', '#4D2B20'];

  const observer = useRef<
    | IntersectionObserver
    | {
        disconnect: () => void;
        observe: (arg0: Element) => void;
      }
  >();

  const getRecords = async (page: number, abortController: AbortController) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/leaderboard?page=${page}`, {
        signal: abortController.signal,
      });
      setRecords((prevRecords) => [...prevRecords, ...res.data]);
      if (res.data.length < 10) setHasMore(false);
      setLoading(false);
    } catch (err) {
      return;
    }
  };

  const lastRecordElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => {
          return prevPage + 1;
        });
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    getRecords(page, abortController);
    return () => abortController.abort();
  }, [page]);

  return (
    <div className="flex flex-col text-white gap-10">
      <div className="flex flex-col items-center pt-24">
        <h1 className="text-3xl font-bold">Leader Board</h1>
        <p className="text-sm font-bold">Ranking of players by Wins</p>
      </div>
      <div
        className="flex flex-col items-center justify-start w-full h-[calc(100vh-22rem)] px-20 gap-4 
                    overflow-auto scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-[#5E6069]"
      >
        {records.map((record, i) => (
          <LeaderboardRecord
            key={i}
            index={i}
            record={record}
            color={i < 3 ? ranks[i] : '#1E1F23'}
          />
        ))}
        {!loading && hasMore && <div ref={lastRecordElementRef}></div>}
        {loading &&
          hasMore &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center w-full min-h-[6rem] justify-between rounded-xl bg-darkGray animate-pulse"
            />
          ))}
      </div>
    </div>
  );
};

export default Leaderboard;
