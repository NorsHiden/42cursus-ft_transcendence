import { Inject, Injectable } from '@nestjs/common';
import { IGatwaysService } from 'src/gateways/interfaces/IGatwaysService.interface';
import { Services } from 'src/utils/consts';

@Injectable()
export class GameService {
  private users: Map<string, number> = new Map();

  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
  ) {}

  async handleConnection(client: any, ...args: any[]): Promise<void> {
    const id = await this.gatewaysService.getUserId(client, ...args);
    this.users.set(client.id, id);
    return Promise.resolve();
  }

  getId(id: string): number {
    return this.users.get(id);
  }
}
