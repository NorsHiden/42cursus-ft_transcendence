import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { IUsersService } from '../interfaces/IUsersService.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['achievements'],
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username: username },
      relations: ['achievements'],
    });
  }

  async updateUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
