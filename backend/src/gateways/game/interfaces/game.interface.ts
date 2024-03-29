import { Socket, Server } from 'socket.io';
import { User } from 'src/typeorm/user.entity';
import { LobbyUser } from '../types/LobbyUser.type';
import { RecentGame } from '../types/RecentGame.type';
import { UserFiler } from '../types/UserFilter.type';
export interface IGameService {
  handleConnection(client: Socket): Promise<void>;
  closeConnection(client: Socket, server: Server): Promise<void>;
  getId(id: string): number;
  getUser(user_id: string): Promise<User>;
  createGame(client: Socket, opponent: LobbyUser): Promise<void>;
  findOpponent(target_id: string, action: string, game_mode: string): LobbyUser;
  leaveLobby(client: Socket): Promise<void>;
  joinLobby(
    client: Socket,
    action: string,
    target_id: string,
    game_mode: string,
  ): Promise<void>;
  manageLobby(
    client: Socket,
    server: Server,
    action: string,
    target_id: string,
    game_mode: string,
  );
  manageInGame(client: Socket, server: Server, action: string, game_id: string);
  getSpectators(client: Socket, game_id: string): void;
  getRecentGames(): Promise<RecentGame[]>;
  getLiveGames(
    client: Socket,
    game_mode: UserFiler['game_mode'],
    live: UserFiler['live'],
  ): void;
}
