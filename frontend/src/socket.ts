import { io } from 'socket.io-client';

export const gameSocket = io('http://c3r6p1.1337.ma:3001/game', {
  withCredentials: true,
});

export const chatSocket = io('http://c3r6p1.1337.ma:3001/chat', {
  withCredentials: true,
});
