import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { TimeStampEntity } from "src/custom/myBaseEntity/timestampEntity";
import { Group } from "src/domain/group/group.entity";
import { Post } from "src/domain/post/post.entity";

@Entity({ name: "users" })
export class User extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: true, type: "text" })
  profileImage: string;

  @Column()
  userNickname: string;

  @Column()
  userEmail: string;

  @Column({ default: "" })
  groupOrder: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToMany(() => Group)
  @JoinTable({ name: "users_groups_TB" })
  groups: Group[];

  @OneToMany(() => Post, post => post.user, { cascade: true })
  posts: Post[];
}
