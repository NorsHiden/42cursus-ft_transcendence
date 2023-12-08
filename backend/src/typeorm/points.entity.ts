import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Points {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  value: number;

  @ManyToOne(() => User, (user) => user.points, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    default: new Date(),
  })
  created_at: Date;
}
