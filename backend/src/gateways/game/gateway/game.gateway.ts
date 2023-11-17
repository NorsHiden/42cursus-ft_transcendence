<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eeab70f (joining rooms)
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
<<<<<<< HEAD
  WsException,
} from '@nestjs/websockets';
import { Inject, UseGuards } from '@nestjs/common';
import { Namespaces, Services, WebSocketEvents } from 'src/utils/consts';
import { IGameService } from '../interfaces/game.interface';
import { WsGuard } from 'src/gateways/guards/ws.guard';
import { Server, Socket } from 'socket.io';
=======
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
=======
} from '@nestjs/websockets';
>>>>>>> eeab70f (joining rooms)
import { Inject, UseGuards } from '@nestjs/common';
import { Namespaces, Services } from 'src/utils/consts';
import { IGameService } from '../interfaces/game.interface';
import { WsGuard } from 'src/gateways/guards/ws.guard';
<<<<<<< HEAD
import { Server } from 'socket.io';
>>>>>>> ccf63eb (game init)
=======
import { Server, Socket } from 'socket.io';
>>>>>>> eeab70f (joining rooms)
import { WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: Namespaces.Game,
  cors: {
    origin: '*',
<<<<<<< HEAD
    credentials: true,
=======
>>>>>>> ccf63eb (game init)
  },
})
@UseGuards(WsGuard)
export class GameGateway {
  @WebSocketServer()
  private server: Server;

  constructor(
    @Inject(Services.Game) private readonly gameService: IGameService,
  ) {}

<<<<<<< HEAD
  // Event handler for when a client connects to the WebSocket server
  async handleConnection(client: Socket) {
    await this.gameService.handleConnection(client);
  }

  // Event handler for when a client disconnects from the WebSocket server
  async handleDisconnect(client: Socket) {
    await this.gameService.closeConnection(client);
  }

  @SubscribeMessage(WebSocketEvents.Lobby)
  async manageLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody('action') action: string,
    @MessageBody('target_id') target_id?: string,
    @MessageBody('game_mode') game_mode?: string,
  ) {
    return await this.gameService.manageLobby(
      client,
      this.server,
      action,
      target_id,
      game_mode,
    );
  }

  @SubscribeMessage(WebSocketEvents.InGame)
  async manageInGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('action') action: string,
    @MessageBody('game_id') game_id: string,
  ) {
    if (action != 'UP' && action != 'DOWN' && action != 'JOIN')
      throw new WsException('Invalid Action');
    return await this.gameService.manageInGame(
      client,
      this.server,
      action,
      game_id,
    );
  }

  @SubscribeMessage(WebSocketEvents.Spectators)
  manageSpectators(
    @ConnectedSocket() client: Socket,
    @MessageBody('game_id') game_id: string,
  ) {
    return this.gameService.getSpectators(client, game_id);
=======
  @SubscribeMessage('test')
<<<<<<< HEAD
  test() {
    console.log('test');
>>>>>>> ccf63eb (game init)
=======
  async test(
    @ConnectedSocket() client: Socket,
    @MessageBody('name') name: string,
  ) {
    await this.gameService.handleConnection(client, client.id);
    console.log(this.gameService.getId(client.id));
    client.join('some_room');
    this.server.to('some_room').emit('test2', 'test2');
    return name;
>>>>>>> eeab70f (joining rooms)
  }
}
