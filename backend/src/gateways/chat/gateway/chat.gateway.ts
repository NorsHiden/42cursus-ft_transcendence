import { IChatService } from './../interfaces/IChatService.interface';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from '../services/chat.service';
import { WsGuard } from 'src/gateways/guards/ws.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { Namespaces, Services } from 'src/utils/consts';

@UseGuards(WsGuard)
@WebSocketGateway({
  namespace: Namespaces.Chat,
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    @Inject(Services.Chat) private readonly chatService: IChatService,
  ) {}

  @WebSocketServer()
  public server: Server;

  public handleConnection(client: any, ...args: any[]) {
    this.chatService.handleConnection(client, ...args);
  }

  @SubscribeMessage('message')
  public handleMessage(client: any, payload: any): void {
    this.chatService.handleMessage(client, payload);
  }
}
