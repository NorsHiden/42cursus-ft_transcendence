import { Inject, Injectable } from '@nestjs/common';
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
import { Services } from 'src/utils/consts';
import { Server, Socket } from 'socket.io';
import { InGame } from '../interfaces/InGame.interface';
import { LobbyUser } from '../interfaces/LobbyUser.interface';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { Notification } from 'src/typeorm/notification.entity';

@Injectable()
export class GameService {
  private users: Map<string, number>;
  private lobby: LobbyUser[];
  private ingame: InGame[];

  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
    @Inject(Services.Users)
    private readonly usersService: IUsersService,
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
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

  async getUser(user_id: string) {
    try {
      return await this.usersService.getUser(user_id);
    } catch (e) {
      return null;
    }
  }

  async inviteFriend(client: Socket, target_id: string, game_mode: string) {
    const user = await this.usersService.getFriends(this.users[client.id]);
    const target = await this.getUser(target_id);
    if (!target)
      return {
        action: 'NOT_FOUND',
        message: "Invited User Doesn't Exist",
      };
    // if (!user.friendlist.friends.find((friend) => friend.id == target.id))
    //   return {
    //     action: 'NOT_FOUND',
    //     message: 'Friend Not Found',
    //   };

    // Prepare client lobby information
    const clientLobby = {
      id: client.id,
      socket: client,
      game_mode: game_mode,
      score_points: 0,
      invited: true,
    };
    if (this.lobby.find((user) => user.id == client.id))
      return {
        action: 'ALREADY_INLOBBY',
        message: "You're Already In Lobby",
      };
    this.lobby.push(clientLobby);
    this.notificationService.addNotification(target.id, {
      action: 'GAME_REQUEST',
      recipient: target,
      sender: user,
    } as Notification);
    return {
      action: 'LOBBY',
      message: `Wating For ${target.username}...`,
    };
  }

  cancelLobby(client_id: string) {
    this.lobby = this.lobby.filter((user) => user.id != client_id);
    return {
      action: 'CANCEL',
      message: "You've Been Removed From The Lobby",
    };
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
        game_mode === opponent.game_mode &&
        client.id !== opponent.id &&
        !opponent.invited,
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
      game_mode: game_mode,
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
