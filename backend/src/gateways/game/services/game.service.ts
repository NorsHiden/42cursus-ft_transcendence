import { Inject, Injectable } from '@nestjs/common';
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
import { Services } from 'src/utils/consts';
import { Socket, Server } from 'socket.io';
import { InGame } from '../interfaces/InGame.interface';
import { LobbyUser } from '../interfaces/LobbyUser.interface';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { WsException } from '@nestjs/websockets';
import { User } from 'src/typeorm/user.entity';
import { Notification } from 'src/typeorm/notification.entity';

@Injectable()
export class GameService {
  private users: Map<string, string>;
  private lobby: LobbyUser[];
  private ingame: InGame[];

  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
    @Inject(Services.Users)
    private readonly usersService: IUsersService,
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
  ) {
    this.users = new Map();
    this.lobby = [];
    this.ingame = [];
  }

  // Asynchronously handle a new client connection
  async handleConnection(client: Socket): Promise<void> {
    const id = await this.gatewaysService.getUserId(client, []);

    this.users.set(client.id, id.toString());

    return Promise.resolve();
  }

  // Asynchronously handle a client disconnection
  async closeConnection(client: Socket): Promise<void> {
    this.users.delete(client.id);

    this.lobby = this.lobby.filter((player) => player.socket.id != client.id);
    client.disconnect();
  }
  getId(client_id: string): string {
    if (!this.users.has(client_id)) throw new WsException('Client Not Found');
    return this.users[client_id];
  }

  async getUser(user_id: string): Promise<User> {
    try {
      return await this.usersService.getUser(user_id);
    } catch (e) {
      throw new WsException('User Not Found');
    }
  }

  findOpponent(
    target_id: string,
    action: string,
    game_mode: string,
  ): LobbyUser {
    if (action == 'ACCEPT')
      return this.lobby.find((user) => user.id == target_id && user.invitation);
    if (action == 'SEARCH')
      return this.lobby.find((user) => user.game_mode == game_mode);
    return null;
  }

  async leaveLobby(client: Socket): Promise<object> {
    this.lobby = this.lobby.filter((user) => user.socket.id != client.id);
    return {
      message: "You've left the lobby",
    };
  }

  async joinLobby(
    client: Socket,
    action: string,
    target_id: string,
    game_mode: string,
  ): Promise<object> {
    this.lobby.push({
      id: this.users.get(client.id),
      socket: client,
      game_mode: game_mode,
      invitation: action == 'INVITE' ? true : false,
      score_points: 0,
    });
    if (action == 'INVITE')
      await this.notificationService.addNotification(target_id, {
        recipient: await this.getUser(this.users.get(client.id)),
        sender: await this.getUser(target_id),
        action: 'GAME_REQUEST',
      } as Notification);
    return {
      state: 'WAITING',
      message: 'Waiting for the opponent...',
    };
  }

  createGame(client: Socket, opponent: LobbyUser): object {
    const clientLobby = {
      id: this.users.get(client.id),
      socket: client,
      game_mode: opponent.game_mode,
      score_points: 0,
      invitation: false,
    };
    this.ingame.push({
      id: `${opponent.socket.id}${client.id}`,
      home_player: clientLobby,
      away_player: opponent,
      created_at: new Date(),
      end_at: undefined,
      game_mode: opponent.game_mode,
      spectators: [],
    });
    this.lobby = this.lobby.filter(
      (user) =>
        user.socket.id != client.id && user.socket.id != opponent.socket.id,
    );
    opponent.socket.emit('lobby', {
      state: 'MATCH_FOUND',
      game_id: `${opponent.socket.id}${client.id}`,
      message: 'Game has been created.',
    });
    return {
      state: 'MATCH_FOUND',
      game_id: `${opponent.socket.id}${client.id}`,
      message: 'Game has been created.',
    };
  }

  async manageLobby(
    client: Socket,
    action: string,
    target_id: string,
    game_mode: string,
  ) {
    if (
      action != 'SEARCH' &&
      action != 'INVITE' &&
      action != 'ACCEPT' &&
      action != 'CANCEL'
    )
      throw new WsException('Action Not Found');
    if (action == 'CANCEL') return this.leaveLobby(client);
    const opponent = this.findOpponent(target_id, action, game_mode);
    if (!opponent && action != 'ACCEPT')
      return await this.joinLobby(client, action, target_id, game_mode);
    if (!opponent && action == 'ACCEPT')
      throw new WsException("Inviter doesn't exist");
    return this.createGame(client, opponent);
  }
}
