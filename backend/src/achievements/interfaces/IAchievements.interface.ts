import { Achievement } from "src/typeorm/Achievement";

export interface IAchievements {
    onModuleInit(): Promise<void>;
    getAchievements(): Promise<Achievement[]>;
    createAchievements(): Promise<void>;
}
