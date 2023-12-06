import { User } from '@globalTypes/user';
import { useState } from 'react';

export const useFriendsBar = () => {
  const [friends, setFriends] = useState<User[]>([]);

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
