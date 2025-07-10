import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsServiceMock {
  async getOverviewMetrics(startDate?: Date, endDate?: Date) {
    return {
      totalTasksCompleted: 166460,
      activeAgents: 4,
      avgCompletionTimeSeconds: 185,
      errorRate: 0.8,
    };
  }

  async getAgentPerformance(startDate?: Date, endDate?: Date) {
    return [
      {
        agentId: 1,
        agentName: 'Validator 1',
        totalTasks: 45230,
        completedTasks: 44850,
        completionRate: 99.2,
        avgCompletionTimeSeconds: 175,
      },
      {
        agentId: 5,
        agentName: 'Validator 5',
        totalTasks: 38920,
        completedTasks: 38500,
        completionRate: 98.9,
        avgCompletionTimeSeconds: 190,
      },
      {
        agentId: 6,
        agentName: 'Validator 6',
        totalTasks: 42310,
        completedTasks: 41900,
        completionRate: 99.0,
        avgCompletionTimeSeconds: 182,
      },
      {
        agentId: 7,
        agentName: 'Validator 7',
        totalTasks: 40000,
        completedTasks: 39650,
        completionRate: 99.1,
        avgCompletionTimeSeconds: 188,
      },
    ];
  }

  async getTaskTrends(granularity: 'day' | 'week' | 'month', startDate?: Date, endDate?: Date) {
    const trends: any[] = [];
    const now = new Date();
    
    if (granularity === 'day') {
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        trends.push({
          period: date.toISOString().split('T')[0],
          totalAllocations: Math.floor(Math.random() * 200) + 5500,
          completedAllocations: Math.floor(Math.random() * 180) + 5450,
          completionRate: Math.floor(Math.random() * 2) + 98,
        });
      }
    } else if (granularity === 'week') {
      for (let i = 11; i >= 0; i--) {
        trends.push({
          period: `2025-${String(i + 1).padStart(2, '0')}`,
          totalAllocations: Math.floor(Math.random() * 1000) + 35000,
          completedAllocations: Math.floor(Math.random() * 900) + 34700,
          completionRate: Math.floor(Math.random() * 2) + 98,
        });
      }
    } else {
      for (let i = 5; i >= 0; i--) {
        trends.push({
          period: `2025-${String(7 - i).padStart(2, '0')}`,
          totalAllocations: Math.floor(Math.random() * 4000) + 25000,
          completedAllocations: Math.floor(Math.random() * 3600) + 24800,
          completionRate: Math.floor(Math.random() * 2) + 98,
        });
      }
    }
    
    return trends;
  }

  async getSheetSummary(startDate?: Date, endDate?: Date) {
    return [
      {
        sheet: 'VINYASA',
        totalTasks: 45670,
        completedTasks: 45200,
        inProgressTasks: 200,
        pendingTasks: 270,
        completionRate: 99.0,
      },
      {
        sheet: 'Summit Racing',
        totalTasks: 38500,
        completedTasks: 38100,
        inProgressTasks: 150,
        pendingTasks: 250,
        completionRate: 99.0,
      },
      {
        sheet: 'AutoZone',
        totalTasks: 42345,
        completedTasks: 41900,
        inProgressTasks: 145,
        pendingTasks: 300,
        completionRate: 98.9,
      },
      {
        sheet: 'O\'Reilly Auto Parts',
        totalTasks: 40245,
        completedTasks: 39860,
        inProgressTasks: 185,
        pendingTasks: 200,
        completionRate: 99.0,
      },
    ];
  }

  async getErrorPatterns(startDate?: Date, endDate?: Date) {
    return [
      {
        errorDescription: 'Product URL not loading - Amazon page unavailable',
        count: 245,
        lastOccurrence: new Date().toISOString(),
      },
      {
        errorDescription: 'Summit Racing product page 404',
        count: 132,
        lastOccurrence: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        errorDescription: 'Session timeout - validator inactive',
        count: 28,
        lastOccurrence: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        errorDescription: 'Invalid product comparison - missing data',
        count: 15,
        lastOccurrence: new Date(Date.now() - 10800000).toISOString(),
      },
      {
        errorDescription: 'Google Sheets API rate limit',
        count: 12,
        lastOccurrence: new Date(Date.now() - 14400000).toISOString(),
      },
    ];
  }

  async getAgentActivityHeatmap(agentId?: number, startDate?: Date, endDate?: Date) {
    const heatmap: any[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let day = 1; day <= 7; day++) {
        heatmap.push({
          hour,
          dayOfWeek: day,
          count: Math.floor(Math.random() * 50) + (hour >= 9 && hour <= 17 ? 20 : 5),
        });
      }
    }
    return heatmap;
  }
}