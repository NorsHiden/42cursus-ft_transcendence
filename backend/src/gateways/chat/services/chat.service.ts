import { IGatwaysService } from './../../interfaces/IGatwaysService.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/consts';
import { IChatService } from '../interfaces/IChatService.interface';
import { Socket, Server } from 'socket.io';
import { Message } from 'src/typeorm/message.entity';
import { WsException } from '@nestjs/websockets';
import { IChannelsService } from 'src/channels/interfaces/IChannelsService.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
    @Inject(Services.Channels)
    private readonly channelsService: IChannelsService,
  ) {}

  private users: Map<number, string> = new Map();

  public async handleConnection(client: Socket): Promise<void> {
    const id = await this.gatewaysService.getUserId(client);
    this.users.set(id, client.id);
    return Promise.resolve();
  }

  handleDisconnect(client: any): void {
    console.log('handleDisconnect');
    this.users.delete(client.id);
  }

  public handleMessage(
    server: Server,
    channelId: number,
    message: Message,
  ): void {
    const serializedMessage = {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      author: {
        id: message.author.id,
        display_name: message.author.display_name,
        avatar: message.author.profile.avatar,
      },
    };

    server.to(`channel-${channelId}`).emit('message', serializedMessage);
  }

  public async joinChannel(client: Socket, channelId: number): Promise<void> {
    try {
      const userId = await this.gatewaysService.getUserId(client);

      if (
        !(await this.channelsService.hasMember(channelId, userId.toString()))
      ) {
        throw new WsException('You are not a member of this channel');
      }

      client.join(`channel-${channelId}`);
      client
        .to(`channel-${channelId}`)
        .emit('message', { message: 'User joined channel-' + channelId });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  public async leaveChannel(client: Socket, channelId: number): Promise<void> {
    try {
      const userId = await this.gatewaysService.getUserId(client);

      if (
        !(await this.channelsService.hasMember(channelId, userId.toString()))
      ) {
        throw new WsException('You are not a member of this channel');
      }

      client.leave(`channel-${channelId}`);
      client
        .to(`channel-${channelId}`)
        .emit('message', { message: 'User left channel-' + channelId });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }
}
