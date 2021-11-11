import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { TimeStampEntity } from "src/myBaseEntity/timestampEntity";
import { Group } from "src/group/group.entity";
import { Post } from "src/post/post.entity";

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

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
