import { MatchHistory } from 'src/typeorm/match_history.entity';

export type MatchHistoryData = {
  data: MatchHistory[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    TotalPages: number;
    sortBy: { field: string; order: string };
  };
};
