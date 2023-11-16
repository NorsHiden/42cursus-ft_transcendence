export interface IGatwaysService {
  getUserId(client: any, ...args: any[]): Promise<number>;
}
