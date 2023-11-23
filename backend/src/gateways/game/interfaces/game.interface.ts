import { Socket, Server } from 'socket.io';
import { InGame } from './InGame.interface';
export interface IGameService {
  handleConnection(client: Socket): Promise<void>;
  closeConnection(client: Socket): Promise<void>;
  getId(id: string): number;
}
