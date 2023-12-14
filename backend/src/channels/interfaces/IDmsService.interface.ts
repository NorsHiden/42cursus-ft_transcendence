import { Channel } from 'src/typeorm/channel.entity';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { JwtUser } from 'src/utils/types';

export interface IDmsService {
  create(recipientId: string, user: JwtUser): Promise<Channel>;
  findAll(query: PaginateQuery, user: JwtUser): Promise<Paginated<Channel>>;
  findOne(recipientId: string, user: JwtUser): Promise<Channel>;
}
