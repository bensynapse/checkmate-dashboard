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
import { AgentPerformance } from '../../services/api.service';

interface AgentPerformanceChartProps {
  data: AgentPerformance[];
  loading: boolean;
}

const AgentPerformanceChart: React.FC<AgentPerformanceChartProps> = ({ data, loading }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Agent Performance
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
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
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agentName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completedTasks" fill="#82ca9d" name="Completed Tasks" />
                <Bar dataKey="totalTasks" fill="#8884d8" name="Total Tasks" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgentPerformanceChart;