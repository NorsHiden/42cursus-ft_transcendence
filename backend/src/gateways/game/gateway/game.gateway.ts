import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Inject, UseFilters, UseGuards } from '@nestjs/common';
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

  // Event handler for when a client connects to the WebSocket server
  async handleConnection(client: Socket) {
    await this.gameService.handleConnection(client);
  }

  // Event handler for when a client disconnects from the WebSocket server
  async handleDisconnect(client: Socket) {
    await this.gameService.closeConnection(client);
  }

  @SubscribeMessage('lobby')
  async manageLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody('action') action: string,
    @MessageBody('target_id') target_id?: string,
    @MessageBody('game_mode') game_mode?: string,
  ) {
    return await this.gameService.manageLobby(
      client,
      action,
      target_id,
      game_mode,
    );
  }

  @SubscribeMessage('ingame')
  async manageInGame() {}

  @SubscribeMessage('spectators')
  async manageSpectators() {}
}
