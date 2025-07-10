import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SheetSummary } from '../../services/api.service';

interface SheetDistributionChartProps {
  data: SheetSummary[];
  loading: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const SheetDistributionChart: React.FC<SheetDistributionChartProps> = ({ data, loading }) => {
  const chartData = data.map(item => ({
    name: item.sheet,
    value: item.totalTasks,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Task Distribution by Sheet
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
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={entry => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SheetDistributionChart;