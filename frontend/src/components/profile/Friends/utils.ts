import axios from 'axios';
import { User } from '@globalTypes/types';

export const unfriend = async (
  friends: User[],
  username: string,
  userID: Number,
  setFriends: (value: User[]) => void,
) => {
  const updatedFriends = friends.filter((user) => user.username !== username);
  setFriends(updatedFriends);
  try {
    const response = await axios.delete(`/api/friendlist/${userID}`);
    if (response.status !== 200) throw new Error('failed to delete friend');
  } catch (error) {}
};

export const block = async (
  friends: User[],
  username: string,
  userID: Number,
  setFriends: (value: User[]) => void,
) => {
  const updatedFriends = friends.filter((user) => user.username !== username);
  setFriends(updatedFriends);
  try {
    const response = await axios.post(`/api/friendlist/${userID}/block`);
    if (response.status !== 201) throw new Error('failed to block user id');
  } catch (error) {}
};

export const decline = async (
  pending: User[],
  username: string,
  userID: Number,
  setPending: (value: User[]) => void,
) => {
  // delete /api/friendlist/[userId]
  const updatedAccepted = pending.filter((user) => user.username !== username);
  setPending(updatedAccepted);
  axios.delete(`/api/friendlist/${userID}`).then((response) => {
    if (response.status != 200) throw new Error('failed to delete friend');
  });
};

export const accept = async (
  pending: User[],
  username: string,
  userID: Number,
  setPending: (value: User[]) => void,
) => {
  // post /api/friendlist/[userId]/accept
  const updatedAccepted = pending.filter((user) => user.username !== username);
  setPending(updatedAccepted);
  axios.post(`/api/friendlist/${userID}/accept`).then((response) => {
    if (response.status != 201) throw new Error(`Cant accept user ${userID}`);
  });
};

export const unblock = async (
  blocked: User[],
  username: string,
  userID: Number,
  setBlocked: (value: User[]) => void,
) => {
  const updatedBlocked = blocked.filter((user) => user.username !== username);
  setBlocked(updatedBlocked);
  axios.post(`/api/friendlist/${userID}/unblock`).then((response) => {
    if (response.status != 201) throw new Error(`cant unblock user ${userID}`);
  });
};
