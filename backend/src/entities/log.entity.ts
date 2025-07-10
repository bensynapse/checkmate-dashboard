import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: ['error', 'info'],
    default: 'info',
  })
  type: string;

  @Column({ length: 255 })
  source: string;

  @Column()
  agent: number;

  @Column({ nullable: true })
  task: number;

  @Column({ nullable: true })
  allocation: number;

  @Column()
  createdAt: Date;
}