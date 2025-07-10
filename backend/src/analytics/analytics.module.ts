import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsServiceMock } from './analytics.service.mock';
import { AnalyticsController } from './analytics.controller';
import { Agent } from '../entities/agent.entity';
import { Task } from '../entities/task.entity';
import { Allocation } from '../entities/allocation.entity';
import { Session } from '../entities/session.entity';
import { Log } from '../entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent, Task, Allocation, Session, Log])
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController]
})
export class AnalyticsModule {}
