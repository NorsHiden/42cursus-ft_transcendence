import { Socket } from 'socket.io';
import { LobbyUser } from './LobbyUser.interface';
import { User } from 'src/typeorm/user.entity';
export interface IGameService {
  handleConnection(client: Socket): Promise<void>;
  closeConnection(client: Socket): Promise<void>;
  getId(id: string): number;
  getUser(user_id: string): Promise<User>;
  createGame(client: Socket, opponent: LobbyUser): object;
  findOpponent(target_id: string, action: string, game_mode: string): LobbyUser;
  leaveLobby(client: Socket): Promise<object>;
  joinLobby(
    client: Socket,
    action: string,
    target_id: string,
    game_mode: string,
  ): Promise<object>;
  manageLobby(
    client: Socket,
    action: string,
    target_id: string,
    game_mode: string,
  );
}
