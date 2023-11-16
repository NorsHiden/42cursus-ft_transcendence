import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./backend/src/typeorm/user.entity";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  content: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: number;

  //   @ManyToOne(() => User, (user) => user.messages)
  //   author: User;
}
