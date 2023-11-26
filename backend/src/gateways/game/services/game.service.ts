import { Inject, Injectable } from '@nestjs/common';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
<<<<<<< HEAD
import { Services, WebSocketEvents } from 'src/utils/consts';
import { Socket, Server } from 'socket.io';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { WsException } from '@nestjs/websockets';
import { User } from 'src/typeorm/user.entity';
import { Notification } from 'src/typeorm/notification.entity';
import { LobbyUser } from '../types/LobbyUser.type';
import { InGame } from '../types/InGame.type';
<<<<<<< HEAD
import { GameMode } from '../types/GameMode.type';
import { IMatchHistoryService } from 'src/match_history/interfaces/match_history.interface';
import { MatchHistory } from 'src/typeorm/match_history.entity';
import { IAchievementService } from 'src/achievement/interfaces/achievement.interface';
=======
import { Services } from 'src/utils/consts';
import { Socket, Server } from 'socket.io';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
<<<<<<< HEAD
import { Notification } from 'src/typeorm/notification.entity';
>>>>>>> fce8b4b (Invitation Process)
=======
import { WsException } from '@nestjs/websockets';
import { User } from 'src/typeorm/user.entity';
<<<<<<< HEAD
>>>>>>> 0232c7e (game init)
=======
import { Notification } from 'src/typeorm/notification.entity';
<<<<<<< HEAD
>>>>>>> 964df2d (lobby management and invite has been implemented)
=======
import { LobbyUser } from '../types/LobbyUser.type';
import { InGame } from '../types/InGame.type';
import { GameData } from '../types/GameData.type';
>>>>>>> d68e69d (game mechanics)
=======
>>>>>>> 5281f6a (game mechanics)

