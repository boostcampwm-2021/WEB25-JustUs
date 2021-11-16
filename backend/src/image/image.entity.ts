import { TimeStampEntity } from "src/custom/myBaseEntity/timestampEntity";
import { Post } from "src/post/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "images" })
export class Image extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Post, post => post.images, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post: Post;
}
