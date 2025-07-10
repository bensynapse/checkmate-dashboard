import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import { MismatchPattern } from '../../services/api.service';

interface MismatchPatternsChartProps {
  data: MismatchPattern[];
  loading: boolean;
}

const MismatchPatternsChart: React.FC<MismatchPatternsChartProps> = ({ data, loading }) => {
  const maxCount = data.length > 0 ? Math.max(...data.map(d => d.count)) : 0;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Common Mismatch Patterns
        </Typography>
        <Box sx={{ width: '100%', height: 400, overflow: 'auto' }}>
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
            <List>
              {data.map((pattern, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="body1">{pattern.pattern}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {pattern.count.toLocaleString()} occurrences
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(pattern.count / maxCount) * 100} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary">No data available</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MismatchPatternsChart;