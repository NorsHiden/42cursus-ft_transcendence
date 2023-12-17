import { io } from 'socket.io-client';

export const gameSocket = io(`${import.meta.env.VITE_BACKEND_HOST}/game`, {
  withCredentials: true,
});

export const chatSocket = io(`${import.meta.env.VITE_BACKEND_HOST}/chat`, {
  withCredentials: true,
});
