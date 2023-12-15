
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

// export type MessageType = {
//   id: number;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
//   author: {
//     id: number;
//     display_name: string;
//     avatar: string;
//   };
// };

