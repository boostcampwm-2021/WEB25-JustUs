import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { TimeStampEntity } from "src/myBaseEntity/TimestampEntity";
import { Group } from "src/group/group.entity";

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

  @ManyToMany(() => Group)
  @JoinTable({ name: "users_groups_TB" })
  groups: Group[];
}
