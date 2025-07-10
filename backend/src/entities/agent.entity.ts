import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Session } from './session.entity';
import { Allocation } from './allocation.entity';

@Entity('agent')
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'tinyint' })
  isActive: boolean;

  @OneToMany(() => Session, (session) => session.agent)
  sessions: Session[];

  @OneToMany(() => Allocation, (allocation) => allocation.agent)
  allocations: Allocation[];
}