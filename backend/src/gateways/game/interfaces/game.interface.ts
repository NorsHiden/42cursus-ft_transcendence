export interface IGameService {
  handleConnection(client: any, ...args: any[]): Promise<void>;
  getId(id: string): number;
}