@Injectable()
export class GameService {
  private users: Map<string, string>;
  private lobby: LobbyUser[];
  private ingame: InGame[];

  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
    @Inject(Services.Users)
    private readonly usersService: IUsersService,
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
<<<<<<< HEAD
    @Inject(Services.Achievement)
    private readonly achievementService: IAchievementService,
    @Inject(Services.MatchHistory)
    private readonly matchHistoryService: IMatchHistoryService,
=======
>>>>>>> fce8b4b (Invitation Process)
  ) {
    this.users = new Map();
    this.lobby = [];
    this.ingame = [];
  }

  // Asynchronously handle a new client connection
  async handleConnection(client: Socket): Promise<void> {
    const id = await this.gatewaysService.getUserId(client, []);
    if (!id) return;

<<<<<<< HEAD
<<<<<<< HEAD
    this.users.set(client.id, id.toString());
=======
    this.users.set(client.id, id);
>>>>>>> 0232c7e (game init)
=======
    this.users.set(client.id, id.toString());
>>>>>>> 964df2d (lobby management and invite has been implemented)

    return Promise.resolve();
  }

  // Asynchronously handle a client disconnection
  async closeConnection(client: Socket): Promise<void> {
<<<<<<< HEAD
    this.lobby = this.lobby.filter((player) => player.socket.id != client.id);
<<<<<<< HEAD
<<<<<<< HEAD
    this.ingame.forEach((game) => {
      const specIndex = game.spectators.findIndex(
        (spec) => spec.id == this.users.get(client.id),
      );
      if (specIndex > -1)
        game.spectators = game.spectators.splice(specIndex, 1);
    });
    this.users.delete(client.id);
=======
    const interval_id = this.ingame.find(
      (game) => game.home_player.socket.id == client.id,
    )?.interval_id;
    if (interval_id) clearInterval(interval_id);
    this.ingame = [];
>>>>>>> d68e69d (game mechanics)
=======
>>>>>>> bb4c479 (before game)
    client.disconnect();
  }
  getId(client_id: string): string {
    if (!this.users.has(client_id)) throw new WsException('Client Not Found');
    return this.users[client_id];
  }

  async getUser(user_id: string): Promise<User> {
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
=======
    this.users.delete(client.id);

    this.lobby = this.lobby.filter((player) => player.socket.id != client.id);
    client.disconnect();
  }
  getId(client_id: string): string {
    if (!this.users.has(client_id)) throw new WsException('Client Not Found');
    return this.users[client_id];
>>>>>>> 0232c7e (game init)
  }

  async getUser(user_id: string): Promise<User> {
    try {
      return await this.usersService.getUser(user_id);
    } catch (e) {
      throw new WsException('User Not Found');
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD

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

  countdown(server: Server, ingame: InGame) {
    if (ingame.game_data.ready_timer > 0 && ingame.count <= 60 * 3) {
      ingame.game_data.ready_timer = 3 - Math.round(ingame.count / 60);
      server.in(ingame.id).emit(ingame.id, ingame.game_data);
      return true;
    }
    return false;
  }

  async startGameLoop(server: Server, ingame: InGame): Promise<void> {
    if (
      !ingame.game_data.home.is_ready ||
      !ingame.game_data.away.is_ready ||
      ingame.game_data.is_finished
    )
      return;
    ingame.count += 1;
    if (this.countdown(server, ingame)) return;
    this.startRound(ingame);
    if (await this.endGame(server, ingame)) return;
    server.in(ingame.id).emit(ingame.id, ingame.game_data);
  }

  startRound(ingame: InGame) {
    const ball = ingame.game_data.ball;
    const home = ingame.game_data.home;
    const away = ingame.game_data.away;

    ball.x += ball.speed.x;
    ball.y += ball.speed.y;

    // Reflect the ball when hitting the top or bottom boundaries
    if (ball.y + ball.radius >= 100 || ball.y - ball.radius <= 0)
      ball.speed.y =
        ball.y - ball.radius <= 0
          ? Math.abs(ball.speed.y)
          : -Math.abs(ball.speed.y);

    // Check collision with the home paddle
    const hitsHomePaddle =
      ball.x - ball.radius / 2 <= 0 + home.width &&
      ball.y <= home.y + home.height &&
      ball.y + ball.radius >= home.y;

    // Check collision with the away paddle
    const hitsAwayPaddle =
      ball.x + ball.radius / 2 >= 100 - away.width &&
      ball.y <= away.y + away.height &&
      ball.y + ball.radius >= away.y;

    // Reflect the ball when hitting a paddle
    if (hitsHomePaddle || hitsAwayPaddle) {
      ball.speed.x = hitsHomePaddle
        ? Math.abs(ball.speed.x)
        : -Math.abs(ball.speed.x);
      // Calculate the relative position of the ball on the paddle
      const relativeY =
        (ball.y - (hitsHomePaddle ? home.y : away.y)) / home.height;

      ball.speed.y = relativeY < 0.5 ? -(1 - relativeY) : (relativeY - 0.5) * 2;
    }

    if (ingame.game_data.mode === GameMode.CURSED) {
      if (!(ingame.count % (60 * 7)) && !ingame.game_data.will_reverse) {
        ingame.game_data.will_reverse = true;
        setTimeout(() => {
          if (!ingame.game_data.will_reverse) return;
          ingame.game_data.will_reverse = false;
          ingame.is_reversed = !ingame.is_reversed;
        }, 3000);
      }
    }

    if (
      ingame.game_mode === GameMode.VANISH &&
      !ingame.game_data.ball.is_hidden
    ) {
      if (Math.random() <= 0.005) {
        ingame.game_data.ball.is_hidden = true;
        setTimeout(() => (ingame.game_data.ball.is_hidden = false), 700);
      }
    }

    // Clear round when no one hits the ball
    if (ball.x <= 0 || ball.x >= 100) this.clearRound(ingame);
  }

  clearRound(ingame: InGame) {
    const ball = ingame.game_data.ball;
    const score = ingame.game_data.score;

    if (ball.x <= 0) score.home++;
    else if (ball.x >= 100) score.away++;

    if (score.home == 5 || score.away == 5) ingame.game_data.is_finished = true;
    ball.x = 50;
    ball.y = 50;
    ball.speed.x = Math.random() >= 0.5 ? 0.7 : -0.7;
    ball.speed.y = Math.random();
    ingame.count = 0;
    ingame.round++;
    ingame.game_data.ready_timer = 3;
    ingame.game_data.will_reverse = false;
    ingame.is_reversed = false;
    ingame.game_data.ball.is_hidden = false;
  }

  async endGame(server: Server, ingame: InGame): Promise<boolean> {
    if (!ingame.game_data.is_finished) return false;
    server.in(ingame.id).emit(ingame.id, ingame.game_data);
    const home = await this.usersService.getUser(ingame.home_player.id);
    const away = await this.usersService.getUser(ingame.away_player.id);
    const winner =
      ingame.game_data.score.home > ingame.game_data.score.away ? home : away;
    const loser =
      ingame.game_data.score.home < ingame.game_data.score.away ? home : away;
    winner.wins++;
    loser.loses++;
    if (ingame.game_mode == GameMode.REGULAR) winner.points += 50;
    else if (ingame.game_mode == GameMode.VANISH) winner.points += 70;
    else if (ingame.game_mode == GameMode.CURSED) winner.points += 100;
    else if (ingame.game_mode == GameMode.GOLD_RUSH) {
      winner.points += 400;
      loser.points -= 300;
    }
    await this.usersService.setUser(winner);
    await this.usersService.setUser(loser);
    await this.matchHistoryService.setMatch({
      home_player: home,
      away_player: away,
      home_score: ingame.game_data.score.home,
      away_score: ingame.game_data.score.away,
      created_at: ingame.created_at,
      ended_at: new Date(),
      game_mode: ingame.game_mode,
    } as MatchHistory);
    clearInterval(ingame.interval_id);
    await this.achievementService.setAchievement(winner.id, 'victory_lap');
    await this.achievementService.setAchievement(winner.id, 'game_on');
    await this.achievementService.setAchievement(loser.id, 'game_on');
    if (ingame.home_player.id == loser.id && !ingame.game_data.score.home)
      await this.achievementService.setAchievement(
        winner.id,
        'unbeatable_defender',
      );
    if (ingame.away_player.id == loser.id && !ingame.game_data.score.away)
      await this.achievementService.setAchievement(
        winner.id,
        'unbeatable_defender',
      );
    if (winner.wins >= 10)
      await this.achievementService.setAchievement(winner.id, 'pong_master');
    this.ingame = this.ingame.filter((game) => game.id != ingame.id);
    return true;
  }

  getSpectators(client: Socket, game_id: string): void {
    const ingame = this.ingame.find((game) => game.id == game_id);
    if (!ingame) throw new WsException('Game Not Found');
    client.emit('spectators', {
      spectators: ingame.spectators,
    });
    return;
  }
=======
=======
>>>>>>> 475422b (game init)

@Injectable()
export class GameService {
  constructor() {}
<<<<<<< HEAD
>>>>>>> ccf63eb (game init)
=======
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
=======
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
import { Services } from 'src/utils/consts';
import { Server, Socket } from 'socket.io';
import { InGame } from '../interfaces/InGame.interface';
import { LobbyUser } from '../interfaces/LobbyUser.interface';

@Injectable()
export class GameService {
<<<<<<< HEAD
  private users: Map<string, number> = new Map();
>>>>>>> 9c25fe2 (joining rooms)
=======
  private users: Map<string, number>;
  private lobby: LobbyUser[];
  private ingame: InGame[];
>>>>>>> 46b0e30 (implementing game_mode matchmaking)

  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 46b0e30 (implementing game_mode matchmaking)
  ) {
    this.users = new Map();
    this.lobby = [];
    this.ingame = [];
  }
<<<<<<< HEAD

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

<<<<<<< HEAD
  // Get the user ID associated with a given client ID
  getId(id: string): number {
    return this.users.get(id);
  }
<<<<<<< HEAD
>>>>>>> eeab70f (joining rooms)
=======

=======
>>>>>>> f211829 (gamemode)
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
>>>>>>> 8ebad9c (implementing game_mode matchmaking)
=======
>>>>>>> 475422b (game init)
=======
  ) {}
=======
>>>>>>> 46b0e30 (implementing game_mode matchmaking)

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

<<<<<<< HEAD
  // Get the user ID associated with a given client ID
  getId(id: string): number {
    return this.users.get(id);
  }
<<<<<<< HEAD
>>>>>>> 9c25fe2 (joining rooms)
=======

=======
>>>>>>> 41fa70f (gamemode)
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
>>>>>>> 46b0e30 (implementing game_mode matchmaking)
=======
>>>>>>> 0232c7e (game init)
=======

  findOpponent(
    target_id: string,
    action: string,
    game_mode: string,
  ): LobbyUser {
    if (action == 'ACCEPT')
      return this.lobby.find((user) => user.id == target_id && user.invitation);
    if (action == 'SEARCH')
      return this.lobby.find((user) => user.game_mode == game_mode);
    return null;
  }

  async leaveLobby(client: Socket): Promise<object> {
    this.lobby = this.lobby.filter((user) => user.socket.id != client.id);
    return {
      message: "You've left the lobby",
    };
  }

  async joinLobby(
    client: Socket,
    action: string,
    target_id: string,
    game_mode: string,
  ): Promise<object> {
    this.lobby.push({
      id: this.users.get(client.id),
      socket: client,
      game_mode: game_mode,
      invitation: action == 'INVITE' ? true : false,
    });
    if (action == 'INVITE')
      await this.notificationService.addNotification(target_id, {
        recipient: await this.getUser(this.users.get(client.id)),
        sender: await this.getUser(target_id),
        action: 'GAME_REQUEST',
      } as Notification);
    return {
      state: 'WAITING',
      message: 'Waiting for the opponent...',
    };
  }

  async initGame(home: LobbyUser, away: LobbyUser) {
    const home_user = await this.usersService.getUser(home.id);
    const away_user = await this.usersService.getUser(away.id);

    return {
      home: {
        avatar: home_user.profile.avatar,
        display_name: home_user.display_name,
        width: 2,
        height: 20,
        x: 0,
        y: 50 - 20 / 2, // y_pos - (height/2)
        is_ready: false,
      },
      away: {
        avatar: away_user.profile.avatar,
        display_name: away_user.display_name,
        width: 2,
        height: 20,
        x: 98, // x_pos - width
        y: 50 - 20 / 2, // y_pos - (height/2)
        is_ready: false,
      },
      ball: {
        is_hidden: false,
        x: 50,
        y: 50,
        speed: {
          x: Math.random() >= 0.5 ? 0.7 : -0.7,
          y: Math.random(),
        },
        radius: 2,
      },
      mode: home.game_mode,
      score: {
        home: 0,
        away: 0,
      },
      will_reverse: false,
      ready_timer: 3,
      is_finished: false,
    };
  }

  async createGame(
    client: Socket,
    server: Server,
    opponent: LobbyUser,
  ): Promise<object> {
    const clientLobby = {
      id: this.users.get(client.id),
      socket: client,
      game_mode: opponent.game_mode,
      invitation: false,
    };
    const createdGame: InGame = {
      id: `${opponent.socket.id}${client.id}`,
      home_player: opponent,
      away_player: clientLobby,
      created_at: new Date(),
      end_at: undefined,
      game_mode: opponent.game_mode,
      spectators: [],
      count: 0,
      round: 0,
      game_data: await this.initGame(opponent, clientLobby),
    };
    this.ingame.push(createdGame);
    this.lobby = this.lobby.filter(
      (user) =>
        user.socket.id != client.id && user.socket.id != opponent.socket.id,
    );
    createdGame.interval_id = setInterval(
      () => this.startGameLoop(server, createdGame),
      1000 / 60,
    );
    opponent.socket.emit('lobby', {
      state: 'MATCH_FOUND',
      game_id: `${opponent.socket.id}${client.id}`,
      message: 'Game has been created.',
    });
    return {
      state: 'MATCH_FOUND',
      game_id: `${opponent.socket.id}${client.id}`,
      message: 'Game has been created.',
    };
  }

  async manageLobby(
    client: Socket,
    server: Server,
    action: string,
    target_id: string,
    game_mode: string,
  ) {
    if (
      action != 'SEARCH' &&
      action != 'INVITE' &&
      action != 'ACCEPT' &&
      action != 'CANCEL'
    )
      throw new WsException('Action Not Found');
    if (action == 'CANCEL') return this.leaveLobby(client);
    const opponent = this.findOpponent(target_id, action, game_mode);
    if (!opponent && action != 'ACCEPT')
      return await this.joinLobby(client, action, target_id, game_mode);
    if (!opponent && action == 'ACCEPT')
      throw new WsException("Inviter doesn't exist");
    return await this.createGame(client, server, opponent);
  }

  async joinGame(client: Socket, inGameIndex: number): Promise<void> {
    if (this.users.get(client.id) === this.ingame[inGameIndex].home_player.id)
      this.ingame[inGameIndex].game_data.home.is_ready = true;
    if (this.users.get(client.id) === this.ingame[inGameIndex].away_player.id)
      this.ingame[inGameIndex].game_data.away.is_ready = true;
    else {
      const spectator = await this.usersService.getUser(
        this.users.get(client.id),
      );
      this.ingame[inGameIndex].spectators.push({
        id: spectator.id,
        display_name: spectator.display_name,
        avatar: spectator.profile.avatar,
      });
    }
    client.join(this.ingame[inGameIndex].id);
  }

  async manageInGame(client: Socket, action: string, game_id: string) {
    const inGameIndex = this.ingame.findIndex((game) => game.id == game_id);
    if (inGameIndex < 0) throw new WsException('Game Not Found');

    if (action == 'JOIN') return await this.joinGame(client, inGameIndex);

    const updatePlayerPosition = (player: { y: number }, action: string) => {
      if (action === 'UP' && player.y > 0) player.y -= 2;
      else if (action === 'DOWN' && player.y < 80) player.y += 2;
    };

    if (this.users.get(client.id) === this.ingame[inGameIndex].home_player.id)
      updatePlayerPosition(this.ingame[inGameIndex].game_data.home, action);
    if (this.users.get(client.id) === this.ingame[inGameIndex].away_player.id)
      updatePlayerPosition(this.ingame[inGameIndex].game_data.away, action);
  }
<<<<<<< HEAD
>>>>>>> 964df2d (lobby management and invite has been implemented)
=======

  countdown(server: Server, ingame: InGame) {
    if (ingame.game_data.ready_timer > 0 && ingame.count <= 60 * 3) {
      ingame.game_data.ready_timer = 3 - Math.round(ingame.count / 60);
      server.in(ingame.id).emit(ingame.id, ingame.game_data);
      return true;
    }
    return false;
  }

  startGameLoop(server: Server, ingame: InGame) {
    if (!ingame.game_data.home.is_ready || !ingame.game_data.away.is_ready)
      return;
    ingame.count += 1;
    if (this.countdown(server, ingame)) return;
    this.startRound(ingame);
    if (this.endGame(server, ingame)) return;
    server.in(ingame.id).emit(ingame.id, ingame.game_data);
  }

  startRound(ingame: InGame) {
    const ball = ingame.game_data.ball;
    const home = ingame.game_data.home;
    const away = ingame.game_data.away;

    ball.x += ball.speed.x;
    ball.y += ball.speed.y;

    // Reflect the ball when hitting the top or bottom boundaries
    if (ball.y + ball.radius >= 100 || ball.y - ball.radius <= 0)
      ball.speed.y =
        ball.y - ball.radius <= 0
          ? Math.abs(ball.speed.y)
          : -Math.abs(ball.speed.y);

    // Check collision with the home paddle
    const hitsHomePaddle =
      ball.x - ball.radius / 2 <= 0 + home.width &&
      ball.y <= home.y + home.height &&
      ball.y + ball.radius >= home.y;

    // Check collision with the away paddle
    const hitsAwayPaddle =
      ball.x + ball.radius / 2 >= 100 - away.width &&
      ball.y <= away.y + away.height &&
      ball.y + ball.radius >= away.y;

    // Reflect the ball when hitting a paddle
    if (hitsHomePaddle || hitsAwayPaddle) {
      ball.speed.x = hitsHomePaddle
        ? Math.abs(ball.speed.x)
        : -Math.abs(ball.speed.x);
      // Calculate the relative position of the ball on the paddle
      const relativeY =
        (ball.y - (hitsHomePaddle ? home.y : away.y)) / home.height;

      ball.speed.y = relativeY < 0.5 ? -(1 - relativeY) : (relativeY - 0.5) * 2;
    }
    // Clear round when no one hits the ball
    if (ball.x <= 0 || ball.x >= 100) this.clearRound(ingame);
  }

  clearRound(ingame: InGame) {
    const ball = ingame.game_data.ball;
    const score = ingame.game_data.score;

    if (ball.x <= 0) score.home++;
    else if (ball.x >= 100) score.away++;

    if (score.home == 5 || score.away == 5) ingame.game_data.is_finished = true;
    ball.x = 50;
    ball.y = 50;
    ball.speed.x = Math.random() >= 0.5 ? 0.7 : -0.7;
    ball.speed.y = Math.random();
    ingame.count = 0;
    ingame.round++;
    ingame.game_data.ready_timer = 3;
  }

  endGame(server: Server, ingame: InGame): boolean {
    if (!ingame.game_data.is_finished) return false;
    server.in(ingame.id).emit(ingame.id, ingame.game_data);
    clearInterval(ingame.interval_id);
    this.ingame = this.ingame.filter((game) => game.id != ingame.id);
  }
>>>>>>> 5281f6a (game mechanics)
}
