import { Inject, Injectable } from '@nestjs/common';
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
import { GameMode, Services, WebSocketEvents } from 'src/utils/consts';
import { Socket, Server } from 'socket.io';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { INotificationService } from 'src/notification/interfaces/notification.interface';
import { WsException } from '@nestjs/websockets';
import { User } from 'src/typeorm/user.entity';
import { Notification } from 'src/typeorm/notification.entity';
import { LobbyUser } from '../types/LobbyUser.type';
import { InGame } from '../types/InGame.type';
import { IMatchHistoryService } from 'src/match_history/interfaces/match_history.interface';
import { MatchHistory } from 'src/typeorm/match_history.entity';
import { IAchievementService } from 'src/achievement/interfaces/achievement.interface';
import { RecentGame } from '../types/RecentGame.type';
import { UserFiler } from '../types/UserFilter.type';
import { Points } from 'src/typeorm/points.entity';

@Injectable()
export class GameService {
  private users: Map<string, string>;
  private lobby: LobbyUser[];
  private ingame: InGame[];
  private filter: Map<string, UserFiler>;

  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
    @Inject(Services.Users)
    private readonly usersService: IUsersService,
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
    @Inject(Services.Achievement)
    private readonly achievementService: IAchievementService,
    @Inject(Services.MatchHistory)
    private readonly matchHistoryService: IMatchHistoryService,
  ) {
    this.users = new Map();
    this.lobby = [];
    this.ingame = [];
    this.filter = new Map();
  }

  // Asynchronously handle a new client connection
  async handleConnection(client: Socket): Promise<void> {
    const id = await this.gatewaysService.getUserId(client);
    if (!id) return;

    this.users.set(client.id, id.toString());

    return Promise.resolve();
  }

  // Asynchronously handle a client disconnection
  async closeConnection(client: Socket, server: Server): Promise<void> {
    this.lobby = this.lobby.filter((player) => player.socket.id != client.id);
    this.users.delete(client.id);
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
      throw new WsException('User Not Found');
    }
  }

  findOpponent(
    target_id: string,
    action: string,
    game_mode: string,
  ): LobbyUser {
    if (action == 'ACCEPT')
      return this.lobby.find((user) => user.id == target_id && user.invitation);
    if (action == 'SEARCH')
      return this.lobby.find((user) => user.game_mode == game_mode && !user.invitation);
    return null;
  }

  async leaveLobby(client: Socket): Promise<void> {
    this.lobby = this.lobby.filter((user) => user.socket.id != client.id);
    client.emit(WebSocketEvents.Lobby, {
      message: "You've left the lobby",
    });
  }

  async joinLobby(
    client: Socket,
    action: string,
    target_id: string,
    game_mode: string,
  ): Promise<void> {
    this.lobby.push({
      id: this.users.get(client.id),
      socket: client,
      game_mode: game_mode,
      invitation: action == 'INVITE' ? true : false,
    });
    if (action == 'INVITE')
      await this.notificationService.addNotification(target_id, {
        recipient: await this.getUser(target_id),
        sender: await this.getUser(this.users.get(client.id)),
        action: 'GAME_REQUEST',
        description: `Invited you to a ${game_mode} game.`,
        status: 'pending',
      } as Notification);
    client.emit(WebSocketEvents.Lobby, {
      state: 'WAITING',
      message: 'Waiting for the opponent...',
    });
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
  ): Promise<void> {
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
      game_mode: opponent.game_mode,
      spectators: [],
      count: 0,
      round: 0,
      interval_id: undefined,
      is_reversed: false,
      game_data: await this.initGame(opponent, clientLobby),
    };
    this.ingame.push(createdGame);
    this.lobby = this.lobby.filter(
      (user) =>
        user.socket.id != client.id && user.socket.id != opponent.socket.id,
    );
    createdGame.interval_id = setInterval(
      async () => await this.startGameLoop(server, createdGame),
      1000 / 60,
    );
    opponent.socket.emit(WebSocketEvents.Lobby, {
      state: 'MATCH_FOUND',
      game_id: `${opponent.socket.id}${client.id}`,
      message: 'Game has been created.',
    });
    client.emit(WebSocketEvents.Lobby, {
      state: 'MATCH_FOUND',
      game_id: `${opponent.socket.id}${client.id}`,
      message: 'Game has been created.',
    });
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
      action != 'CANCEL' &&
      game_mode != GameMode.REGULAR &&
      game_mode != GameMode.VANISH &&
      game_mode != GameMode.CURSED &&
      game_mode != GameMode.GOLD_RUSH
    ) {
      throw new WsException('Invalid Action || game_mode');
    }

    if (action == 'CANCEL') return this.leaveLobby(client);

    const user = await this.getUser(this.users.get(client.id));

    if (this.lobby.find((lobbyUser) => lobbyUser.id == user.id))
      throw new WsException('Already In Lobby');

    const game = this.ingame.find(
      (game) =>
        (game.home_player.id == user.id || game.away_player.id == user.id),
    );

    if (game) {
      client.emit(WebSocketEvents.Lobby, {
        state: 'MATCH_FOUND',
        game_id: game.id,
        message: 'Game has been found.',
      });
      return;
    }

    if (game_mode == GameMode.GOLD_RUSH && (!user.points.length || user.points[0].value < 300))
      throw new WsException('Not Enough Points');

    const opponent = this.findOpponent(target_id, action, game_mode);

    if (!opponent && action != 'ACCEPT')
      return await this.joinLobby(client, action, target_id, game_mode);

    if (!opponent && action == 'ACCEPT')
      throw new WsException("Inviter doesn't exist");

    return await this.createGame(client, server, opponent);
  }

  async joinGame(
    client: Socket,
    server: Server,
    inGameIndex: number,
  ): Promise<void> {
    if (this.users.get(client.id) === this.ingame[inGameIndex].home_player.id) {
      await this.usersService.setPresence(
        this.ingame[inGameIndex].home_player.id,
        'ingame',
      );
      this.ingame[inGameIndex].game_data.home.is_ready = true;
    } else if (
      this.users.get(client.id) === this.ingame[inGameIndex].away_player.id
    ) {
      await this.usersService.setPresence(
        this.ingame[inGameIndex].away_player.id,
        'ingame',
      );
      this.ingame[inGameIndex].game_data.away.is_ready = true;
    } else {
      const spectator = await this.usersService.getUser(
        this.users.get(client.id),
      );
      if (
        !this.ingame[inGameIndex].spectators.find(
          (spec) => spec.id == spectator.id,
        )
      )
        this.ingame[inGameIndex].spectators.push({
          id: spectator.id,
          display_name: spectator.display_name,
          avatar: spectator.profile.avatar,
        });
      server.in(this.ingame[inGameIndex].id).emit('spectators', {
        spectators: this.ingame[inGameIndex].spectators,
      });
      client.on('disconnect', () => {
        this.ingame[inGameIndex].spectators = this.ingame[
          inGameIndex
        ]?.spectators.filter((spec) => spec.id != spectator.id);
        server.in(this.ingame[inGameIndex].id).emit('spectators', {
          spectators: this.ingame[inGameIndex].spectators,
        }) || [];
      });
    }

    client.join(this.ingame[inGameIndex].id);
  }

  async manageInGame(
    client: Socket,
    server: Server,
    action: string,
    game_id: string,
  ) {
    const inGameIndex = this.ingame.findIndex((game) => game.id == game_id);
    if (inGameIndex < 0) throw new WsException('Game Not Found');

    if (action == 'JOIN')
      return await this.joinGame(client, server, inGameIndex);

    const updatePlayerPosition = (player: { y: number }, action: string) => {
      if (this.ingame[inGameIndex].is_reversed) {
        if (action === 'UP' && player.y < 80) player.y += 5;
        else if (action === 'DOWN' && player.y > 0) player.y -= 5;
      } else {
        if (action === 'UP' && player.y > 0) player.y -= 5;
        else if (action === 'DOWN' && player.y < 80) player.y += 5;
      }
    };

    if (this.users.get(client.id) === this.ingame[inGameIndex].home_player.id)
      updatePlayerPosition(this.ingame[inGameIndex].game_data.home, action);
    if (this.users.get(client.id) === this.ingame[inGameIndex].away_player.id)
      updatePlayerPosition(this.ingame[inGameIndex].game_data.away, action);
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

    if (ball.x <= 0) score.away++;
    else if (ball.x >= 100) score.home++;

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
    let winner_points = winner.points.length > 0 ? winner.points[0].value : 0;
    let loser_points = loser.points.length > 0 ? loser.points[0].value : 0;
    if (ingame.game_mode == GameMode.REGULAR) winner_points += 50;
    else if (ingame.game_mode == GameMode.VANISH) winner_points += 70;
    else if (ingame.game_mode == GameMode.CURSED) winner_points += 100;
    else if (ingame.game_mode == GameMode.GOLD_RUSH) {
      winner_points += 400;
      loser_points -= 300;
    }
    winner.points.push({
      value: winner_points,
    } as Points);
    loser.points.push({
      value: loser_points,
    } as Points);
    await this.usersService.setUser(winner);
    await this.usersService.setUser(loser);
    await this.matchHistoryService.setMatch({
      home_player: home,
      away_player: away,
      home_score: ingame.game_data.score.home,
      away_score: ingame.game_data.score.away,
      win_gap: Math.abs(
        ingame.game_data.score.home - ingame.game_data.score.away,
      ),
      created_at: ingame.created_at,
      ended_at: new Date(),
      game_mode: ingame.game_mode,
    } as MatchHistory);
    clearInterval(ingame.interval_id);
    await this.achievementService.setAchievement(winner.id, 'victory_lap');
    await this.achievementService.setAchievement(winner.id, 'game_on');
    await this.achievementService.setAchievement(loser.id, 'game_on');
    await this.usersService.setPresence(winner.id, 'online');
    await this.usersService.setPresence(loser.id, 'online');
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

  getDurationInMinutesSeconds(created_at: Date, ended_at: Date): string {
    const diffInMilliseconds = ended_at.getTime() - created_at.getTime();
    const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  }

  async getRecentGames(client: Socket): Promise<RecentGame[]> {
    const filter = this.filter.get(client.id);
    if (!filter) return [];
    const recentMatches = this.ingame.map((game) => {
      if (
        (filter.game_mode != 'ALL' && filter.game_mode != game.game_mode) ||
        filter.live == 'LIVE'
      )
        return null;
      return {
        isLive: true,
        gamemode: game.game_mode,
        time: this.getDurationInMinutesSeconds(
          game.created_at,
          new Date(Date.now()),
        ),
        host: {
          id: game.home_player.id,
          score: game.game_data.score.home,
          username: game.game_data.home.display_name,
          name: game.game_data.home.display_name,
          avatar: game.game_data.home.avatar,
        },
        opponent: {
          id: game.away_player.id,
          score: game.game_data.score.away,
          username: game.game_data.away.display_name,
          name: game.game_data.away.display_name,
          avatar: game.game_data.away.avatar,
        },
      } as RecentGame;
    });
    if (recentMatches.length < 6 && filter.live != 'LIVE') {
      const matches = await this.matchHistoryService.getMatches(
        0,
        6 - recentMatches.length,
        filter.game_mode,
      );
      recentMatches.push(
        ...matches.map(
          (match) =>
            ({
              isLive: false,
              gamemode: match.game_mode,
              time: this.getDurationInMinutesSeconds(
                match.created_at,
                match.ended_at,
              ),
              host: {
                id: match.home_player.id,
                score: match.home_score,
                username: match.home_player.display_name,
                name: match.home_player.display_name,
                avatar: match.home_player.profile.avatar,
              },
              opponent: {
                id: match.away_player.id,
                score: match.away_score,
                username: match.away_player.display_name,
                name: match.away_player.display_name,
                avatar: match.away_player.profile.avatar,
              },
            } as RecentGame),
        ),
      );
    }
    return recentMatches;
  }

  getLiveGames(
    client: Socket,
    game_mode: UserFiler['game_mode'],
    live: UserFiler['live'],
  ): void {
    const filter = this.filter.get(client.id);
    if (filter) {
      this.filter.set(client.id, { game_mode, live });
      return;
    }
    this.filter.set(client.id, { game_mode, live });
    const interval_id = setInterval(
      async () => client.emit('live', await this.getRecentGames(client)),
      1000,
    );
    client.on('disconnect', () => {
      this.filter.delete(client.id);
      clearInterval(interval_id);
    });
  }
}
