import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  userImage: string;

  @Column()
  userNickname: string;

  @Column()
  userEmail: string;
}
