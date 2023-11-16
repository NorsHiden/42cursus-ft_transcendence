import { IGatwaysService } from './../../interfaces/IGatwaysService.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/consts';
import { IChatService } from '../interfaces/IChatService.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @Inject(Services.Gateways)
    private readonly gatewaysService: IGatwaysService,
  ) {}

  private users: Map<number, string> = new Map();

  async handleConnection(client: any, ...args: any[]): Promise<void> {
    const id = await this.gatewaysService.getUserId(client, ...args);
    this.users.set(id, client.id);
    return Promise.resolve();
  }

  handleMessage(client: any, payload: any): void {
    console.log('handleMessage');
    console.log(payload);
    client.emit('message', payload);
  }
}
