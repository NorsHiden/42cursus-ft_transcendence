import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Inject, UseGuards } from '@nestjs/common';
import { Namespaces, Services } from 'src/utils/consts';
import { IGameService } from '../interfaces/game.interface';
import { WsGuard } from 'src/gateways/guards/ws.guard';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: Namespaces.Game,
  cors: {
    origin: '*',
  },
})
@UseGuards(WsGuard)
export class GameGateway {
  @WebSocketServer()
  private server: Server;

  constructor(
    @Inject(Services.Game) private readonly gameService: IGameService,
  ) {}

  @SubscribeMessage('test')
  async test(
    @ConnectedSocket() client: Socket,
    @MessageBody('name') name: string,
  ) {
    await this.gameService.handleConnection(client, client.id);
    console.log(this.gameService.getId(client.id));
    client.join('some_room');
    this.server.to('some_room').emit('test2', 'test2');
    return name;
  }
}
