import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Services } from 'src/utils/consts';
import { IDmsService } from '../interfaces/IDmsService.interface';
import { JwtUser } from 'src/utils/types';
import { Channel } from 'src/typeorm/channel.entity';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import {
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { IAchievementService } from 'src/achievement/interfaces/achievement.interface';

@Injectable()
export class DmsService implements IDmsService {
  constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @Inject(Services.Achievement)
    private readonly achievementsService: IAchievementService,
  ) {}

  public async create(recipientId: string, user: JwtUser): Promise<Channel> {
    try {
      if (recipientId === user.sub)
        throw new NotFoundException('Cannot DM yourself');

      if (await this.isExist(recipientId, user))
        throw new NotFoundException('DM already exist');

      const recipient = await this.usersService.getUser(recipientId);

      const sender = await this.usersService.getUser(user.sub);

      const dm = this.channelRepository.create({
        type: 'dm',
        avatar: null,
        banner: null,
        members: [
          {
            user: sender,
            state: 'active',
          },
          {
            user: recipient,
            state: 'active',
          },
        ],
      });

      const newDm = await this.channelRepository.save(dm);

      if ((await this.countDms(user.sub)) === 1)
        await this.achievementsService.setAchievement(user.sub, 'dm_initiator');

      return newDm;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(
    query: PaginateQuery,
    user: JwtUser,
  ): Promise<Paginated<Channel>> {
    try {
      const brackets = new Brackets((qb) => {
        qb.where('members.user.id = :userId', { userId: user.sub });
        qb.andWhere('channel.type = :type', { type: 'dm' });
      });

      const queryb = this.channelRepository
        .createQueryBuilder('channel')
        .leftJoinAndSelect('channel.members', 'members')
        .leftJoinAndSelect('members.user', 'user')
        .leftJoinAndSelect('user.profile', 'profile')
        .where(brackets);

      const config: PaginateConfig<Channel> = {
        searchableColumns: [
          'members.user.username',
          'members.user.display_name',
        ],
        sortableColumns: ['updatedAt'],
        defaultSortBy: [['updatedAt', 'ASC']],
        relations: ['members', 'members.user', 'members.user.profile'],
      };

      return await paginate<Channel>(query, queryb, config);
    } catch (error) {
      throw error;
    }
  }

  private async isExist(recipientId: string, user: JwtUser): Promise<boolean> {
    const dm = await this.channelRepository
      .createQueryBuilder('c')
      .innerJoin('c.members', 'uc')
      .where('uc.userId IN (:userId, :recipientId)', {
        userId: user.sub,
        recipientId: recipientId,
      })
      .andWhere('c.type = :type', { type: 'dm' })
      .groupBy('c.id')
      .having('COUNT(DISTINCT uc.userId) = 2')
      .getOne();

    if (dm) return true;

    return false;
  }

  private async countDms(userId: string): Promise<number> {
    const count = await this.channelRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.members', 'members')
      .where('members.userId = :userId', { userId })
      .andWhere('channel.type = :type', { type: 'dm' })
      .getCount();

    return count;
  }
}
