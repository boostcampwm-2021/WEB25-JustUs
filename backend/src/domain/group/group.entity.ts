import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { TimeStampEntity } from "src/custom/myBaseEntity/timestampEntity";
import { User } from "src/domain/user/user.entity";
import { Album } from "src/domain/album/album.entity";
import { HashTag } from "src/domain/hashtag/hashtag.entity";

@Entity({ name: "groups_TB" })
export class Group extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  groupId: number;

  @Column({ type: "text" })
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

  static validateImage(groupImage: string) {
    return groupImage === undefined ? process.env.JUSTUS_GROUP_BASE_IMG : groupImage;
  }

  static toEntity(groupImage: string, groupName: string, groupCode: string) {
    const group = new Group();
    group.groupImage = this.validateImage(groupImage);
    group.groupName = groupName;
    group.groupCode = groupCode;

    return group;
  }
}
