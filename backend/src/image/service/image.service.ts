import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import * as multer_S3 from "multer-s3";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageRepository } from "../image.repository";
import { Post } from "src/post/post.entity";
import { Image } from "../image.entity";

const s3 = new AWS.S3({
  endpoint: process.env.NCP_OBJECT_STORAGE_ENDPOINT,
  region: process.env.NCP_OBJECT_STORAGE_REGIN,
  credentials: {
    accessKeyId: process.env.NCP_ACCESSKEY_ID,
    secretAccessKey: process.env.NCP_SECRET_ACCESSKEY,
  },
});

export const multerOption = {
  storage: multer_S3({
    s3: s3,
    bucket: process.env.NCP_OBJECT_STORAGE_BUCKET,
    acl: "public-read",
    key: function (request, file, callback) {
      callback(null, `${Date.now().toString()} - ${file.originalname}`);
    },
  }),
};

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
