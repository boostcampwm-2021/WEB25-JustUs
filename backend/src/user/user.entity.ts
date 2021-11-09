import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { TimeStampEntity } from "src/myBaseEntity/TimestampEntity";

@Entity({ name: "users" })
export class User extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: true })
  profileImage: string;

  @Column()
  userNickname: string;

  @Column()
  userEmail: string;
}
