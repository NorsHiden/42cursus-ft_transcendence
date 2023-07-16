import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Achievement } from "src/typeorm/Achievement";
import { Repository } from "typeorm";

@Injectable()
export class AchievementsService {
    constructor(@InjectRepository(Achievement) private achievementsRepository: Repository<Achievement>) {}

    async onModuleInit() {
        // Initialization logic goes here
        console.log('Module initialized');
      }

}