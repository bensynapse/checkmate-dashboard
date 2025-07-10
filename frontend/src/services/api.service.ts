import axios from 'axios';
import { format } from 'date-fns';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

export interface OverviewMetrics {
  totalTasksCompleted: number;
  activeAgents: number;
  avgCompletionTimeSeconds: number;
  errorRate: number;
}

export interface AgentPerformance {
  agentId: number;
  agentName: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  avgCompletionTimeSeconds: number;
}

export interface AgentTaskData {
  agentId: number;
  agentName: string;
  totalAllocations: number;
  completedAllocations: number;
  completionRate: number;
}

export interface TaskTrend {
  period: string;
  totalAllocations?: number;
  completedAllocations?: number;
  completionRate?: number;
  agents?: AgentTaskData[];
}

export interface SheetSummary {
  sheet: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  completionRate: number;
}

export interface ErrorPattern {
  errorDescription: string;
  count: number;
  lastOccurrence: string;
}

export interface HeatmapData {
  hour: number;
  dayOfWeek: number;
  count: number;
}

export interface MatchRateData {
  overall: {
    matchRate: number;
    mismatchRate: number;
    partialRate: number;
    totalValidations: number;
  };
  bySheet: Array<{
    sheet: string;
    matchRate: number;
    mismatchRate: number;
    partialRate: number;
    totalValidations: number;
  }>;
}

export interface MismatchPattern {
  pattern: string;
  count: number;
}

export interface AgentEfficiency {
  agentId: number;
  agentName: string;
  tasksPerHour: number;
  avgHandleTimeSeconds: number;
  totalTasks: number;
  hoursWorked: number;
}

export interface AgentSheetMatrix {
  [agentName: string]: {
    [sheet: string]: {
      totalTasks: number;
      completedTasks: number;
      completionRate: number;
      avgCompletionTime: number;
    };
  };
}

class ApiService {
  private formatDateParams(dateRange?: DateRange): Record<string, string> {
    const params: Record<string, string> = {};
    if (dateRange?.startDate) {
      params.startDate = format(dateRange.startDate, 'yyyy-MM-dd');
    }
    if (dateRange?.endDate) {
      params.endDate = format(dateRange.endDate, 'yyyy-MM-dd');
    }
    return params;
  }

  async getOverviewMetrics(dateRange?: DateRange): Promise<OverviewMetrics> {
    const { data } = await api.get('/analytics/overview', {
      params: this.formatDateParams(dateRange),
    });
    return data;
  }

  async getAgentPerformance(dateRange?: DateRange): Promise<AgentPerformance[]> {
    const { data } = await api.get('/analytics/agent-performance', {
      params: this.formatDateParams(dateRange),
    });
    return data;
  }

  async getTaskTrends(
    granularity: 'day' | 'week' | 'month',
    dateRange?: DateRange
  ): Promise<TaskTrend[]> {
    const { data } = await api.get('/analytics/task-trends', {
      params: {
        granularity,
        ...this.formatDateParams(dateRange),
      },
    });
    return data;
  }

  async getSheetSummary(dateRange?: DateRange): Promise<SheetSummary[]> {
    const { data } = await api.get('/analytics/sheet-summary', {
      params: this.formatDateParams(dateRange),
    });
    return data;
  }

  async getErrorPatterns(dateRange?: DateRange): Promise<ErrorPattern[]> {
    const { data } = await api.get('/analytics/errors', {
      params: this.formatDateParams(dateRange),
    });
    return data;
  }

  async getActivityHeatmap(
    agentId?: number,
    dateRange?: DateRange
  ): Promise<HeatmapData[]> {
    const params = {
      ...this.formatDateParams(dateRange),
      ...(agentId && { agentId: agentId.toString() }),
    };
    const { data } = await api.get('/analytics/activity-heatmap', { params });
    return data;
  }

  async getMatchRate(dateRange?: DateRange): Promise<MatchRateData> {
    const { data } = await api.get('/analytics/match-rate', {
      params: this.formatDateParams(dateRange),
    });
    return data;
  }

  async getMismatchPatterns(dateRange?: DateRange): Promise<MismatchPattern[]> {
    const { data } = await api.get('/analytics/mismatch-patterns', {
      params: this.formatDateParams(dateRange),
    });
    return data;
  }

  async getAgentEfficiency(dateRange?: DateRange): Promise<AgentEfficiency[]> {
    const { data } = await api.get('/analytics/agent-efficiency', {
      params: this.formatDateParams(dateRange),
    });
    return data;
  }

  async getAgentSheetMatrix(dateRange?: DateRange): Promise<AgentSheetMatrix> {
    const { data } = await api.get('/analytics/agent-sheet-matrix', {
      params: this.formatDateParams(dateRange),
    });
    return data;
  }
}

export default new ApiService();