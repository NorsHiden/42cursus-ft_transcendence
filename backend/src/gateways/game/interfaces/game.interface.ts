<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Socket, Server } from 'socket.io';
<<<<<<< HEAD
import { User } from 'src/typeorm/user.entity';
import { LobbyUser } from '../types/LobbyUser.type';
export interface IGameService {
  handleConnection(client: Socket): Promise<void>;
  closeConnection(client: Socket): Promise<void>;
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
}
=======
export interface IGameService {}
>>>>>>> ccf63eb (game init)
=======
=======
import { Socket, Server } from 'socket.io';
>>>>>>> 8ebad9c (implementing game_mode matchmaking)
=======
import { InGame } from './InGame.interface';
>>>>>>> 0232c7e (game init)
=======
import { Socket } from 'socket.io';
import { LobbyUser } from './LobbyUser.interface';
import { User } from 'src/typeorm/user.entity';
>>>>>>> 964df2d (lobby management and invite has been implemented)
=======
import { Socket, Server } from 'socket.io';
import { User } from 'src/typeorm/user.entity';
import { LobbyUser } from '../types/LobbyUser.type';
>>>>>>> d68e69d (game mechanics)
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
    server: Server,
    action: string,
    target_id: string,
    game_mode: string,
  );
  manageInGame(client: Socket, action: string, game_id: string);
}
>>>>>>> eeab70f (joining rooms)
=======
export interface IGameService {}
>>>>>>> 475422b (game init)
=======
=======
import { Socket, Server } from 'socket.io';
>>>>>>> 46b0e30 (implementing game_mode matchmaking)
export interface IGameService {
  handleConnection(client: Socket): Promise<void>;
  closeConnection(client: Socket): Promise<void>;
  getId(id: string): number;
  findLobby(client: Socket, server: Server, game_mode: string): object;
  spectateGame(client: Socket, server: Server, game_id: string): object;
}
>>>>>>> 9c25fe2 (joining rooms)
