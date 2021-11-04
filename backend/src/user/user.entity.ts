import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_image: string;

  @Column()
  user_nickname: string;

  @Column()
  user_email: string;
}
