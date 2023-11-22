import { Socket, Server } from 'socket.io';
export interface IGameService {
  handleConnection(client: Socket): Promise<void>;
  closeConnection(client: Socket): Promise<void>;
  inviteFriend(client: Socket, target_id: string, game_mode: string);
  cancelLobby(client_id: string);
  getId(id: string): number;
  findLobby(client: Socket, server: Server, game_mode: string): object;
  spectateGame(client: Socket, server: Server, game_id: string): object;
}
