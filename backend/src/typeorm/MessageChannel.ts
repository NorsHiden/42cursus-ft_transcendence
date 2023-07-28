import { Channel } from './Channel';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageChannel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Channel, (Channel) => Channel.messages)
  channel: string;

  @Column()
  author: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
