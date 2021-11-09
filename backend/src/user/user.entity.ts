import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: true })
  profileImage: string;

  @Column()
  userNickname: string;

  @Column()
  userEmail: string;
}
