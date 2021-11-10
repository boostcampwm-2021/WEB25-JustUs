import { Album } from "src/album/album.entity";
import { TimeStampEntity } from "src/myBaseEntity/timestampEntity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "posts" })
export class Post extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  postTitle: string;

  @Column()
  postContent: string;

  @Column()
  rememberDate: Date;

  @Column()
  postLocation: string;

  @Column({ type: "decimal", precision: 18, scale: 10 })
  postLatitude: number;

  @Column({ type: "decimal", precision: 18, scale: 10 })
  postLongitude: number;

  @ManyToOne(() => Album, album => album.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "album_id" })
  album: Album;
}
