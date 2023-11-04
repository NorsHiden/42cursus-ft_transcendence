import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id: string;
}
