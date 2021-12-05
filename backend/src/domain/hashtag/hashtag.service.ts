import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HashTagRepository } from "./hashtag.repository";
import { HashTag } from "./hashtag.entity";
import { GroupRepository } from "src/domain/group/group.repository";
import { QueryRunner } from "typeorm";

@Injectable()
export class HashTagService {
  constructor(
    @InjectRepository(HashTagRepository)
    private hashTagRepository: HashTagRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async makeHashTag(groupId: number, hashTagContents: string[]): Promise<HashTag[]> {
    const group = await this.groupRepository.findOne(groupId);
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const hashTags = await Promise.all(
      hashTagContents?.map(async e => {
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

    return hashTags.filter((item1, idx) => {
      return (
        hashTags.findIndex(item2 => {
          return item1.hashtagContent === item2.hashtagContent;
        }) === idx
      );
    });
  }

  async deleteHashTags(hashTags: string[], postId: number, queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      hashTags?.map(async e => {
        const hashtag = await queryRunner.manager
          .getRepository(HashTag)
          .findOne({ hashtagContent: e }, { relations: ["posts"] });

        if (!hashtag) throw new NotFoundException(`Not found hashtag with the content ${e}`);

        const { hashtagId } = hashtag;

        await queryRunner.manager.getCustomRepository(HashTagRepository).deleteHashTagsQuery(postId, hashtagId);
      }),
    );
  }
}
