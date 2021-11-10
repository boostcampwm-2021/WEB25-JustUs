import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumRepository } from "../album.repository";
import { CreateAlbumRequestDto } from "src/dto/album/createAlbumRequest.dto";
import { GroupRepository } from "src/group/group.repository";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async createAlbum(createAlbumRequestDto: CreateAlbumRequestDto): Promise<string> {
    const { groupId, albumName } = createAlbumRequestDto;
    const group = await this.groupRepository.findOne({ groupId });
    if (!group) throw new NotFoundException("Not found group with the id " + groupId);

    const album = await this.albumRepository.save({
      albumName: albumName,
      group: group,
    });

    return album.albumName;
  }
}
