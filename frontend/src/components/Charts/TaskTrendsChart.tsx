import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TaskTrend } from '../../services/api.service';

interface TaskTrendsChartProps {
  data: TaskTrend[];
  loading: boolean;
  granularity: 'day' | 'week' | 'month';
}

const AGENT_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

const TaskTrendsChart: React.FC<TaskTrendsChartProps> = ({ data, loading, granularity }) => {
  const formatXAxis = (value: string) => {
    if (granularity === 'day') {
      const date = new Date(value);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
    return value;
  };

  // Transform data for multi-agent display
  const transformedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Check if this is the new format with agents
    if (data[0]?.agents) {
      // Get all unique agents
      const allAgents = new Set<string>();
      data.forEach(period => {
        period.agents?.forEach(agent => {
          allAgents.add(agent.agentName);
        });
      });

      // Transform data to have one row per period with columns for each agent
      return data.map(period => {
        const row: any = { period: period.period };
        period.agents?.forEach(agent => {
          row[`${agent.agentName}_completed`] = agent.completedAllocations;
          row[`${agent.agentName}_total`] = agent.totalAllocations;
          row[`${agent.agentName}_rate`] = agent.completionRate;
        });
        return row;
      });
    } else {
      // Old format - single aggregated data
      return data;
    }
  }, [data]);

  // Get unique agent names for rendering lines
  const agentNames = React.useMemo(() => {
    if (!data || data.length === 0 || !data[0]?.agents) return [];
    const agents = new Set<string>();
    data.forEach(period => {
      period.agents?.forEach(agent => {
        agents.add(agent.agentName);
      });
    });
    return Array.from(agents).sort();
  }, [data]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Task Trends by Agent ({granularity})
        </Typography>
        <Box sx={{ width: '100%', height: 400 }}>
          {loading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography color="textSecondary">Loading...</Typography>
            </Box>
          ) : (
            <ResponsiveContainer>
              <LineChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={formatXAxis}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {agentNames.length > 0 ? (
                  // New format - show lines for each agent
                  agentNames.map((agentName, index) => (
                    <Line
                      key={agentName}
                      type="monotone"
                      dataKey={`${agentName}_completed`}
                      stroke={AGENT_COLORS[index % AGENT_COLORS.length]}
                      name={agentName}
                      strokeWidth={2}
                    />
                  ))
                ) : (
                  // Old format - show aggregated data
                  <>
                    <Line
                      type="monotone"
                      dataKey="totalAllocations"
                      stroke="#8884d8"
                      name="Total Tasks"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="completedAllocations"
                      stroke="#82ca9d"
                      name="Completed Tasks"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="completionRate"
                      stroke="#ffc658"
                      name="Completion Rate (%)"
                      strokeWidth={2}
                      yAxisId="right"
                    />
                    <YAxis yAxisId="right" orientation="right" />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskTrendsChart;