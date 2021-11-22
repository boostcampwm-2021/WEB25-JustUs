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

  async makeHashTag(groupId: number, hashTags: string[]): Promise<HashTag[]> {
    const group = await this.groupRepository.findOne(groupId);

    return await Promise.all(
      hashTags?.map(async e => {
        const hashtagContent = e;

        const exits = await this.hashTagRepository.findOne({ hashtagContent, group });

        if (!exits) {
          const hashtag = new HashTag();
          hashtag.hashtagContent = hashtagContent;
          hashtag.group = group;
          return hashtag;
        }

        return exits;
      }),
    );
  }
}
