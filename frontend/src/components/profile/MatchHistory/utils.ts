import {Game,player,CardType} from '@globalTypes/index'
import axios from 'axios';
// import { useState } from 'react';

export type match =  {
    match_id: number;
    game_mode:Game;
    home_player:player;
    away_player:player;
    created_at: Date;
    ended_at: Date;
}

export const fetchMatches = async (
    matchType: string,
    page: number,
    userId: number,
    setMatches:(value:match[])=>void, 
    setHasMore:(value:boolean)=>void,
    setLoading:(value:boolean)=>void,
    prevMatches:match[],
  ): Promise<void> => {
    setLoading(true);
    // let url = `/api/match_history/${userId}`;
    // if (matchType !== 'all') {
    //   url += `/${matchType}`;
    // }
    // url += `?page=${page}`;
    const matchTypePath = matchType !== 'all' ? `${matchType}` : '';
    const url = `/api/match_history/${userId}/${matchTypePath}?page=${page}`;
    console.log(url);
    try {
      const res = await axios.get(url);
    //   console.log(res.data.data);
    //   console.log(res.data.meta);
      if (res.data.meta.currentPage < res.data.meta.TotalPages) {
        setHasMore(true);
      }
      else {
        setHasMore(false);
      }
      const newMatches:match[] = res.data.data.map((match:any) => ({
        id: match.id,
        game_mode: match.game_mode as Game,
        home_player: {
            id : match.home_player.id,
            username: match.home_player.username,
            score: match.home_score,
            avatar: match.home_player.profile.avatar,
        },
        away_player: {
            id : match.away_player.id,
            username: match.away_player.username,
            score: match.away_score,
            avatar: match.away_player.profile.avatar,
        },
        created_at: new Date(match.created_at),
        ended_at: new Date(match.ended_at),
      }));
    //   console.log(newMatches);
      setMatches([...prevMatches, ...newMatches]);    
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };