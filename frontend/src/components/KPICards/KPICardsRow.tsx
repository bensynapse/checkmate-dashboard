import React from 'react';
import { Grid } from '@mui/material';
import { Assignment, People, Timer, Error } from '@mui/icons-material';
import KPICard from './KPICard';
import { OverviewMetrics } from '../../services/api.service';

interface KPICardsRowProps {
  metrics: OverviewMetrics | null;
  loading: boolean;
}

const KPICardsRow: React.FC<KPICardsRowProps> = ({ metrics, loading }) => {
  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${(seconds / 3600).toFixed(1)}h`;
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KPICard
          title="Tasks Completed"
          value={loading ? '-' : metrics?.totalTasksCompleted || 0}
          icon={<Assignment />}
          color="#2196f3"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KPICard
          title="Active Agents"
          value={loading ? '-' : metrics?.activeAgents || 0}
          icon={<People />}
          color="#4caf50"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KPICard
          title="Avg Completion Time"
          value={loading ? '-' : formatTime(metrics?.avgCompletionTimeSeconds || 0)}
          icon={<Timer />}
          color="#ff9800"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KPICard
          title="Error Rate"
          value={loading ? '-' : `${metrics?.errorRate || 0}%`}
          icon={<Error />}
          color="#f44336"
        />
      </Grid>
    </Grid>
  );
};

export default KPICardsRow;