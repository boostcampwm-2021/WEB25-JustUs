import { Album } from "src/album/album.entity";
import { TimeStampEntity } from "src/myBaseEntity/timestampEntity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Image } from "src/image/image.entity";
import { User } from "src/user/user.entity";

@Entity({ name: "posts" })
export class Post extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  postTitle: string;

  @Column()
  postContent: string;

  @Column()
  postDate: Date;

  @Column()
  postLocation: string;

  @Column({ type: "decimal", precision: 18, scale: 10 })
  postLatitude: number;

  @Column({ type: "decimal", precision: 18, scale: 10 })
  postLongitude: number;

  @ManyToOne(() => Album, album => album.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "album_id" })
  album: Album;

  @ManyToOne(() => User, user => user.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Image, image => image.post, { cascade: true })
  images: Image[];
}
