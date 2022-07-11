import {
  Entity,
  Column,
} from "typeorm";
import { BaseEntity } from "./base";
import { data_source } from "..";


@Entity({ name: "movies" })
export class MoiveEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @Column({ type: "integer", nullable: false })
  user_id!: number;

  @Column({ type: "varchar", length: 128, nullable: false })
  title!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  genre!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  director!: string;

  @Column({ type: "timestamp without time zone", nullable: false })
  release_date!: Date;
}
