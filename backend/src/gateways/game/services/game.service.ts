import { Inject, Injectable } from '@nestjs/common';
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
import { Services } from 'src/utils/consts';
import { Socket } from 'socket.io';
import { InGame } from '../interfaces/InGame.interface';
import { LobbyUser } from '../interfaces/LobbyUser.interface';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { WsException } from '@nestjs/websockets';
import { User } from 'src/typeorm/user.entity';

@Injectable()
export class GameService {
  private users: Map<string, number>;
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

    this.users.set(client.id, id);

    return Promise.resolve();
  }

  // Asynchronously handle a client disconnection
  async closeConnection(client: Socket): Promise<void> {
    this.users.delete(client.id);

    this.lobby = this.lobby.filter((player) => player.id != client.id);
    client.disconnect();
  }
  getId(client_id: string): number {
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
}
