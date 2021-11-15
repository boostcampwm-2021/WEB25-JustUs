export interface CustomFile extends Express.Multer.File {
  location: string;
}
