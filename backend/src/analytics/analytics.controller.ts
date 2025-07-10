import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { IsOptional, IsDateString, IsEnum, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

class DateRangeDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

class TrendQueryDto extends DateRangeDto {
  @IsEnum(['day', 'week', 'month'])
  granularity: 'day' | 'week' | 'month';
}

class AgentQueryDto extends DateRangeDto {
  @IsOptional()
  @IsNumberString()
  agentId?: string;
}

@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  async getOverviewMetrics(@Query(ValidationPipe) query: DateRangeDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getOverviewMetrics(startDate, endDate);
  }

  @Get('agent-performance')
  async getAgentPerformance(@Query(ValidationPipe) query: DateRangeDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getAgentPerformance(startDate, endDate);
  }

  @Get('task-trends')
  async getTaskTrends(@Query(ValidationPipe) query: TrendQueryDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getTaskTrends(query.granularity, startDate, endDate);
  }

  @Get('sheet-summary')
  async getSheetSummary(@Query(ValidationPipe) query: DateRangeDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getSheetSummary(startDate, endDate);
  }

  @Get('errors')
  async getErrorPatterns(@Query(ValidationPipe) query: DateRangeDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getErrorPatterns(startDate, endDate);
  }

  @Get('activity-heatmap')
  async getAgentActivityHeatmap(@Query(ValidationPipe) query: AgentQueryDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    const agentId = query.agentId ? parseInt(query.agentId) : undefined;
    
    return this.analyticsService.getAgentActivityHeatmap(agentId, startDate, endDate);
  }

  @Get('match-rate')
  async getMatchRate(@Query(ValidationPipe) query: DateRangeDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getMatchRate(startDate, endDate);
  }

  @Get('mismatch-patterns')
  async getMismatchPatterns(@Query(ValidationPipe) query: DateRangeDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getMismatchPatterns(startDate, endDate);
  }

  @Get('agent-efficiency')
  async getAgentEfficiency(@Query(ValidationPipe) query: DateRangeDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getAgentEfficiency(startDate, endDate);
  }

  @Get('agent-sheet-matrix')
  async getAgentSheetMatrix(@Query(ValidationPipe) query: DateRangeDto) {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    
    return this.analyticsService.getAgentSheetMatrix(startDate, endDate);
  }
}