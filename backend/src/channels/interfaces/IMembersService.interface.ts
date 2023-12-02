import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { UserChannel } from 'src/typeorm/userchannel.entity';
import { JwtUser } from 'src/utils/types';

export interface IMembersService {
  findAll(
    channelId: number,
    query: PaginateQuery,
  ): Promise<Paginated<UserChannel>>;
  findOne(channelId: number, userId: string): Promise<UserChannel>;
  kick(channelId: number, userId: string, user: JwtUser): Promise<UserChannel>;
  ban(channelId: number, userId: string, user: JwtUser): Promise<UserChannel>;
  mute(channelId: number, userId: string, user: JwtUser): Promise<UserChannel>;
  elevateToAdmin(
    channelId: number,
    userId: string,
    user: JwtUser,
  ): Promise<UserChannel>;
}
