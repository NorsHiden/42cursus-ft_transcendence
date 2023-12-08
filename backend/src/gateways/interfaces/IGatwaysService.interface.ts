import { Socket } from 'socket.io';

export interface IGatwaysService {
  getUserId(client: Socket): Promise<number>;
}
