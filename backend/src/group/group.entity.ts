import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { TimeStampEntity } from "src/custom/myBaseEntity/timestampEntity";
import { User } from "src/user/user.entity";
import { Album } from "src/album/album.entity";
import { HashTag } from "src/hashtag/hashtag.entity";

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

  @Column({ nullable: true })
  albumOrder: string;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({ name: "users_groups_TB" })
  users: User[];

  @OneToMany(() => Album, album => album.group, { cascade: true })
  albums: Album[];

  @OneToMany(() => HashTag, hashtag => hashtag.group, { cascade: true })
  hashtags: HashTag[];
}
