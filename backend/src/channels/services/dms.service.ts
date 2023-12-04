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

@Injectable()
export class DmsService implements IDmsService {
  constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    @Inject(Services.Users) private readonly usersService: IUsersService,
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

  public async findOne(recipientId: string, user: JwtUser): Promise<Channel> {
    try {
      const brackets = new Brackets((qb) => {
        qb.where(
          'dm.id IN (SELECT uc.channelId FROM userchannel AS uc1 WHERE uc1.userId = :userId)',
          { userId: user.sub },
        );
        qb.andWhere(
          'dm.id IN (SELECT uc.channelId FROM userchannel AS uc2 WHERE uc2.userId = :recipientId)',
          { recipientId },
        );
      });

      const dm = await this.channelRepository
        .createQueryBuilder('dm')
        .leftJoinAndSelect('dm.members', 'members')
        .leftJoinAndSelect('members.user', 'user')
        .leftJoinAndSelect('user.profile', 'profile')
        .where('dm.type = :type', { type: 'dm' })
        .andWhere(brackets)
        .getOne();

      if (!dm) throw new NotFoundException('DM not found');

      return dm;
    } catch (error) {
      throw error;
    }
  }

  private async isExist(recipientId: string, user: JwtUser): Promise<boolean> {
    const brackets = new Brackets((qb) => {
      qb.where('members.user.id = :userId', { userId: user.sub });
      qb.andWhere('members.user.id = :recipientId', { recipientId });
    });

    const dm = await this.channelRepository
      .createQueryBuilder('dm')
      .innerJoinAndSelect('dm.members', 'members')
      .innerJoinAndSelect('members.user', 'user')
      .innerJoinAndSelect('user.profile', 'profile')
      .where('dm.type = :type', { type: 'dm' })
      .andWhere(brackets)
      .getOne();

    if (dm) return true;

    return false;
  }
}
