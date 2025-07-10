import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AgentEfficiency } from '../../services/api.service';

interface AgentEfficiencyChartProps {
  data: AgentEfficiency[];
  loading: boolean;
}

const AgentEfficiencyChart: React.FC<AgentEfficiencyChartProps> = ({ data, loading }) => {
  const chartData = data.map(agent => ({
    name: agent.agentName,
    tasksPerHour: agent.tasksPerHour,
    avgHandleTime: agent.avgHandleTimeSeconds,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const agent = data.find(a => a.agentName === label);
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 2, border: 1, borderColor: 'grey.300' }}>
          <Typography variant="subtitle2">{label}</Typography>
          <Typography variant="body2" color="primary">
            Tasks/Hour: {payload[0].value}
          </Typography>
          <Typography variant="body2" color="secondary">
            Avg Handle Time: {payload[1].value}s
          </Typography>
          {agent && (
            <>
              <Typography variant="body2" color="text.secondary">
                Total Tasks: {agent.totalTasks.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hours Worked: {agent.hoursWorked}
              </Typography>
            </>
          )}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Agent Efficiency Metrics
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
          ) : data.length > 0 ? (
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="tasksPerHour" 
                  fill="#8884d8" 
                  name="Tasks per Hour"
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="avgHandleTime" 
                  fill="#82ca9d" 
                  name="Avg Handle Time (s)"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Typography color="textSecondary">No data available</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgentEfficiencyChart;