import { Socket } from 'socket.io';

export interface LobbyUser {
  id: string;
  socket: Socket;
  game_mode: string;
  score_points: number;
}
