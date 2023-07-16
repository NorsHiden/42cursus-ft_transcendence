import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Achievement } from "src/typeorm/Achievement";
import { Repository } from "typeorm";
import { IAchievements } from '../interfaces/IAchievements.interface';
import { achievements } from 'src/utils/achievements';

@Injectable()
export class AchievementsService implements IAchievements {
    constructor(@InjectRepository(Achievement) private achievementsRepository: Repository<Achievement>) {}

    async createAchievements() {
        const achievementsExist = await this.achievementsRepository.find();
        if (achievementsExist.length === 0) {
          await this.achievementsRepository.save(achievements);
        }
      }
    
      async getAchievements() {
        return await this.achievementsRepository.find();
      }

    async onModuleInit() {
        await this.createAchievements();
      }

}