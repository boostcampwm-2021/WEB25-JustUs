import { Injectable } from "@nestjs/common";

import { CustomFile } from "src/custom/myFile/customFile";
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

  getImagesUrl(images: Express.Multer.File[]): string[] {
    const urls = images.map((e: CustomFile) => {
      return e?.transforms[0].location;
    });

    return urls;
  }

  getImageUrl(image: CustomFile): string {
    return image?.transforms[0].location;
  }

  saveImage(images: string[]): Image[] {
    return images.map(e => {
      const image = new Image();
      image.imageUrl = e;
      return image;
    });
  }

  async updateImages(post: Post, addImages: string[], deleteImagesId: number[]): Promise<void> {
    if (deleteImagesId)
      typeof deleteImagesId === "number"
        ? this.imageRepository.softRemove({ imageId: deleteImagesId })
        : deleteImagesId.forEach(imageId => {
            this.imageRepository.softRemove({ imageId });
          });
    for (const image of addImages) {
      await this.imageRepository.save({
        imageUrl: image,
        post: post,
      });
    }
  }

  deleteImage(images: number[]): void {
    images.forEach(imageId => {
      this.imageRepository.softRemove({ imageId });
    });
  }
}
