import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { Repository } from 'typeorm';
import { IMembersService } from '../interfaces/IMembersService.interface';
import { IChannelsService } from '../interfaces/IChannelsService.interface';
import { Services } from 'src/utils/consts';
import { find } from 'rxjs';

@Injectable()
export class MembersService implements IMembersService {
  constructor(
    @InjectRepository(UserChannel)
    private readonly userChannelRepository: Repository<UserChannel>,
    @Inject(Services.Channels)
    private readonly channelsService: IChannelsService,
  ) {}

  public async findAll(
    id: number,
    query: PaginateQuery,
  ): Promise<Paginated<UserChannel>> {
    const channel = await this.channelsService.findOne(id);

    if (!channel) throw new NotFoundException('Channel not found');

    const config: PaginateConfig<UserChannel> = {
      searchableColumns: ['user.username', 'user.display_name'],
      select: [
        'id',
        'role',
        'state',
        'timeout',
        'user.id',
        'user.username',
        'user.display_name',
        'user.profile.avatar',
        'user.presence',
      ],
      defaultSortBy: [['user.display_name', 'ASC']],
      sortableColumns: ['user.display_name'],
      relations: ['user', 'user.profile', 'channel'],
      where: { channel: { id } },
    };

    return await paginate<UserChannel>(
      query,
      this.userChannelRepository,
      config,
    );
  }
}
