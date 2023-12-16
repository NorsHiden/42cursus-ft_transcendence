import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Inject, UseFilters, UseGuards } from '@nestjs/common';
import { Namespaces, Services, WebSocketEvents } from 'src/utils/consts';
import { IGameService } from '../interfaces/game.interface';
import { WsGuard } from 'src/gateways/guards/ws.guard';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { AllExceptionsFilter } from '../../filters/exception.filter';
import { UserFiler } from '../types/UserFilter.type';

@WebSocketGateway({
  namespace: Namespaces.Game,
  cors: {
    origin: '*',
    credentials: true,
  },
})
@UseFilters(new AllExceptionsFilter())
@UseGuards(WsGuard)
export class GameGateway {
  @WebSocketServer()
  private server: Server;

  constructor(
    @Inject(Services.Game) private readonly gameService: IGameService,
  ) {}

  // Event handler for when a client connects to the WebSocket server
  async handleConnection(client: Socket) {
    console.log('------------ Client connected: ' + client.id);
    await this.gameService.handleConnection(client);
  }

  // Event handler for when a client disconnects from the WebSocket server
  async handleDisconnect(client: Socket) {
    console.log('------------ Client disconnected: ' + client.id);
    await this.gameService.closeConnection(client, this.server);
  }

  @SubscribeMessage(WebSocketEvents.Lobby)
  async manageLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody('action') action: string,
    @MessageBody('target_id') target_id?: string,
    @MessageBody('game_mode') game_mode?: string,
  ) {
    console.log('lobby: ', action);
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
  }

  @SubscribeMessage(WebSocketEvents.Live)
  liveMatches(
    @ConnectedSocket() client: Socket,
    @MessageBody('game_mode') game_mode: UserFiler['game_mode'],
    @MessageBody('live') live: UserFiler['live'],
  ) {
    if (
      game_mode != 'REGULAR' &&
      game_mode != 'CURSED' &&
      game_mode != 'VANISH' &&
      game_mode != 'GOLD_RUSH' &&
      game_mode != 'ALL' &&
      live != 'ALL' &&
      live != 'LIVE' &&
      live != 'DONE'
    )
      throw new WsException('Invalid Game Mode');
    return this.gameService.getLiveGames(client, game_mode, live);
  }
}
