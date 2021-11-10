import { Group } from "src/group/group.entity";
import { TimeStampEntity } from "src/myBaseEntity/timestampEntity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "albums" })
export class Album extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  albumId: number;

  @Column()
  albumName: string;

  @ManyToOne(() => Group, group => group.albums)
  @JoinColumn({ name: "group_id" })
  group: Group;
}
