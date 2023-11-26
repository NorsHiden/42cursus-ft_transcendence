import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Inject, UseGuards } from '@nestjs/common';
import { Namespaces, Services } from 'src/utils/consts';
import { IGameService } from '../interfaces/game.interface';
import { WsGuard } from 'src/gateways/guards/ws.guard';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { GameData } from '../types/GameData.type';

@WebSocketGateway({
  namespace: Namespaces.Game,
  cors: {
    origin: '*',
    credentials: true,
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
      this.server,
      action,
      target_id,
      game_mode,
    );
  }

  @SubscribeMessage('ingame')
  async manageInGame(
    @ConnectedSocket() client: Socket,
    @MessageBody('action') action: string,
    @MessageBody('game_id') game_id: string,
  ) {
    if (action != 'UP' && action != 'DOWN' && action != 'JOIN')
      throw new WsException('Action Not Found');
    return await this.gameService.manageInGame(client, action, game_id);
  }

  @SubscribeMessage('spectators')
  async manageSpectators() {}
}
