import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HashTagRepository } from "../hashtag.repository";
import { HashTag } from "../hashtag.entity";
import { GroupRepository } from "src/group/group.repository";

@Injectable()
export class HashTagService {
  constructor(
    @InjectRepository(HashTagRepository)
    private hashTagRepository: HashTagRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async saveHashTag(groupId: number, hashTags: RegExpMatchArray): Promise<HashTag[]> {
    const group = await this.groupRepository.findOne(groupId);

    return await Promise.all(
      hashTags?.map(async e => {
        const hashtagContent = e;

        const exits = await this.hashTagRepository.findOne({ hashtagContent });

        if (!exits) {
          const hashtag = new HashTag(hashtagContent, group);
          return hashtag;
        }

        return exits;
      }),
    );
  }
}
