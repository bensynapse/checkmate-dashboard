import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Agent } from '../entities/agent.entity';
import { Task } from '../entities/task.entity';
import { Allocation } from '../entities/allocation.entity';
import { Session } from '../entities/session.entity';
import { Log } from '../entities/log.entity';
import {
  simulateMatchRateData,
  simulateMismatchPatterns,
  simulateAgentEfficiency,
  simulateAgentSheetMatrix,
} from './simulate-validation-data';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Allocation)
    private allocationRepository: Repository<Allocation>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async getOverviewMetrics(startDate?: Date, endDate?: Date) {
    const dateFilter = this.getDateFilter(startDate, endDate);

    // Total tasks completed
    const totalTasksCompleted = await this.taskRepository.count({
      where: { status: 'completed' },
    });

    // Active agents
    const activeAgents = await this.agentRepository.count({
      where: { isActive: true },
    });

    // Average completion time
    const avgCompletionTime = await this.allocationRepository
      .createQueryBuilder('allocation')
      .select('AVG(TIMESTAMPDIFF(SECOND, allocation.allocatedAt, allocation.completedAt))', 'avgTime')
      .where('allocation.completedAt IS NOT NULL')
      .andWhere(dateFilter ? 'allocation.allocatedAt BETWEEN :startDate AND :endDate' : '1=1', { startDate, endDate })
      .getRawOne();

    // Error rate
    const totalLogs = await this.logRepository.count(
      dateFilter && startDate && endDate 
        ? { where: { createdAt: Between(startDate, endDate) } }
        : {}
    );
    const errorLogs = await this.logRepository.count(
      dateFilter && startDate && endDate
        ? { where: { type: 'error', createdAt: Between(startDate, endDate) } }
        : { where: { type: 'error' } }
    );
    const errorRate = totalLogs > 0 ? (errorLogs / totalLogs) * 100 : 0;

    return {
      totalTasksCompleted,
      activeAgents,
      avgCompletionTimeSeconds: Math.round(avgCompletionTime?.avgTime || 0),
      errorRate: Math.round(errorRate * 100) / 100,
    };
  }

  async getAgentPerformance(startDate?: Date, endDate?: Date) {
    const query = this.allocationRepository
      .createQueryBuilder('allocation')
      .select('agent.id', 'agentId')
      .addSelect('agent.name', 'agentName')
      .addSelect('COUNT(allocation.id)', 'totalTasks')
      .addSelect('COUNT(CASE WHEN allocation.completedAt IS NOT NULL THEN 1 END)', 'completedTasks')
      .addSelect('AVG(CASE WHEN allocation.completedAt IS NOT NULL THEN TIMESTAMPDIFF(SECOND, allocation.allocatedAt, allocation.completedAt) END)', 'avgCompletionTime')
      .innerJoin('allocation.agent', 'agent')
      .groupBy('agent.id')
      .orderBy('completedTasks', 'DESC');

    if (startDate && endDate) {
      query.where('allocation.allocatedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    return results.map(r => ({
      agentId: r.agentId,
      agentName: r.agentName,
      totalTasks: parseInt(r.totalTasks),
      completedTasks: parseInt(r.completedTasks),
      completionRate: r.totalTasks > 0 ? Math.round((r.completedTasks / r.totalTasks) * 100) : 0,
      avgCompletionTimeSeconds: Math.round(r.avgCompletionTime || 0),
    }));
  }

  async getTaskTrends(granularity: 'day' | 'week' | 'month', startDate?: Date, endDate?: Date) {
    let dateFormat: string;
    switch (granularity) {
      case 'day':
        dateFormat = '%Y-%m-%d';
        break;
      case 'week':
        dateFormat = '%Y-%u';
        break;
      case 'month':
        dateFormat = '%Y-%m';
        break;
    }

    const query = this.allocationRepository
      .createQueryBuilder('allocation')
      .select(`DATE_FORMAT(allocation.allocatedAt, '${dateFormat}')`, 'period')
      .addSelect('agent.id', 'agentId')
      .addSelect('agent.name', 'agentName')
      .addSelect('COUNT(allocation.id)', 'totalAllocations')
      .addSelect('COUNT(CASE WHEN allocation.completedAt IS NOT NULL THEN 1 END)', 'completedAllocations')
      .innerJoin('allocation.agent', 'agent')
      .groupBy('period')
      .addGroupBy('agent.id')
      .orderBy('period', 'ASC')
      .addOrderBy('agent.id', 'ASC');

    if (startDate && endDate) {
      query.where('allocation.allocatedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    // Group results by period
    const groupedResults = results.reduce((acc, r) => {
      const period = r.period;
      if (!acc[period]) {
        acc[period] = {
          period,
          agents: []
        };
      }
      acc[period].agents.push({
        agentId: r.agentId,
        agentName: r.agentName,
        totalAllocations: parseInt(r.totalAllocations),
        completedAllocations: parseInt(r.completedAllocations),
        completionRate: r.totalAllocations > 0 ? Math.round((r.completedAllocations / r.totalAllocations) * 100) : 0,
      });
      return acc;
    }, {});

    return Object.values(groupedResults);
  }

  async getSheetSummary(startDate?: Date, endDate?: Date) {
    const query = this.taskRepository
      .createQueryBuilder('task')
      .select('task.sheet', 'sheet')
      .addSelect('COUNT(task.id)', 'totalTasks')
      .addSelect('COUNT(CASE WHEN task.status = "completed" THEN 1 END)', 'completedTasks')
      .addSelect('COUNT(CASE WHEN task.status = "in_progress" THEN 1 END)', 'inProgressTasks')
      .addSelect('COUNT(CASE WHEN task.status = "pending" THEN 1 END)', 'pendingTasks')
      .groupBy('task.sheet')
      .orderBy('totalTasks', 'DESC');

    if (startDate && endDate) {
      query
        .leftJoin('task.allocations', 'allocation')
        .andWhere('allocation.allocatedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    return results.map(r => ({
      sheet: r.sheet,
      totalTasks: parseInt(r.totalTasks),
      completedTasks: parseInt(r.completedTasks),
      inProgressTasks: parseInt(r.inProgressTasks),
      pendingTasks: parseInt(r.pendingTasks),
      completionRate: r.totalTasks > 0 ? Math.round((r.completedTasks / r.totalTasks) * 100) : 0,
    }));
  }

  async getErrorPatterns(startDate?: Date, endDate?: Date) {
    const query = this.logRepository
      .createQueryBuilder('log')
      .select('log.description', 'errorDescription')
      .addSelect('COUNT(log.id)', 'count')
      .addSelect('MAX(log.createdAt)', 'lastOccurrence')
      .where('log.type = :type', { type: 'error' })
      .groupBy('log.description')
      .orderBy('count', 'DESC')
      .limit(20);

    if (startDate && endDate) {
      query.andWhere('log.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    return results.map(r => ({
      errorDescription: r.errorDescription,
      count: parseInt(r.count),
      lastOccurrence: r.lastOccurrence,
    }));
  }

  async getAgentActivityHeatmap(agentId?: number, startDate?: Date, endDate?: Date) {
    const query = this.allocationRepository
      .createQueryBuilder('allocation')
      .select('HOUR(allocation.allocatedAt)', 'hour')
      .addSelect('DAYOFWEEK(allocation.allocatedAt)', 'dayOfWeek')
      .addSelect('COUNT(allocation.id)', 'count')
      .groupBy('hour')
      .addGroupBy('dayOfWeek');

    if (agentId) {
      query.where('allocation.agentId = :agentId', { agentId });
    }

    if (startDate && endDate) {
      query.andWhere('allocation.allocatedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    return results.map(r => ({
      hour: parseInt(r.hour),
      dayOfWeek: parseInt(r.dayOfWeek),
      count: parseInt(r.count),
    }));
  }

  async getMatchRate(startDate?: Date, endDate?: Date) {
    // Temporarily return simulated data until database columns are added
    return simulateMatchRateData();
    
    // Original implementation for when database is ready:
    /*
    const query = this.taskRepository
      .createQueryBuilder('task')
      .select('task.sheet', 'sheet')
      .addSelect('COUNT(task.id)', 'totalTasks')
      .addSelect('COUNT(CASE WHEN task.matchStatus = "match" THEN 1 END)', 'matchCount')
      .addSelect('COUNT(CASE WHEN task.matchStatus = "mismatch" THEN 1 END)', 'mismatchCount')
      .addSelect('COUNT(CASE WHEN task.matchStatus = "partial" THEN 1 END)', 'partialCount')
      .where('task.status = :status', { status: 'completed' })
      .andWhere('task.matchStatus IS NOT NULL')
      .groupBy('task.sheet');

    if (startDate && endDate) {
      query
        .leftJoin('task.allocations', 'allocation')
        .andWhere('allocation.completedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    const overall = results.reduce((acc, r) => {
      acc.totalTasks += parseInt(r.totalTasks);
      acc.matchCount += parseInt(r.matchCount);
      acc.mismatchCount += parseInt(r.mismatchCount);
      acc.partialCount += parseInt(r.partialCount);
      return acc;
    }, { totalTasks: 0, matchCount: 0, mismatchCount: 0, partialCount: 0 });

    return {
      overall: {
        matchRate: overall.totalTasks > 0 ? Math.round((overall.matchCount / overall.totalTasks) * 100) : 0,
        mismatchRate: overall.totalTasks > 0 ? Math.round((overall.mismatchCount / overall.totalTasks) * 100) : 0,
        partialRate: overall.totalTasks > 0 ? Math.round((overall.partialCount / overall.totalTasks) * 100) : 0,
        totalValidations: overall.totalTasks,
      },
      bySheet: results.map(r => ({
        sheet: r.sheet,
        matchRate: r.totalTasks > 0 ? Math.round((r.matchCount / r.totalTasks) * 100) : 0,
        mismatchRate: r.totalTasks > 0 ? Math.round((r.mismatchCount / r.totalTasks) * 100) : 0,
        partialRate: r.totalTasks > 0 ? Math.round((r.partialCount / r.totalTasks) * 100) : 0,
        totalValidations: parseInt(r.totalTasks),
      })),
    };
    */
  }

  async getMismatchPatterns(startDate?: Date, endDate?: Date) {
    // Temporarily return simulated data until database columns are added
    return simulateMismatchPatterns();
    
    // Original implementation for when database is ready:
    /*
    const query = this.taskRepository
      .createQueryBuilder('task')
      .select('task.mismatchReasons', 'reasons')
      .addSelect('COUNT(task.id)', 'count')
      .where('task.matchStatus IN (:...statuses)', { statuses: ['mismatch', 'partial'] })
      .andWhere('task.mismatchReasons IS NOT NULL')
      .groupBy('task.mismatchReasons')
      .orderBy('count', 'DESC')
      .limit(20);

    if (startDate && endDate) {
      query
        .leftJoin('task.allocations', 'allocation')
        .andWhere('allocation.completedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    // Parse and aggregate mismatch reasons
    const patterns = new Map();
    results.forEach(r => {
      try {
        const reasons = JSON.parse(r.reasons);
        if (Array.isArray(reasons)) {
          reasons.forEach(reason => {
            const key = reason.type || reason;
            patterns.set(key, (patterns.get(key) || 0) + parseInt(r.count));
          });
        }
      } catch (e) {
        // Handle non-JSON reasons
        patterns.set(r.reasons, (patterns.get(r.reasons) || 0) + parseInt(r.count));
      }
    });

    return Array.from(patterns.entries())
      .map(([pattern, count]) => ({ pattern, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    */
  }

  async getAgentEfficiency(startDate?: Date, endDate?: Date) {
    // Temporarily return simulated data until database columns are added
    return simulateAgentEfficiency();
    
    // Original implementation for when database is ready:
    /*
    const query = this.allocationRepository
      .createQueryBuilder('allocation')
      .select('agent.id', 'agentId')
      .addSelect('agent.name', 'agentName')
      .addSelect('DATE_FORMAT(allocation.allocatedAt, "%Y-%m-%d %H:00:00")', 'hour')
      .addSelect('COUNT(allocation.id)', 'tasksCompleted')
      .addSelect('AVG(TIMESTAMPDIFF(SECOND, allocation.allocatedAt, allocation.completedAt))', 'avgHandleTime')
      .innerJoin('allocation.agent', 'agent')
      .where('allocation.completedAt IS NOT NULL')
      .groupBy('agent.id')
      .addGroupBy('hour')
      .orderBy('hour', 'ASC');

    if (startDate && endDate) {
      query.andWhere('allocation.allocatedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    // Calculate tasks per hour for each agent
    const agentData = results.reduce((acc, r) => {
      const agentId = r.agentId;
      if (!acc[agentId]) {
        acc[agentId] = {
          agentId: r.agentId,
          agentName: r.agentName,
          totalTasks: 0,
          hoursWorked: new Set(),
          avgHandleTime: 0,
          handleTimes: [],
        };
      }
      acc[agentId].totalTasks += parseInt(r.tasksCompleted);
      acc[agentId].hoursWorked.add(r.hour);
      acc[agentId].handleTimes.push(parseFloat(r.avgHandleTime) * parseInt(r.tasksCompleted));
      return acc;
    }, {});

    return Object.values(agentData).map((agent: any) => ({
      agentId: agent.agentId,
      agentName: agent.agentName,
      tasksPerHour: Math.round(agent.totalTasks / agent.hoursWorked.size),
      avgHandleTimeSeconds: Math.round(
        agent.handleTimes.reduce((a, b) => a + b, 0) / agent.totalTasks
      ),
      totalTasks: agent.totalTasks,
      hoursWorked: agent.hoursWorked.size,
    }));
    */
  }

  async getAgentSheetMatrix(startDate?: Date, endDate?: Date) {
    // Temporarily return simulated data until database columns are added
    return simulateAgentSheetMatrix();
    
    // Original implementation for when database is ready:
    /*
    const query = this.allocationRepository
      .createQueryBuilder('allocation')
      .select('agent.id', 'agentId')
      .addSelect('agent.name', 'agentName')
      .addSelect('task.sheet', 'sheet')
      .addSelect('COUNT(allocation.id)', 'totalTasks')
      .addSelect('COUNT(CASE WHEN allocation.completedAt IS NOT NULL THEN 1 END)', 'completedTasks')
      .addSelect('AVG(CASE WHEN allocation.completedAt IS NOT NULL THEN TIMESTAMPDIFF(SECOND, allocation.allocatedAt, allocation.completedAt) END)', 'avgCompletionTime')
      .innerJoin('allocation.agent', 'agent')
      .innerJoin('allocation.task', 'task')
      .groupBy('agent.id')
      .addGroupBy('task.sheet');

    if (startDate && endDate) {
      query.where('allocation.allocatedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    }

    const results = await query.getRawMany();
    
    // Transform to matrix format
    const matrix = results.reduce((acc, r) => {
      if (!acc[r.agentName]) {
        acc[r.agentName] = {};
      }
      acc[r.agentName][r.sheet] = {
        totalTasks: parseInt(r.totalTasks),
        completedTasks: parseInt(r.completedTasks),
        completionRate: r.totalTasks > 0 ? Math.round((r.completedTasks / r.totalTasks) * 100) : 0,
        avgCompletionTime: Math.round(r.avgCompletionTime || 0),
      };
      return acc;
    }, {});

    return matrix;
    */
  }

  private getDateFilter(startDate?: Date, endDate?: Date) {
    if (startDate && endDate) {
      return { allocatedAt: Between(startDate, endDate) };
    }
    return null;
  }
}