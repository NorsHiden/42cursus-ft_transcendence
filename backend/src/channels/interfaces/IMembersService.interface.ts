import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { UserChannel } from 'src/typeorm/userchannel.entity';

export interface IMembersService {
  findAll(id: number, query: PaginateQuery): Promise<Paginated<UserChannel>>;
}
