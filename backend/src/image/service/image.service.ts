import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageRepository } from "../image.repository";
import { Post } from "src/post/post.entity";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  saveImage(post: Post, images: string[]): void {
    images.forEach(e => {
      this.imageRepository.save({
        imageUrl: e,
        post: post,
      });
    });
  }
}
