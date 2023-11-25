import { Socket } from 'socket.io';

export type LobbyUser = {
  id: string;
  socket: Socket;
  game_mode: string;
  invitation: boolean;
}
