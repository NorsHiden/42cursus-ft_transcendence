import { Inject, Injectable } from '@nestjs/common';
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
import { Services } from 'src/utils/consts';
import { Socket, Server } from 'socket.io';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { WsException } from '@nestjs/websockets';
import { User } from 'src/typeorm/user.entity';
import { Notification } from 'src/typeorm/notification.entity';
import { LobbyUser } from '../types/LobbyUser.type';
import { InGame } from '../types/InGame.type';
import { GameData } from '../types/GameData.type';

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
    if (!id) return;

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

  async initGame(home: LobbyUser, away: LobbyUser) {
    const home_user = await this.usersService.getUser(home.id);
    const away_user = await this.usersService.getUser(away.id);

    return {
      home: {
        avatar: home_user.profile.avatar,
        display_name: home_user.display_name,
        width: 2,
        height: 20,
        x: 0,
        y: 50 - 20 / 2, // y_pos - (height/2)
        is_ready: false,
      },
      away: {
        avatar: away_user.profile.avatar,
        display_name: away_user.display_name,
        width: 2,
        height: 20,
        x: 100 - 2, // x_pos - width
        y: 50 - 20 / 2, // y_pos - (height/2)
        is_ready: false,
      },
      ball: {
        is_hidden: false,
        x: 50,
        y: 50,
        speed: {
          x: Math.random() >= 0.5 ? 0.5 : -0.5,
          y: Math.random(),
        },
        radius: 2,
      },
      mode: home.game_mode,
      score: {
        home: 0,
        away: 0,
      },
      will_reverse: false,
    };
  }

  startGameLoop(server: Server, ingame: InGame) {
    if (!ingame.game_data.home.is_ready || !ingame.game_data.away.is_ready)
      return;
    server.in(ingame.id).emit(ingame.id, ingame.game_data);
  }

  async createGame(
    client: Socket,
    server: Server,
    opponent: LobbyUser,
  ): Promise<object> {
    const clientLobby = {
      id: this.users.get(client.id),
      socket: client,
      game_mode: opponent.game_mode,
      invitation: false,
    };
    const createdGame: InGame = {
      id: `${opponent.socket.id}${client.id}`,
      home_player: clientLobby,
      away_player: opponent,
      created_at: new Date(),
      end_at: undefined,
      game_mode: opponent.game_mode,
      spectators: [],
      game_data: await this.initGame(opponent, clientLobby),
    };
    this.ingame.push(createdGame);
    this.lobby = this.lobby.filter(
      (user) =>
        user.socket.id != client.id && user.socket.id != opponent.socket.id,
    );
    createdGame.interval_id = setInterval(() =>
      this.startGameLoop(server, createdGame),
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
    server: Server,
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
    return await this.createGame(client, server, opponent);
  }

  async joinGame(client: Socket, inGameIndex: number): Promise<void> {
    if (this.users.get(client.id) === this.ingame[inGameIndex].home_player.id)
      this.ingame[inGameIndex].game_data.home.is_ready = true;
    else if (
      this.users.get(client.id) === this.ingame[inGameIndex].away_player.id
    )
      this.ingame[inGameIndex].game_data.away.is_ready = true;
    else {
      const spectator = await this.usersService.getUser(
        this.users.get(client.id),
      );
      this.ingame[inGameIndex].spectators.push({
        id: spectator.id,
        display_name: spectator.display_name,
        avatar: spectator.profile.avatar,
      });
    }
    client.join(this.ingame[inGameIndex].id);
    console.log(this.ingame[inGameIndex]);
  }

  async manageInGame(client: Socket, action: string, game_id: string) {
    const inGameIndex = this.ingame.findIndex((game) => game.id == game_id);
    if (inGameIndex < 0) throw new WsException('Game Not Found');

    if (action == 'JOIN') return await this.joinGame(client, inGameIndex);

    const updatePlayerPosition = (player: { y: number }, action: string) => {
      if (action === 'UP' && player.y > 0) player.y -= 2;
      else if (action === 'DOWN' && player.y < 80) player.y += 2;
    };

    if (this.users.get(client.id) === this.ingame[inGameIndex].home_player.id)
      updatePlayerPosition(this.ingame[inGameIndex].game_data.home, action);
    else if (
      this.users.get(client.id) === this.ingame[inGameIndex].away_player.id
    )
      updatePlayerPosition(this.ingame[inGameIndex].game_data.away, action);
  }
}
