import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  granularity: 'day' | 'week' | 'month';
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onGranularityChange: (granularity: 'day' | 'week' | 'month') => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  granularity,
  onStartDateChange,
  onEndDateChange,
  onGranularityChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={onStartDateChange}
          slotProps={{
            textField: {
              size: 'small',
              sx: { minWidth: 150 },
            },
          }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={onEndDateChange}
          minDate={startDate || undefined}
          slotProps={{
            textField: {
              size: 'small',
              sx: { minWidth: 150 },
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Granularity</InputLabel>
          <Select
            value={granularity}
            label="Granularity"
            onChange={(e) => onGranularityChange(e.target.value as 'day' | 'week' | 'month')}
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;