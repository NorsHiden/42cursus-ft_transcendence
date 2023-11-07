import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  description: string;

  @Column()
  progress: number;
}
