import { Inject, Injectable } from '@nestjs/common';
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
import { Services } from 'src/utils/consts';
import { Server, Socket } from 'socket.io';
import { InGame } from '../interfaces/InGame.interface';
import { LobbyUser } from '../interfaces/LobbyUser.interface';

@Injectable()
export class GameService {
  private users: Map<string, number>;
  private lobby: LobbyUser[];
  private ingame: InGame[];

  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
  ) {
    this.users = new Map();
    this.lobby = [];
    this.ingame = [];
  }

  // Asynchronously handle a new client connection
  async handleConnection(client: Socket): Promise<void> {
    // Get the user ID associated with the client from the gateways service
    const id = await this.gatewaysService.getUserId(client, []);

    // Store the user ID in the 'users' map with the client ID as the key
    this.users.set(client.id, id);

    // Log that a client has connected
    console.log(`client ${client.id} has connected.`);

    // Resolve the promise to complete the connection handling
    return Promise.resolve();
  }

  // Asynchronously handle a client disconnection
  async closeConnection(client: Socket): Promise<void> {
    // Remove the user from the 'users' map
    this.users.delete(client.id);

    // Remove the client from the lobby and disconnect it
    this.lobby = this.lobby.filter((player) => player.id != client.id);
    client.disconnect();

    // Log that a client has disconnected
    console.log(`client ${client.id} has disconnected.`);
  }

  // Get the user ID associated with a given client ID
  getId(id: string): number {
    return this.users.get(id);
  }

  // Find a lobby for a client based on game mode
  findLobby(client: Socket, server: Server, game_mode: string) {
    // Check if the client is already in a game
    if (
      this.ingame.find(
        (game) =>
          game.home_player.id == client.id || game.away_player.id == client.id,
      )
    )
      return {
        action: 'ALREADY_INGAME',
        message: 'You are already in a game.',
      };

    // Find an opponent in the lobby with the same game mode
    const opponent = this.lobby.find(
      (opponent) =>
        game_mode === opponent.game_mode && client.id !== opponent.id,
    );

    // Prepare client lobby information
    const clientLobby = {
      id: client.id,
      socket: client,
      game_mode: game_mode,
      score_points: 0,
    };

    // If no opponent found, add the client to the lobby
    if (!opponent) {
      this.lobby.push(clientLobby);
      return {
        action: 'LOBBY',
        message: 'Looking for an opponent...',
      };
    }

    // If opponent found, create a new game and remove both players from the lobby
    const createdGame: InGame = {
      id: `${opponent.id}${client.id}`,
      home_player: opponent,
      away_player: clientLobby,
      spectators: [],
      game_mode: 'N/A',
      created_at: new Date(),
      end_at: undefined,
    };
    this.ingame.push(createdGame);
    client.join(createdGame.id);
    opponent.socket.join(createdGame.id);

    // Notify the opponent about the match found
    const matchFound = {
      action: 'MATCH_FOUND',
      message: 'Match Found',
      game_id: createdGame.id,
    };
    server.to(opponent.socket.id).emit('lobby', matchFound);

    // Remove players from the lobby
    this.lobby = this.lobby.filter((user) => user.id != opponent.id);

    // Return match details
    return matchFound;
  }

  // Allow a client to spectate an existing game
  spectateGame(client: Socket, server: Server, game_id: string) {
    // Find the index of the game in the 'ingame' array
    const gameIndex = this.ingame.findIndex((game) => game.id == game_id);

    // If the game is not found, return an error response
    if (gameIndex < 0)
      return {
        action: 'NOT_FOUND',
        message: 'Game Not Found.',
      };

    // Add the client as a spectator to the game and join the client to the game room
    this.ingame[gameIndex].spectators.push({
      id: client.id,
    });
    client.join(game_id);

    // Return a response indicating successful spectating
    return {
      action: 'SPECTATE',
      message: 'Match Found',
      game_id: game_id,
    };
  }
}
