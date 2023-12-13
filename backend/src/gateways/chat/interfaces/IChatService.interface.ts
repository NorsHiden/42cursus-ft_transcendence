import { Socket, Server } from 'socket.io';
import { Message } from 'src/typeorm/message.entity';

export interface IChatService {
  handleConnection(client: any): Promise<void>;
  handleDisconnect(client: any): void;
  handleMessage(server: Server, channelId: number, message: Message): void;
  joinChannel(client: Socket, channelId: number): void;
  leaveChannel(client: Socket, channelId: number): void;
}
