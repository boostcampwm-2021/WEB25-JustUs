export interface CustomFile extends Express.Multer.File {
  location: string;
  transforms: Location[];
}

class Location {
  location: string;
}
