import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";
import { CustomFile } from "src/myFile/customFile";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageRepository } from "../image.repository";
import { Post } from "src/post/post.entity";
import { Image } from "../image.entity";

export const s3 = new AWS.S3({
  endpoint: process.env.NCP_OBJECT_STORAGE_ENDPOINT,
  region: process.env.NCP_OBJECT_STORAGE_REGIN,
  credentials: {
    accessKeyId: process.env.NCP_ACCESSKEY_ID,
    secretAccessKey: process.env.NCP_SECRET_ACCESSKEY,
  },
});

export const multerOption = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.NCP_OBJECT_STORAGE_BUCKET,
    acl: "public-read",
    key: function (request, file, callback) {
      const url = encodeURI(`${Date.now().toString()} - ${file.originalname}`);
      callback(null, url);
    },
  }),
};

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  getImagesUrl(images: Express.Multer.File[]) {
    const urls = images.map((e: CustomFile) => {
      return e.location;
    });

    return urls;
  }

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
