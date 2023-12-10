import { FC } from 'react';

interface SearchSkeletonProps {
  index: number;
}

export const SearchSkeleton: FC<SearchSkeletonProps> = ({ index }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-12 h-12 bg-gray rounded-full" />
        <div className="flex flex-col justify-center gap-2">
          <div className="w-24 h-3 bg-gray rounded-lg" />
          <div className="w-20 h-2 bg-gray rounded-lg" />
        </div>
      </div>
      {index < 5 && <hr className="w-full h-px text-darkGray" />}
    </div>
  );
};
