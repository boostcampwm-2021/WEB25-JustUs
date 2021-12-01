import { Group } from "src/domain/group/group.entity";
import { TimeStampEntity } from "src/custom/myBaseEntity/timestampEntity";
import { Post } from "src/domain/post/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "albums" })
export class Album extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  albumId: number;

  @Column()
  albumName: string;

  @Column()
  base: boolean;

  @ManyToOne(() => Group, group => group.albums, { onDelete: "CASCADE" })
  @JoinColumn({ name: "group_id" })
  group: Group;

  @OneToMany(() => Post, post => post.album)
  posts: Post[];
}
