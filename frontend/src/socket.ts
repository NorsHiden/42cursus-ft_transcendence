import { io } from 'socket.io-client';

export const gameSocket = io('http://localhost:3001/game', {
  withCredentials: true,
});

export const chatSocket = io('http://localhost:3001/chat', {
  withCredentials: true,
});
