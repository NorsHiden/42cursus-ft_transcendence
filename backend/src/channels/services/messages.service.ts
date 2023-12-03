import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IMessagesService } from '../interfaces/IMessagesService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/typeorm/message.entity';
import {
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { CreateMessageDetails, JwtPayload, JwtUser } from 'src/utils/types';
import { IChannelsService } from '../interfaces/IChannelsService.interface';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import { Services } from 'src/utils/consts';
import { IMembersService } from '../interfaces/IMembersService.interface';

@Injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(Services.Channels)
    private readonly channelsService: IChannelsService,
    @Inject(Services.Users) private readonly usersService: IUsersService,
    @Inject(Services.Members) private readonly membersService: IMembersService,
  ) {}

  public async create(
    channelId: number,
    details: CreateMessageDetails,
    user: JwtUser,
  ): Promise<Message> {
    try {
      const channel = await this.channelsService.findOne(channelId);

      const author = await this.usersService.getUser(user.sub);

      const member = await this.membersService.findOne(channelId, user.sub);

      if (member.state === 'banned')
        throw new UnauthorizedException('You are banned from this channel');

      if (member.state === 'muted')
        throw new UnauthorizedException('You are muted in this channel');

      const message = this.messageRepository.create({
        ...details,
        author,
        channel,
      });

      const savedMessage = await this.messageRepository.save(message);

      return savedMessage;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(
    channelId: number,
    query: PaginateQuery,
    user: JwtUser,
  ): Promise<Paginated<Message>> {
    try {
      const channel = await this.channelsService.findOne(channelId);

      const member = await this.membersService.findOne(channelId, user.sub);

      if (member.state === 'banned')
        throw new Error('You are banned from this channel');

      const config: PaginateConfig<Message> = {
        sortableColumns: ['createdAt'],
        defaultSortBy: [['createdAt', 'DESC']],
        where: { channel: { id: channel.id } },
        relations: ['author', 'author.profile'],
      };

      return await paginate<Message>(query, this.messageRepository, config);
    } catch (error) {
      throw error;
    }
  }

  private async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.author', 'author')
      .leftJoinAndSelect('author.profile', 'profile')
      .where('message.id = :id', { id })
      .select([
        'message',
        'author.id',
        'author.username',
        'author.display_name',
        'profile.avatar',
      ])
      .getOne();

    if (!message) throw new NotFoundException('Message not found');

    return message;
  }
}
