import { EntityRepository, Repository } from "typeorm";
import { Image } from "./image.entity";

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {}
