import { useState } from 'react';
import { UserType } from '@globalTypes/user';

export const useFriendsBar = () => {
  const [friends, setFriends] = useState<UserType[]>([]);

  const getSseRequest = () => {
    const sse = new EventSource('/api/friendlist/sse', { withCredentials: true });
    sse.onmessage = (event) => {
      setFriends(JSON.parse(event.data).slice(0, 6));
    };

    return () => {
      sse.close();
    };
  };

  return {
    friends,
    getSseRequest,
  };
};
