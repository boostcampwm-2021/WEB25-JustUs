import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { TimeStampEntity } from "src/custom/myBaseEntity/timestampEntity";
import { Post } from "src/post/post.entity";
import { Group } from "src/group/group.entity";

@Entity({ name: "hashtags" })
export class HashTag extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  hashtagId: number;

  @Column()
  hashtagContent: string;

  @ManyToMany(() => Post)
  @JoinTable({ name: "posts_hashtags" })
  posts: Post[];

  @ManyToOne(() => Group, group => group.hashtags, { onDelete: "CASCADE" })
  @JoinColumn({ name: "group_id" })
  group: Group;

  constructor(hashtagContent: string, group: Group) {
    super();
    this.hashtagContent = hashtagContent;
    this.group = group;
  }
}
