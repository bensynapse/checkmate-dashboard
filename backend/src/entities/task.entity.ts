import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Allocation } from './allocation.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  urls: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Column({ type: 'json', nullable: true })
  data: any;

  @Column({ type: 'json', nullable: true })
  sourceData: any;

  @Column({ default: 0 })
  rowNumber: number;

  @Column({ length: 255 })
  sheet: string;

  @Column({
    type: 'enum',
    enum: ['match', 'mismatch', 'partial', 'pending'],
    default: 'pending',
    nullable: true,
  })
  matchStatus: string;

  @Column({ type: 'float', nullable: true })
  confidenceScore: number;

  @Column({ type: 'json', nullable: true })
  mismatchReasons: any;

  @Column({ type: 'int', nullable: true })
  validationDurationSeconds: number;

  @OneToMany(() => Allocation, (allocation) => allocation.task)
  allocations: Allocation[];
}