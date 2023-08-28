import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  display_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  avatar_url: string;

  @Column()
  verified: boolean;
}
