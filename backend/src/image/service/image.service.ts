import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageRepository } from "../image.repository";
import { Post } from "src/post/post.entity";
import { Image } from "../image.entity";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  saveImage(images: string[]): Image[] {
    return images.map(e => {
      const image = new Image();
      image.imageUrl = e;
      return image;
    });
  }

  updateImages(post: Post, addImages: string[], deleteImagesId: number[]): void {
    deleteImagesId.forEach(imageId => {
      this.imageRepository.softRemove({ imageId });
    });
    addImages.forEach(e => {
      this.imageRepository.save({
        imageUrl: e,
        post: post,
      });
    });
  }

  deleteImage(images: number[]): void {
    images.forEach(imageId => {
      this.imageRepository.softRemove({ imageId });
    });
  }
}
