import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Grid,
} from '@mui/material';
import { Refresh, Download } from '@mui/icons-material';
import { subDays } from 'date-fns';
import apiService, {
  OverviewMetrics,
  AgentPerformance,
  TaskTrend,
  SheetSummary,
  ErrorPattern,
  MatchRateData,
  MismatchPattern,
  AgentEfficiency,
} from '../../services/api.service';
import KPICardsRow from '../KPICards/KPICardsRow';
import TaskTrendsChart from '../Charts/TaskTrendsChart';
import AgentPerformanceChart from '../Charts/AgentPerformanceChart';
import SheetDistributionChart from '../Charts/SheetDistributionChart';
import AgentPerformanceTable from '../Tables/AgentPerformanceTable';
import ErrorPatternsTable from '../Tables/ErrorPatternsTable';
import DateRangePicker from '../Filters/DateRangePicker';
import MatchRateChart from '../Charts/MatchRateChart';
import MismatchPatternsChart from '../Charts/MismatchPatternsChart';
import AgentEfficiencyChart from '../Charts/AgentEfficiencyChart';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Date range state
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [granularity, setGranularity] = useState<'day' | 'week' | 'month'>('day');

  // Data state
  const [overviewMetrics, setOverviewMetrics] = useState<OverviewMetrics | null>(null);
  const [agentPerformance, setAgentPerformance] = useState<AgentPerformance[]>([]);
  const [taskTrends, setTaskTrends] = useState<TaskTrend[]>([]);
  const [sheetSummary, setSheetSummary] = useState<SheetSummary[]>([]);
  const [errorPatterns, setErrorPatterns] = useState<ErrorPattern[]>([]);
  const [matchRateData, setMatchRateData] = useState<MatchRateData | null>(null);
  const [mismatchPatterns, setMismatchPatterns] = useState<MismatchPattern[]>([]);
  const [agentEfficiency, setAgentEfficiency] = useState<AgentEfficiency[]>([]);

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const dateRange = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };

      const [overview, agents, trends, sheets, errors, matchRate, mismatch, efficiency] = await Promise.all([
        apiService.getOverviewMetrics(dateRange),
        apiService.getAgentPerformance(dateRange),
        apiService.getTaskTrends(granularity, dateRange),
        apiService.getSheetSummary(dateRange),
        apiService.getErrorPatterns(dateRange),
        apiService.getMatchRate(dateRange),
        apiService.getMismatchPatterns(dateRange),
        apiService.getAgentEfficiency(dateRange),
      ]);

      setOverviewMetrics(overview);
      setAgentPerformance(agents);
      setTaskTrends(trends);
      setSheetSummary(sheets);
      setErrorPatterns(errors);
      setMatchRateData(matchRate);
      setMismatchPatterns(mismatch);
      setAgentEfficiency(efficiency);
    } catch (err) {
      setError('Failed to fetch dashboard data. Please try again.');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, granularity]);

  const handleRefresh = () => {
    fetchData(true);
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Export functionality to be implemented');
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agent Production Dashboard
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            granularity={granularity}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onGranularityChange={setGranularity}
          />
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleExport}
            >
              Export
            </Button>
          </Box>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* KPI Cards */}
      <Box mb={4}>
        <KPICardsRow metrics={overviewMetrics} loading={refreshing} />
      </Box>

      {/* Charts Row */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <TaskTrendsChart
            data={taskTrends}
            loading={refreshing}
            granularity={granularity}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SheetDistributionChart data={sheetSummary} loading={refreshing} />
        </Grid>
      </Grid>

      {/* Validation Analytics Row */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MatchRateChart data={matchRateData} loading={refreshing} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MismatchPatternsChart data={mismatchPatterns} loading={refreshing} />
        </Grid>
      </Grid>

      {/* Agent Performance Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <AgentPerformanceChart data={agentPerformance} loading={refreshing} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <AgentEfficiencyChart data={agentEfficiency} loading={refreshing} />
        </Grid>
      </Grid>

      {/* Tables Row */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <AgentPerformanceTable data={agentPerformance} loading={refreshing} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ErrorPatternsTable data={errorPatterns} loading={refreshing} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;