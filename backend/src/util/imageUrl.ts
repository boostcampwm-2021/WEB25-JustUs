import { CustomFile } from "src/custom/myFile/customFile";

export const getImagesUrl = (images: Express.Multer.File[]): string[] => {
  const urls = images.map((e: CustomFile) => {
    return e?.transforms[0].location;
  });

  return urls;
};

export const getImageUrl = (image: CustomFile): string => {
  return image?.transforms[0].location;
};
