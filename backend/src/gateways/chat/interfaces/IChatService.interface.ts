export interface IChatService {
  handleConnection(client: any, ...args: any[]): Promise<void>;
  handleMessage(client: any, payload: any): void;
}
