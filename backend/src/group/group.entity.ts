import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TimeStampEntity } from "src/myBaseEntity/TimestampEntity";

@Entity({ name: "groups_TB" })
export class Group extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  groupId: number;

  @Column({ nullable: true })
  groupImage: string;

  @Column()
  groupName: string;

  @Column()
  groupCode: string;
}
