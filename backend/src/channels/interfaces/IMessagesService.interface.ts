import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { Message } from 'src/typeorm/message.entity';
import { CreateMessageDetails, JwtUser } from 'src/utils/types';

export interface IMessagesService {
  create(
    channelId: number,
    details: CreateMessageDetails,
    user: JwtUser,
  ): Promise<Message>;
  findAll(
    channelId: number,
    query: PaginateQuery,
    user: JwtUser,
  ): Promise<Paginated<Message>>;
}
