import { User } from "src/typeorm/User";

export interface IUsersService {
    getUserById(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserByUsername(username: string): Promise<User>;
}