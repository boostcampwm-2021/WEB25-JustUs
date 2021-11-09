import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { TimeStampEntity } from "src/myBaseEntity/TimestampEntity";
import { User } from "src/user/user.entity";

@Entity({ name: "groups_TB" })
export class Group extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  groupId: number;

  @Column({ nullable: true })
  groupImage: string;

  @Column()
  groupName: string;

  @Column()
  groupCode: string;

  @ManyToMany(() => User)
  @JoinTable({ name: "users_groups_TB" })
  users: User[];
}
