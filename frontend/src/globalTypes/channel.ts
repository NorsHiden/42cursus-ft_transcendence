
export type mychannel = {
    id: number;
    name: string;
    avatar: string;
    role: string;
    banner: string;
}

export type Channel = {
  id: number;
  name: string;
  avatar: string;
  banner: string;
  type: string;
  protected: boolean;
  createdAt: Date;
  updatedAt: Date;
};
