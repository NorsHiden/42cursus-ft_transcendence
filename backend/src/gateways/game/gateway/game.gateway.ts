<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eeab70f (joining rooms)
=======
>>>>>>> 9c25fe2 (joining rooms)
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
>>>>>>> 475422b (game init)
=======
} from '@nestjs/websockets';
>>>>>>> 9c25fe2 (joining rooms)
import { Inject, UseGuards } from '@nestjs/common';
=======
  WsException,
} from '@nestjs/websockets';
import { Inject, UseFilters, UseGuards } from '@nestjs/common';
>>>>>>> 0232c7e (game init)
import { Namespaces, Services } from 'src/utils/consts';
import { IGameService } from '../interfaces/game.interface';
import { WsGuard } from 'src/gateways/guards/ws.guard';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Server } from 'socket.io';
>>>>>>> ccf63eb (game init)
=======
import { Server, Socket } from 'socket.io';
>>>>>>> eeab70f (joining rooms)
=======
import { Server } from 'socket.io';
>>>>>>> 475422b (game init)
=======
import { Server, Socket } from 'socket.io';
>>>>>>> 9c25fe2 (joining rooms)
import { WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: Namespaces.Game,
  cors: {
    origin: '*',
<<<<<<< HEAD
<<<<<<< HEAD
    credentials: true,
=======
>>>>>>> ccf63eb (game init)
=======
>>>>>>> 475422b (game init)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // Event handler for when a client connects to the WebSocket server
  async handleConnection(client: Socket) {
=======
  // Event handler for when a client connects to the WebSocket server
  async handleConnection(client: Socket) {
<<<<<<< HEAD
    // Call the game service to handle the connection
>>>>>>> 8ebad9c (implementing game_mode matchmaking)
=======
  // Event handler for when a client connects to the WebSocket server
  async handleConnection(client: Socket) {
    // Call the game service to handle the connection
>>>>>>> 46b0e30 (implementing game_mode matchmaking)
=======
>>>>>>> 0232c7e (game init)
    await this.gameService.handleConnection(client);
  }

  // Event handler for when a client disconnects from the WebSocket server
  async handleDisconnect(client: Socket) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    // Call the game service to close the connection
=======
>>>>>>> 0232c7e (game init)
    await this.gameService.closeConnection(client);
  }

  @SubscribeMessage('lobby')
  async manageLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody('action') action: string,
    @MessageBody('target_id') target_id?: string,
  ) {
<<<<<<< HEAD
=======
    // Call the game service to close the connection
    await this.gameService.closeConnection(client);
  }

  // Event handler for the 'lobby' message, used for joining game lobbies
  @SubscribeMessage('lobby')
  async lobby(
    @ConnectedSocket() client: Socket, // Decorator to inject the connected socket
    @MessageBody('game_mode') game_mode: string, // Decorator to extract the 'game_mode' from the message body
  ) {
>>>>>>> 46b0e30 (implementing game_mode matchmaking)
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
<<<<<<< HEAD
>>>>>>> 8ebad9c (implementing game_mode matchmaking)
=======
  @SubscribeMessage('test')
<<<<<<< HEAD
  test() {
    console.log('test');
>>>>>>> 475422b (game init)
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
>>>>>>> 9c25fe2 (joining rooms)
=======
>>>>>>> 46b0e30 (implementing game_mode matchmaking)
  }
=======
    const user_id = this.gameService.getId(client.id);
  }

  @SubscribeMessage('ingame')
  async manageInGame() {}

  @SubscribeMessage('spectators')
  async manageSpectators() {}
>>>>>>> 0232c7e (game init)
}
