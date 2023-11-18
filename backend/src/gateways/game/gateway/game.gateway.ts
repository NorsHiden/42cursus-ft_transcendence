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

  // Event handler for when a client connects to the WebSocket server
  async handleConnection(client: Socket) {
    // Call the game service to handle the connection
    await this.gameService.handleConnection(client);
  }

  // Event handler for when a client disconnects from the WebSocket server
  async handleDisconnect(client: Socket) {
    // Call the game service to close the connection
    await this.gameService.closeConnection(client);
  }

  // Event handler for the 'lobby' message, used for joining game lobbies
  @SubscribeMessage('lobby')
  async lobby(
    @ConnectedSocket() client: Socket, // Decorator to inject the connected socket
    @MessageBody('game_mode') game_mode: string, // Decorator to extract the 'game_mode' from the message body
  ) {
    // Check if the provided game mode is valid
    if (
      game_mode !== 'REGULAR' &&
      game_mode !== 'CURSED' &&
      game_mode !== 'VANISH' &&
      game_mode !== 'GOLD_RUSH'
    ) {
      // If not valid, return an error response
      return {
        action: 'NOT_FOUND',
        message: 'Game Mode Not Found',
      };
    }

    // If valid, call the game service to find a lobby
    return this.gameService.findLobby(client, this.server, game_mode);
  }

  // Event handler for the 'spectate' message, used for spectating games
  @SubscribeMessage('spectate')
  async spectate(
    @ConnectedSocket() client: Socket, // Decorator to inject the connected socket
    @MessageBody('game_id') game_id: string, // Decorator to extract the 'game_id' from the message body
  ) {
    // Call the game service to handle the spectate request
    return this.gameService.spectateGame(client, this.server, game_id);
  }
}
