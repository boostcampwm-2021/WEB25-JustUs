import { EntityRepository, Repository } from "typeorm";
import { HashTag } from "./hashtag.entity";

@EntityRepository(HashTag)
export class HashTagRepository extends Repository<HashTag> {}
