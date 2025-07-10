import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { AgentPerformance } from '../../services/api.service';

interface AgentPerformanceTableProps {
  data: AgentPerformance[];
  loading: boolean;
}

const AgentPerformanceTable: React.FC<AgentPerformanceTableProps> = ({ data, loading }) => {
  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${(seconds / 3600).toFixed(1)}h`;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Agent Performance Details
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Agent Name</TableCell>
                <TableCell align="right">Total Tasks</TableCell>
                <TableCell align="right">Completed</TableCell>
                <TableCell align="right">Completion Rate</TableCell>
                <TableCell align="right">Avg Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                data.map((agent) => (
                  <TableRow key={agent.agentId}>
                    <TableCell component="th" scope="row">
                      {agent.agentName}
                    </TableCell>
                    <TableCell align="right">{agent.totalTasks}</TableCell>
                    <TableCell align="right">{agent.completedTasks}</TableCell>
                    <TableCell align="right">{agent.completionRate}%</TableCell>
                    <TableCell align="right">
                      {formatTime(agent.avgCompletionTimeSeconds)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default AgentPerformanceTable;