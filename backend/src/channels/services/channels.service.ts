import { IChannelsService } from '../interfaces/IChannelsService.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateChannelDto } from '../dto/update-channel.dto';
import { CreateChannelArgs } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { Channel } from 'src/typeorm/channel.entity';
import { Services } from 'src/utils/consts';
import { IUsersService } from 'src/users/interfaces/IUsersService.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(UserChannel)
    private userChannelRepository: Repository<UserChannel>,
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    @Inject(Services.Users) private readonly usersService: IUsersService,
  ) {}

  public async create(
    args: CreateChannelArgs,
    userId: string,
  ): Promise<Channel> {
    const owner = await this.usersService.getUser(userId);
    const hashedPassword = args.password
      ? await this.hashPassword(args.password)
      : null;
    const newChannel = this.channelRepository.create({
      name: args.name,
      type: args.type,
      protected: args.password ? true : false,
      password: hashedPassword,
    });
    const channel = await this.channelRepository.save(newChannel);

    const userChannel = this.userChannelRepository.create({
      role: 'owner',
      member: owner,
      channel: channel,
    });
    this.userChannelRepository.save(userChannel);

    return channel;
  }

  public findAll() {
    return `This action returns all channels`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  public update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  public remove(id: number) {
    return `This action removes a #${id} channel`;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
