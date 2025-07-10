import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { MatchRateData } from '../../services/api.service';

interface MatchRateChartProps {
  data: MatchRateData | null;
  loading: boolean;
}

const COLORS = {
  match: '#4caf50',
  mismatch: '#f44336',
  partial: '#ff9800',
};

const MatchRateChart: React.FC<MatchRateChartProps> = ({ data, loading }) => {
  const pieData = data ? [
    { name: 'Match', value: data.overall.matchRate, count: Math.round(data.overall.totalValidations * data.overall.matchRate / 100) },
    { name: 'Mismatch', value: data.overall.mismatchRate, count: Math.round(data.overall.totalValidations * data.overall.mismatchRate / 100) },
    { name: 'Partial', value: data.overall.partialRate, count: Math.round(data.overall.totalValidations * data.overall.partialRate / 100) },
  ] : [];

  const renderCustomizedLabel = (entry: any) => {
    return `${entry.value}%`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 1, border: 1, borderColor: 'grey.300' }}>
          <Typography variant="body2">{payload[0].name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {payload[0].payload.count.toLocaleString()} validations ({payload[0].value}%)
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Validation Match Rate
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
          ) : data ? (
            <Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              
              <Box mt={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Match Rate by Sheet
                </Typography>
                {data.bySheet.map((sheet) => (
                  <Box key={sheet.sheet} display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">{sheet.sheet}:</Typography>
                    <Box display="flex" gap={2}>
                      <Typography variant="body2" color="success.main">
                        {sheet.matchRate}% match
                      </Typography>
                      <Typography variant="body2" color="error.main">
                        {sheet.mismatchRate}% mismatch
                      </Typography>
                      <Typography variant="body2" color="warning.main">
                        {sheet.partialRate}% partial
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Typography color="textSecondary">No data available</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchRateChart;