import {
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";


export class BaseEntity {
  constructor() {
    const now = new Date();
    this.created_at = new Date(now);
    this.updated_at = new Date(now);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamptz', nullable: false })
  created_at!: Date;

  @Column({ type: 'timestamptz', nullable: false })
  updated_at!: Date;
}