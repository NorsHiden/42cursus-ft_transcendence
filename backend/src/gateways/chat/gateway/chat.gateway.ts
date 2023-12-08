import { IChatService } from './../interfaces/IChatService.interface';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsGuard } from 'src/gateways/guards/ws.guard';
import {
  ClassSerializerInterceptor,
  Inject,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Server } from 'socket.io';
import { Namespaces, Services } from 'src/utils/consts';
import { Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { Message } from 'src/typeorm/message.entity';
import { AllExceptionsFilter } from 'src/gateways/filters/exception.filter';

@UseGuards(WsGuard)
@UseFilters(new AllExceptionsFilter())
@WebSocketGateway({
  namespace: Namespaces.Chat,
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway {
  constructor(
    @Inject(Services.Chat) private readonly chatService: IChatService,
  ) {}

  @WebSocketServer()
  public server: Server;

  public handleConnection(client: Socket, ...args: any[]) {
    this.chatService.handleConnection(client, ...args);
  }

  @SubscribeMessage('joinChannel')
  public joinChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody('channelId') channelId: number,
  ): void {
    this.chatService.joinChannel(client, channelId);
  }

  @SubscribeMessage('leaveChannel')
  public leaveChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody('channelId') channelId: number,
  ): void {
    this.chatService.leaveChannel(client, channelId);
  }

  @OnEvent('message.created')
  public onMessageCreated(payload: Message) {
    this.chatService.handleMessage(this.server, payload.channel.id, payload);
  }
}
