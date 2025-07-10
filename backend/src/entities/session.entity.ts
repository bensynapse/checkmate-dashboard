import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Agent } from './agent.entity';
import { Allocation } from './allocation.entity';

@Entity('session')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  agentId: number;

  @Column()
  startedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @ManyToOne(() => Agent, (agent) => agent.sessions)
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @OneToMany(() => Allocation, (allocation) => allocation.session)
  allocations: Allocation[];
}