import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Agent } from './agent.entity';
import { Task } from './task.entity';
import { Session } from './session.entity';

@Entity('allocation')
export class Allocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  allocatedAt: Date;

  @Column({ nullable: true })
  task_id: number;

  @Column()
  agentId: number;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  session_id: number;

  @ManyToOne(() => Task, (task) => task.allocations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => Agent, (agent) => agent.allocations)
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @ManyToOne(() => Session, (session) => session.allocations)
  @JoinColumn({ name: 'session_id' })
  session: Session;
}