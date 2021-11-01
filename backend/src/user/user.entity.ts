import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_image: string;

  @Column()
  user_nickname: string;

  @Column()
  user_email: string;
}
