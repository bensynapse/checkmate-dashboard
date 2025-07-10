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
  Chip,
} from '@mui/material';
import { ErrorPattern } from '../../services/api.service';
import { format } from 'date-fns';

interface ErrorPatternsTableProps {
  data: ErrorPattern[];
  loading: boolean;
}

const ErrorPatternsTable: React.FC<ErrorPatternsTableProps> = ({ data, loading }) => {
  const getSeverityColor = (count: number): 'error' | 'warning' | 'info' => {
    if (count > 50) return 'error';
    if (count > 10) return 'warning';
    return 'info';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Error Patterns
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Error Description</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Last Occurrence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No errors found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((error, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {error.errorDescription}
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={error.count}
                        color={getSeverityColor(error.count)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {format(new Date(error.lastOccurrence), 'MMM dd, yyyy HH:mm')}
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

export default ErrorPatternsTable;