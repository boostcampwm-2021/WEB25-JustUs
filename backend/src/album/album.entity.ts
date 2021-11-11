import { Group } from "src/group/group.entity";
import { TimeStampEntity } from "src/myBaseEntity/timestampEntity";
import { Post } from "src/post/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "albums" })
export class Album extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  albumId: number;

  @Column()
  albumName: string;

  @ManyToOne(() => Group, group => group.albums, { onDelete: "CASCADE" })
  @JoinColumn({ name: "group_id" })
  group: Group;

  @OneToMany(() => Post, post => post.album)
  posts: Post[];
}
